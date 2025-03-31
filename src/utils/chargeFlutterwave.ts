
import {v4 as uuidv4} from 'uuid';
//import Flutterwave from 'flutterwave-node-v3'

//generate a transaction reference


export function generateTransactionReference(prefix: string = "TX"):string {
    return `${prefix}_${uuidv4().substring(0,8)}`; //e,g "TX_3f7b2a4c"
}

// Define TypeScript interfaces for payload and response
interface MobileMoneyPayload {
    amount: number;
    currency: string;
    email: string;
    tx_ref: string;
    phone_number: string;
    order_id?: string;
    fullname?: string;
    client_ip?: string;
    device_fingerprint?: string;
    meta?: Record<string, any>;
    redirect_url?: string;
    voucher?: number;
    network: string;
}

interface FlutterwaveResponse {
    status: "success" | "error"; // Literal type for strict status values
    message: string;
    meta?: {
      authorization: {
        redirect: string; // URL for payment completion
        mode: "redirect" | "otp" | "pin"; // Common Flutterwave auth modes
      };
    };
    data?: any; // Additional response payload (if any)
    error?: string; // Only present if status="error"
}



export const chargeWithFlutterwave = async (
    payload:MobileMoneyPayload
):Promise<FlutterwaveResponse> => {
    try {
        const options = {
            method:'POST',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...payload,
                type: 'mobile_money_uganda',
            }),
        };
        const response = await fetch(
            'https://api.flutterwave.com/v3/charges',
            options
        );
      
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return {
            status: 'success',
            message: 'Payment initiated',
            data,
        };
    } catch (error: any) {
        return {
          status: 'error',
          message: 'Payment failed',
          error: error.message,
        };
    }
};

   