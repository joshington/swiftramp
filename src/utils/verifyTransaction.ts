

interface VerifyTransactionResponse {
    status: string;
    message: string;
    data?: {
      id: number;
      tx_ref: string;
      amount: number;
      currency: string;
      status: string;
      payment_type: string;
      created_at: string;
      [key: string]: any; // Additional fields that might be returned
    };
    error?: string;
}
  
interface VerifyTransactionParams {
    transactionId: number | string;
}

export const VerifyTransaction = async (
    params:VerifyTransactionParams
) : Promise<VerifyTransactionResponse> => {
    try {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(
            `https://api.flutterwave.com/v3/transactions/${params.transactionId}/verify`,
            options
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to verify transaction");
        }

        const data = await response.json();
        return {
            status: 'success',
            message: 'Transaction verification successful',
            data: data.data, // Flutterwave returns the transaction data in a 'data' field
        };
    } catch (error: any) {
        return {
            status: 'error',
            message: 'Transaction verification failed',
            error: error.message,
        };
    }
};