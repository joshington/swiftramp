
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

import Receipt from '@/components/Receipt';

const CheckoutPage: React.FC = () => {
  const [userName, setUserName] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  // Mock transaction details
  const transactionDetails = {
    crypto: {
      symbol: 'USDT',
      amount: 100,
    },
    paymentMethod: 'Mobile Money',
    mobileCarrier: 'MTN Uganda',
    subtotal: 366483,
    fee: 1125,
    total: 367608,
    currency: 'UGX'
  };

  const handleConnectWallet = () => {
    // In a real app, this would connect to a wallet provider
    setWalletConnected(true);
  };

  return (
    
    
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center  w-full mt-9">
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <Link href="/" className="mr-2">
              <FiArrowLeft className="text-gray-600" size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">SwiftRamp</h1>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Checkout</h2>
          
          {/*
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          */}
          

          {/* Personal Information Form */}
          <div className="space-y-4 mb-8">
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                />
              </div>
             
            

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
              
              <div className="flex">
                {/*
                  <select className="w-1/3 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Select Wallet</option>
                    <option>MetaMask</option>
                    <option>Trust Wallet</option>
                    <option>Coinbase Wallet</option>
                  </select>
                */}
                
                <button
                  onClick={handleConnectWallet}
                  className={`w-2/3 px-4 py-2
                     rounded-r-md font-medium ${
                      walletConnected 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'}
                    `}
                >
                  {walletConnected ? 'Connected ✓' : 'Connect Wallet'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
              <div className="flex">
                <div className="w-1/4 px-3 py-2 border border-gray-300 
                  rounded-l-md bg-gray-100 flex items-center justify-center text-black">
                  +256
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-3/4 px-3 py-2 border-t border-r 
                    border-b border-gray-300 rounded-r-md focus:outline-none 
                    focus:ring-2 focus:ring-green-500 text-black"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 
                  rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveInfo"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
                Save information for future exchange
              </label>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          

           

          {/* Pay Now Button */}
          <button
            className="w-full bg-green-600 
              hover:bg-green-700 text-white font-bold py-3 px-4 
              rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 
              focus:ring-offset-2 transition duration-150"
          >
            Pay Now
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <Receipt />
      </div>

  
    </div>
  );
};

export default CheckoutPage;