


import React from 'react';

const Receipt: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-green-600 ">
        <h2 className="text-white font-semibold text-lg">You are currently: Buying</h2>
      </div>

      {/* Receipt Content */}
      <div className="p-6 space-y-6">
        {/* Payment Method Section */}
        <div className="space-y-4">
          <h3 className="text-gray-700 font-medium">Payment Method:</h3>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">Mobile Money</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">Mobile Carrier</span>
            <span className="font-medium text-black">MTN Uganda</span>
          </div>
        </div>

        {/* Amounts Section */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <div className="text-right">
              <span className="text-gray-500">UGX:</span>
              <span className="ml-2 font-medium text-black">366,483</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Fee</span>
            <div className="text-right">
              <span className="text-gray-500">UGX:</span>
              <span className="ml-2 font-medium text-black">1,125</span>
            </div>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-300">
            <span className="font-semibold  text-gray-500">Total</span>
            <div className="text-right">
              <span className="text-gray-500">UGX</span>
              <span className="ml-2 font-bold text-lg text-black">367,608</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 font-medium">
            Cancel
          </button>
          <button className="flex-1 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-blue-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;

