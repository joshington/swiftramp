

//use the access token to initiate a payment request
//create a function to submit a payment request

import fetch from 'node-fetch';
import { getPesaPalAccessToken } from "./pesapalAuth";



export const submitPesaPalPayment = async (paymentData: any) => {
    const fetch = require('node-fetch');
    const accessObject = await getPesaPalAccessToken();
    const accessToken = accessObject.token;


    


    // Determine the submit URL based on the environment
    const submitUrl = 
        process.env.PESAPAL_ENVIRONMENT === 'sandbox'
            ? 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest'
            : ' https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest'
    //the above gets the access token
   
    try {
        // Make the POST request using fetch
        const response = await fetch(submitUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(paymentData), // Convert paymentData to JSON
        });
        // Check if the response is OK (status code 2xx)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const responseData = await response.json();

        // Return the response data
        return responseData;
    } catch (error) {
        console.log('Error making payment request:', error);
        console.log('Failed to make payment request');
    }

}