

import axios from 'axios';
import { url } from 'inspector';
import { headers } from 'next/headers';


export const getPesaPalAccessToken = async () => {
    const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
    const authUrl = 
        process.env.PESAPAL_ENVIRONMENT === 'sandbox'
            ? 'https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken'
            : 'https://pay.pesapal.com/v3/api/Auth/RequestToken'

    //first use now the one gottern from pesapal
    var data = JSON.stringify({
        "consumer_key": consumerKey,
        "consumer_secret": consumerSecret
    })
    const response = await axios.post(
        authUrl,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json',
          },
          data:data
        }
    );
    
    return response.data.token;
}