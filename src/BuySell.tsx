

// src/components/BuyUsdc.tsx
import React from 'react';

const BuyUsdc: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Buy USDC</h1>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment method
          </label>
          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-gray-900">Mobile money</span>
          </div>
        </div>

        {/* Mobile Carrier */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile carrier
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <span className="text-gray-900">MTN Uganda</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <span className="text-gray-900">Airtel Uganda</span>
            </div>
          </div>
        </div>

        {/* Amount to Pay */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            You Pay
          </label>
          <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
            <span className="text-gray-900">UGX</span>
            <span className="text-gray-900 font-semibold">39,522</span>
          </div>
        </div>

        {/* Amount to Receive */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            You Receive
          </label>
          <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
            <span className="text-gray-900">USDC</span>
            <span className="text-gray-900 font-semibold">10</span>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="mb-6">
          <div className="text-sm text-gray-600 text-center">
            1 USDC = 3,855.76 UGX
          </div>
        </div>

        {/* Estimated Fee */}
        <div className="mb-6">
          <div className="text-sm text-gray-600 text-center">
            Estimated Fee: 0.25 USDC
          </div>
        </div>

        {/* Next Button */}
        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300">
          Next: Specify your wallet
        </button>
      </div>
    </div>
  );
};

export default BuyUsdc;