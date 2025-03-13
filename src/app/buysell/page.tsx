

'use client'; // Mark this as a Client Component
import React, { useState,Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { WalletConnectButton } from '@/components/WalletConnectButton';
import { useAccount, useBalance, useStarkProfile } from '@starknet-react/core';

  ``
export default function BuySell() {
  const [isBuyMode, setIsBuyMode] = useState(true); // Toggle between Buy and Sell
  const [youPay, setYouPay] = useState('39,522'); // Amount to pay
  const [youReceive, setYouReceive] = useState('10'); // Amount to receive
  const [selectedCarrier, setSelectedCarrier] = useState<'MTN' | 'Airtel' | null>(null); // Selected mobile carrier
  const [selectedNetwork, setSelectedNetwork] = useState<'Starknet' | 'Celo' | 'Lisk' | null>(null); // Selected blockchain network
  const [isNetworkDropdownOpen, setIsNetworkDropdownOpen] = useState(false); // Dropdown visibility

  const exchangeRate = 3855.76; // 1 USDC = 3855.76 UGX

  // Handle changes to the "You Pay" field
  const handleYouPayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas for calculations
    setYouPay(value); //how much you are to be charged in ugx
    if (isBuyMode) {
      // Convert UGX to USDC
      const usdcAmount = (parseFloat(value) / exchangeRate).toFixed(2);
      setYouReceive(usdcAmount);
    } else {
      // Convert USDC to UGX
      const ugxAmount = (parseFloat(value) * exchangeRate).toFixed(2);
      setYouReceive(ugxAmount);
    }
  };

  // Handle changes to the "You Receive" field
  const handleYouReceiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas for calculations
    setYouReceive(value);
    if (isBuyMode) {
      // Convert USDC to UGX
      const ugxAmount = (parseFloat(value) * exchangeRate).toFixed(2);
      setYouPay(ugxAmount);
    } else {
      // Convert UGX to USDC
      const usdcAmount = (parseFloat(value) / exchangeRate).toFixed(2);
      setYouPay(usdcAmount);
    }
  };

  // Format numbers with commas
  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle network selection
  const handleNetworkSelect = (network: 'Starknet' | 'Celo' | 'Lisk') => {
    setSelectedNetwork(network);
    setIsNetworkDropdownOpen(false); // Close the dropdown after selection
  };

  //telling the user to connect their wallet
  const handleNextButtonClick = async () => {
    if (isBuyMode) {
      
    }
  }

  // Redirect logic
  const router = useRouter(); // Hook for navigation

  
  //checking if the wallet has been connected successfully
  const {address, isConnected, chainId} = useAccount();
  //things like balance aswell here

  const { data: balance } = useBalance({
    address: address,
  })

  //const {data} = useStarkProfile(chainId)

  useEffect(() => {
    if (isConnected){
      //redirect to the phone verify component if the wallet is connected
      router.push('/phoneverify');
    }
  }, [isConnected, router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsBuyMode(true)}
            className={`px-6 py-2 rounded-l-lg ${
              isBuyMode ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            } focus:outline-none`}
          >
            Buy
          </button>
          <button
            onClick={() => setIsBuyMode(false)}
            className={`px-6 py-2 rounded-r-lg ${
              !isBuyMode ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
            } focus:outline-none`}
          >
            Sell
          </button>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {isBuyMode ? 'Buy USDC' : 'Sell USDC'}
        </h1>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment method
          </label>
          <div className="bg-gray-50 p-2 rounded-lg">
            <span className="text-gray-900">Mobile money</span>
          </div>
        </div>

        {/* Mobile Carrier */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile carrier
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedCarrier('MTN')}
              className={`p-2 rounded-lg text-center ${
                selectedCarrier === 'MTN'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-50 text-gray-900'
              } focus:outline-none`}
            >
              MTN Uganda
            </button>
            <button
              onClick={() => setSelectedCarrier('Airtel')}
              className={`p-2 rounded-lg text-center ${
                selectedCarrier === 'Airtel'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-50 text-gray-900'
              } focus:outline-none`}
            >
              Airtel Uganda
            </button>
          </div>
        </div>

        {/* Amount to Pay */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isBuyMode ? 'You Pay' : 'You Receive'}
          </label>
          <div className="bg-gray-50 p-2 rounded-lg flex justify-between items-center">
            <span className="text-gray-900">{isBuyMode ? 'UGX' : 'USDC'}</span>
            <input
              type="text"
              value={formatNumber(youPay)}
              onChange={handleYouPayChange}
              className="bg-transparent text-right text-gray-900 font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* Amount to Receive */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isBuyMode ? 'You Receive' : 'You Pay'}
          </label>
          <div className="bg-gray-50 p-2 rounded-lg flex justify-between items-center">
            <span className="text-gray-900">
              {isBuyMode ? `USDC${selectedNetwork ? ` (${selectedNetwork})` : ''}` : 'UGX'}
            </span>
            <input
              type="text"
              value={formatNumber(youReceive)}
              onChange={handleYouReceiveChange}
              className="bg-transparent text-right text-gray-900 font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* Blockchain Network Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blockchain Network
          </label>
          <div className="relative">
            <button
              onClick={() => setIsNetworkDropdownOpen(!isNetworkDropdownOpen)}
              className="w-full bg-gray-50 p-2 rounded-lg text-left text-gray-900 focus:outline-none flex justify-between items-center"
            >
              {selectedNetwork || 'Select a network'}
              <svg
                className={`w-4 h-4 ml-2 transition-transform ${
                  isNetworkDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isNetworkDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white rounded-lg 
                shadow-lg border border-gray-200"
              >
                <button
                  onClick={() => handleNetworkSelect('Starknet')}
                  className="w-full p-2 text-left text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  Starknet
                </button>
                <button
                  onClick={() => handleNetworkSelect('Celo')}
                  className="w-full p-2 text-left text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  Celo
                </button>
                <button
                  onClick={() => handleNetworkSelect('Lisk')}
                  className="w-full p-2 text-left text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  Lisk
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 text-center">
            1 USDC = {formatNumber(exchangeRate.toString())} UGX
          </div>
        </div>

        {/* Estimated Fee */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 text-center">
            Estimated Fee: 0.25 USDC
          </div>
        </div>

        {/* Next Button*/}
        {isBuyMode ? (
          <WalletConnectButton /> 
        )  : ( <button className="w-full bg-green-500 text-white py-2 rounded-lg
               font-semibold hover:bg-green-600 transition duration-300">
            Next: Verify your phone
          </button>
        )}
        
      </div>
    </div>
  );
}