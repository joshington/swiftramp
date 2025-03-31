

import { initiateTransfer } from "../utils/transferMoney";


//mock global fetch
(global.fetch as jest.Mock) = jest.fn();

describe('initiateTransfer', () => {
    const mockTransferDetails = {
        account_bank: 'MPS',
        account_number: '256706626855',
        amount: 5000,
        currency: 'UGX',
        beneficiary_name: "josh",
        meta: {
            "sender": "Flutterwave Developers",
            "sender_country": "UGX",
            "mobile_number": "256760810134"
        }
    };
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.FLW_SECRET_KEY =  'test_secret_key';
    });

    it('should successfully initiate transfer', async () => {
        const mockResponse = {
            status: 'success',
            message: 'Transfer initiated',
            data: {
              id: 12345,
              status: 'NEW',
            },
        };
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok:true,
            json: () => Promise.resolve(mockResponse),
        });

        const result = await initiateTransfer(mockTransferDetails);

        expect(result.status).toBe('success');
        expect(global.fetch).toHaveBeenCalledWith(
            'https://api.flutterwave.com/v3/transfers',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer test_secret_key',
                },
            })
        )
        
        
        
    });
    it('should handle API errors', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok:false,
            json: () => Promise.resolve({ message: 'Insufficient balance' }),
        });
        const result = await initiateTransfer(mockTransferDetails);
        expect(result.status).toBe('error');
        expect(result.message).toContain('failed');
    });
    it('should validate required fields', async () => {
        //const invalidDetails = {...mockTransferDetails, account_bank:''};
        const result = await initiateTransfer({
            ...mockTransferDetails,
            account_bank:'',
        } as any);
        expect(result.status).toBe('error');
        expect(result.message).toContain('Transfer failed');
    });

    
})