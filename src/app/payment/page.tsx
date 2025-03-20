

import { useState } from "react";
import { submitPesaPalPayment } from "@/utils/pesapalPayment";

const PaymentPage = () => {
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

    const handlePayment = async () => {
        const paymentData = {
            "id": "unique-order-id",
            "currency": "UGX",
            "amount": 100.00,
            "description": "Swiftramp payment",
            "callback_url":  process.env.PESAPAL_CALLBACK_URL,
            'cancellation_url': process.env.PESAPAL_CALLBACK_URL,
            "notification_id": "fe078e53-78da-4a83-aa89-e7ded5c456e6",
            "billing_address": {
                "email_address": "john.doe@example.com",
                "phone_number": "",
                "country_code": "UG",
                "first_name": "John",
                "middle_name": "",
                "last_name": "Doe",
                "line_1": "",
                "line_2": "",
                "city": "",
                "state": "",
                "postal_code": "",
                "zip_code": ""
            }
        };
        const response = await submitPesaPalPayment(paymentData);
        setPaymentUrl(response.redirect_url);
    };
    return (
        <div>
            <h1>Make a Payment</h1>
            <button onClick={handlePayment}>Pay with Pesapal</button>
            {paymentUrl && (
                <p>
                    Redirecting to PesaPal... 
                    <a href={paymentUrl}>
                        Click here
                    </a> if you are not redirected.
                </p>
            )}
        </div>
    )
};

export default PaymentPage;