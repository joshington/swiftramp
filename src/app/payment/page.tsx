"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitPesaPalPayment } from "@/utils/pesapalPayment";

const PaymentPage = () => {
  const router = useRouter();
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [amount, setAmount] = useState("0"); // Amount to pay
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Read query parameters on component mount
  const searchParams = useSearchParams();
  useEffect(() => {
    const queryAmount = searchParams.get("queryAmount");
    //print the query amount
    console.log("=====ensuring  i get the query amount printed ======")
    console.log(queryAmount); //this
    console.log("===so the above is the query amount======")
    if (queryAmount) {
      setAmount(queryAmount);
    }
  }, [searchParams]);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const paymentData = {
        id: "unique-order-id",
        currency: "UGX",
        amount: parseFloat(amount),
        description: "Swiftramp payment",
        callback_url: process.env.PESAPAL_CALLBACK_URL,
        cancellation_url: process.env.PESAPAL_CALLBACK_URL,
        notification_id: "fe078e53-78da-4a83-aa89-e7ded5c456e6",
        billing_address: {
          email_address: "john.doe@example.com",
          phone_number: "",
          country_code: "UG",
          first_name: "John",
          middle_name: "",
          last_name: "Doe",
          line_1: "",
          line_2: "",
          city: "",
          state: "",
          postal_code: "",
          zip_code: "",
        },
      };

      const response = await submitPesaPalPayment(paymentData);
      setPaymentUrl(response.redirect_url);

      // Automatically redirect to the payment URL
      if (response.redirect_url) {
        window.location.href = response.redirect_url;
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
        <p className="text-gray-700 mb-6">
          You are about to pay:{" "}
          <span className="font-semibold">UGX {amount}</span>
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "Pay with Pesapal"}
        </button>

        {paymentUrl && (
          <p className="mt-6 text-sm text-gray-600">
            Redirecting to PesaPal...{" "}
            <a
              href={paymentUrl}
              className="text-blue-600 hover:underline"
            >
              Click here
            </a>{" "}
            if you are not redirected.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;