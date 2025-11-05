
import fetchMock from "fetch-mock";
import { submitPesaPalPayment } from  "../utils/pesapalPayment"
import { getPesaPalAccessToken } from "../utils/pesapalAuth";

// Mock the environment variables
process.env.PESAPAL_CONSUMER_KEY = 'TDpigBOOhs+zAl8cwH2Fl82jJGyD8xev';
process.env.PESAPAL_CONSUMER_SECRET = '1KpqkfsMaihIcOlhnBo/gBZ5smw=';
process.env.PESAPAL_ENVIRONMENT = 'sandbox';

// Mock the getPesaPalAccessToken function
jest.mock('../utils/pesapalAuth', () => ({
    getPesaPalAccessToken: jest.fn(),
}));


describe('submitPesaPalPayment', () => {
    afterEach(() => {
        //reset fetch mock after each test
        fetchMock.hardReset();
        jest.clearAllMocks();
    });
    it('should submit a payment request successfully', async () => {
        //Mock the access token
        (getPesaPalAccessToken as jest.Mock).mockResolvedValue('mock_access_token');

        //mock the successsful API response
        const mockResponse = {
            order_tracking_id: '12345',
            merchant_reference: '67890',
            redirect_url: 'https://example.com/redirect',
        };

        // Mock the POST request to the Pesapal API
        fetchMock.post(
            'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest',
            {
                status: 200,
                body: mockResponse,
            }
        );

        // Call the function and assert the result
        const paymentData = {
            id: '12345',
            currency: 'USD',
            amount: 100,
            description: 'Test payment',
            callback_url: 'https://example.com/callback',
            cancellation_url: 'https://example.com/cancel',
            notification_id: '67890',
        };

        const result = await submitPesaPalPayment(paymentData);
        expect(result).toEqual(mockResponse); 
    });

    it('should throw an error when the API call fails', async () => {
        // Mock a failed API response

        //mock the access token
        (getPesaPalAccessToken as jest.Mock).mockResolvedValue('mock_access_token');

        //Mock a failed API response
        fetchMock.post(
            'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest',
            {
                status: 500,
                body: { error: 'Internal Server Error' },
            }
        );

        // Mock console.error to suppress logs during this test
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Call the function and expect it to throw an error
        const paymentData = {
            id: '12345',
            currency: 'UGX',
            amount: 100,
            description: 'Test payment',
            callback_url: 'https://example.com/callback',
            cancellation_url: 'https://example.com/cancel',
            notification_id: '67890',
        };
        await expect(submitPesaPalPayment(paymentData)).rejects.toThrow(
            'Failed to make payment request'
        );

        // Restore the original console.error implementation
        consoleErrorSpy.mockRestore();
    })
})