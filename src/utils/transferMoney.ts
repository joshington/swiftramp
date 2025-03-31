

import {v4 as uuidv4} from 'uuid';
//import Flutterwave from 'flutterwave-node-v3'

//generate a transaction reference


export function generateTransactionReference(prefix: string = "TX"):string {
    return `${prefix}_${uuidv4().substring(0,8)}`; //e,g "TX_3f7b2a4c"
}


interface TransferDetails {
    account_bank: string; // Bank code (e.g., '044' for Access Bank)
    account_number: string;
    amount: number;
    currency: string; // e.g., 'NGN', 'USD'
    beneficiary_name:string;
    meta?: Record<string, any>;
}


interface TransferResponse {
    status: 'success' | 'error';
    message: string;
    data?: any;
    error?: string;
}


export const initiateTransfer = async (
    transferDetails:TransferDetails
): Promise<TransferResponse> => {
    try {
        //validate required fields
        if (!transferDetails.account_bank || !transferDetails.account_number) {
            throw new Error('Bank details are required');
        }
        const response = await fetch('https://api.flutterwave.com/v3/transfers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
            body: JSON.stringify(transferDetails),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Transfer initiation failed');
        }
        const data = await response.json();
        return {
            status: 'success',
            message: 'Transfer initiated successfully',
            data: data.data, // Flutterwave wraps response in 'data' property
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'Transfer failed',
            error: "Failed Transfer"
        };
    }
}