




import { chargeWithFlutterwave } from "../utils/chargeFlutterwave";


//mock the global fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch;




// Add this to ensure mock is properly set up before tests run
beforeAll(() => {
    jest.clearAllMocks();
});


describe('chargeWithFlutterwave', () => {
    const mockPayload = {
        phone_number: '054709929220',
        network: 'MTN',
        amount: 1500,
        currency: 'UGX',
        email: 'test@example.com',
        tx_ref: 'TX_12345678'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should successfully initiate payment', async () => {
        const mockSuccessResponse = {
            status: 'success',
            message: 'Charge initiated',
            data: {
                meta: {
                    authorization: {
                      redirect: 'https://example.com/redirect',
                      mode: 'redirect'
                    }
                }
            }
            
        };
        
        //mock successful fetch response
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockSuccessResponse),
        });

        const result = await chargeWithFlutterwave(mockPayload);

        expect(result).toEqual({
            status:'success',
            message: 'Payment initiated',
            data: mockSuccessResponse
        });
       
        //verify fetch was called with correct arguments
        expect(fetch).toHaveBeenCalledWith(
            'https://api.flutterwave.com/v3/charges',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...mockPayload,
                    type: 'mobile_money_uganda',
                })
            }
        )
    });

    it('should handle payment failure', async () => {
        //mock failed fetch response
        mockFetch.mockRejectedValue(new Error('Network error'));

        const result = await chargeWithFlutterwave(mockPayload);

        expect(result).toEqual({
            status: 'error',
            message: 'Payment failed',
            error: 'Network error'
        })
    });

    it('should handle API error response', async () => {
        const mockErrorResponse  = {
            status: 'error',
            message: 'Invalid amount'
        }

        //mock API error response (ok: false)
        mockFetch.mockResolvedValueOnce({
            ok:false,
            json: () => Promise.resolve(mockErrorResponse),
        });
        const result = await chargeWithFlutterwave(mockPayload);

        expect(result.status).toBe('error');
        expect(result.message).toBe('Payment failed');
    });

    it('should validate payload structure', async () => {
        const invalidPayload = {...mockPayload, phone_number: undefined};

        // Note: You might want to add validation in your actual function
        // For now, we expect it to fail at the API level
        mockFetch.mockResolvedValueOnce({
            ok:false,
            json: () => Promise.resolve({status: 'error', message: 'MIssing phone_number'}),
        });
        const result = await chargeWithFlutterwave(invalidPayload as any);
        expect(result.status).toBe('error');
    });
});