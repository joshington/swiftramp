

//use the access token to initiate a payment request
//create a function to submit a payment request

import axios from "axios";
import { getPesaPalAccessToken } from "./pesapalAuth";

{/*
    
    export const submitPesaPalPayment = async (paymentData: any) => {
        const accessToken = await getPesaPalAccessToken();
        const submitUrl = 
            process.env.PESAPAL_ENVIRONMENT === 'sandbox'
                ? 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest'
                : ' https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest'

        const response = await axios.post(submitUrl, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    };
    
*/}

export const submitPesaPalPayment = async (paymentData: any) => {
    const accessToken = await getPesaPalAccessToken();
    const submitUrl = 
        process.env.PESAPAL_ENVIRONMENT === 'sandbox'
            ? 'https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest'
            : ' https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest'
    //the above gets the access token
   
    try {
        const response = await axios.post(submitUrl, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //return the response data
        return response.data;
    } catch (error) {
        console.error('Error making payment request:', error);
        throw new Error('Failed to make payment request');
    }

}