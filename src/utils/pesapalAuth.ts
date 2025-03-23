

import fetch from 'node-fetch'


// Define the type for the response
interface PesapalAuthResponse {
    token: string;
    expiryDate: string;
    error: string | null;
    status: string;
    message: string;
}



export const getPesaPalAccessToken = async (): Promise<PesapalAuthResponse> => {
    const fetch = require('node-fetch');
    const data = JSON.stringify({
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    });

    const authUrl =
        process.env.PESAPAL_ENVIRONMENT === 'sandbox'
            ? 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken'
            : 'https://pay.pesapal.com/v3/api/Auth/RequestToken';

    try {
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body:data,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData =  (await response.json()) as PesapalAuthResponse;
        // Validate that the token exists
        if (!responseData.token) {
            throw new Error('Invalid response: Token not found');
        }
        return responseData;
    }catch (error) {
        console.log('Error fetching Pesapal access token:', error);
        throw new Error('Failed to fetch Pesapal access token');
    }
}