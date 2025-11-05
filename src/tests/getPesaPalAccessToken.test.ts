

import fetchMock from 'fetch-mock';
import { getPesaPalAccessToken } from  "../utils/pesapalAuth";


import jwt from 'jsonwebtoken';


//mock the envt variables
process.env.PESAPAL_CONSUMER_KEY = 'TDpigBOOhs+zAl8cwH2Fl82jJGyD8xev';
process.env.PESAPAL_CONSUMER_SECRET = '1KpqkfsMaihIcOlhnBo/gBZ5smw=';
process.env.PESAPAL_ENVIRONMENT = 'sandbox';


//generate a mock token in your test
//==just use a manual token here==
//const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

interface PesapalAuthResponse {
    token: string;
    expiryDate: string;
    error: string | null;
    status: string;
    message: string;
}


describe('getPesaPalAccessToken', () => {
    afterEach(() => {
        //reset the mock adapter after each test
        fetchMock.hardReset();
    });
    it('should return the access token when the API is successsful', async () => {

         // Generate a mock token
         const payload = {
            sub: '1234567890', // Example payload (subject)
            name: 'John Doe',  // Example payload (name)
            iat: Math.floor(Date.now() / 1000), // Issued at (current time in seconds)
            exp: Math.floor(Date.now() / 1000) + 3600, // Expiration time (1 hour from now)
        };

        const secretKey = 'mock-secret-key'; // Secret key for signing the token
        const mockToken = jwt.sign(payload, secretKey);


        //mock the successful API response
        const mockResponse:PesapalAuthResponse = {
            token: mockToken,
            expiryDate: '2021-08-26T12:29:30.5177702Z',
            error: null,
            status: '200',
            message: 'Request processed successfully',
        };
        
        fetchMock.post(
            'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken',
            {
                status: 200,
                body: mockResponse,
            }
        );
        // Call the function and assert the result
        const result = await getPesaPalAccessToken();
    
        expect(result.token).toEqual(mockResponse.token);
    });

    it('should throw an error when the API call fails', async () => {
        // Mock a failed API response
        fetchMock.post(
            'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken',
            {
                status: 500,
                body: { error: 'Internal Server Error' },
            }
        );

        // Mock console.error to suppress logs during this test
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Call the function and expect it to throw an error
        await expect(getPesaPalAccessToken()).rejects.toThrow(
            'Failed to fetch Pesapal access token'
        );

        // Restore the original console.error implementation
        consoleErrorSpy.mockRestore();
    });
})