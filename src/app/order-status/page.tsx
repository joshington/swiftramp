"use client";

import React, { useEffect } from 'react';
import { useRouter} from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle, FiXCircle, FiArrowLeft } from 'react-icons/fi';

interface OrderStatusPageProps {
  params: { orderId: string };
  searchParams: { status?: string; error?: string };
}


export default function OrderStatusPage({ params,searchParams }:OrderStatusPageProps){
  {/*
        const router = useRouter();
        const searchParams = useSearchParams();
        const orderId = searchParams.get('orderId'); // Get orderId from query params
        const status = searchParams.get('status');
        const error = searchParams.get('error');
  */}

  const router = useRouter();
  const { orderId } = params;
  const { status, error } = searchParams;


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {status === 'success' ? (
          <div className="text-center">
            
            <FiCheckCircle className="mx-auto text-green-500 text-6xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Your order #{orderId} has been processed successfully.
            </p>
            <div className="mb-6 p-4 bg-gray-100 rounded-md">
              <h2 className="font-semibold mb-2">Order Details</h2>
              <p>Order ID: {orderId}</p>
              {/* Add more order details here */}
            </div>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <FiXCircle className="mx-auto text-red-500 text-6xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
            <p className="text-gray-600 mb-4">
              {error || 'There was an issue processing your payment.'}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                <FiArrowLeft className="mr-2" /> Go Back
              </button>
              <Link 
                href="/checkout" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

