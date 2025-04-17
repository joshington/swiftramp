


import React from 'react';
import { OrderStatus } from '@/app/actions/actionTypes';
import { useAppSelector } from '@/app/lib/store';
import Link from 'next/link';

const Receipt: React.FC = () => {
  const  {currentOrder, status} = useAppSelector((state) => state.order);

  if (!currentOrder) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-yellow-500">
          <h2 className="text-white font-semibold text-lg">No Order Found</h2>
        </div>
        <div className="p-6">
          <p>Please initiate an order first</p>
        </div>
      </div>
    );
  }

  //calculate total bases on order details
  const subTotal = currentOrder.amount;
  const fee = Math.round(subTotal  * 0.03); //3% fee charged
  const total = subTotal + fee;
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className={`p-4 ${
        status === OrderStatus.EXECUTED ? 'bg-green-600' : 
        status === OrderStatus.FAILED ? 'bg-red-600' : 'bg-blue-600'
      }`}>
        <h2 className="text-white font-semibold text-lg">
          You are currently: {currentOrder.type === 'BUY' ? 'Buying' : 'Selling'}
        </h2>
      </div>

      {/* Receipt Content */}
      <div className="p-6 space-y-6">
        {/* Payment Method Section */}
        <div className="space-y-4">
          <h3 className="text-gray-700 font-medium">Payment Method:</h3>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">{currentOrder.paymthd}</span>
          </div>
          {currentOrder.paymthd === 'Mobile Money' && (
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Country</span>
              <span className="font-medium text-black">{currentOrder.country}</span>
            </div>
          )}
        </div>

        {/* Amounts Section */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <div className="text-right">
              <span className="text-gray-500">{currentOrder.asset.symbol}:</span>
              <span className="ml-2 font-medium text-black">{currentOrder.asset.amount}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Fee</span>
            <div className="text-right">
              <span className="text-gray-500">{currentOrder.asset.symbol}</span>
              <span className="ml-2 font-medium text-black">{fee}</span>
            </div>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-300">
            <span className="font-semibold  text-gray-500">Total</span>
            <div className="text-right">
              <span className="text-gray-500">{currentOrder.asset.symbol}</span>
              <span className="ml-2 font-bold text-lg text-black">
                {total}
              </span>
            </div>
          </div>
        </div>

        {status === OrderStatus.PENDING && (
          <div className="flex space-x-4 pt-4">
            <Link 
              href="/" 
              className="flex-1 py-2 border border-gray-300 rounded-md text-gray-700 font-medium text-center"
            >
              Cancel
            </Link>
            <button className="flex-1 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-blue-700">
              Confirm
            </button>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default Receipt;

