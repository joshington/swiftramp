import { VerifyTransaction } from '../utils/verifyTransaction';


describe('verifyTransaction', () => {
    const mockTransactionId = 288200108;

    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn() as jest.Mock;
    });

    it('should successfully verify a transaction', async () => {
        const mockResponse = {
            status: 'success',
            message: 'Transaction fetched successfully',
            data: {
                id: mockTransactionId,
                status: 'successful',
                amount: 1500,
                currency: 'UGX',
                // ... other transaction fields
            },
        };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok:true,
            json: () => Promise.resolve(mockResponse),
        });
        const result = await VerifyTransaction({transactionId: mockTransactionId});

        expect(result).toEqual({
            status: 'success',
            message: 'Transaction verification successful',
            data: mockResponse.data,
        });
        expect(fetch).toHaveBeenCalledWith(
            `https://api.flutterwave.com/v3/transactions/${mockTransactionId}/verify`,
            expect.any(Object)
        );
    });
    it('should handle verification failure', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok:false,
            json: () => Promise.resolve({ message: 'Transaction not found' }),
        });
        const result = await VerifyTransaction({transactionId: mockTransactionId});
        expect(result.status).toBe('error');
        expect(result.message).toContain('failed');
    });

    it('should handle network errors', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        const result = await VerifyTransaction({transactionId: mockTransactionId});
        expect(result.status).toBe('error');
        expect(result.error).toBe('Network error');
    })
})