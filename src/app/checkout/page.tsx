
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const CheckoutPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const selectedCountry = useSelector((state: RootState) => state.checkoutForum.selectedCountry);
  console.log("Selected country:", selectedCountry);

  const selectedPaymentMethod = useSelector((state: RootState) => state.checkoutForum.paymentMethod);
  console.log("Selected Payment Method:", selectedPaymentMethod);

  const selectedLocalCurrency = useSelector((state: RootState) => state.checkoutForum.localCurrencyInput);
  console.log("Selected Local amount:", selectedLocalCurrency);

  const selectedCrypto = useSelector((state: RootState) => state.checkoutForum.cryptoCurrencyOutput);
  console.log("Selected Crypto amout:", selectedCrypto);

  const selectedMobileCarrier = useSelector((state: RootState) => state.checkoutForum.mobileCarrier);
  console.log("Selected Mobile Carrier:", selectedMobileCarrier);

  const carriersByCountry = {
    Uganda: ['MTN Uganda', 'Airtel Uganda'],
    Kenya: ['Safaricom', 'Airtel Kenya'],
    Tanzania: ['Vodacom', 'Airtel Tanzania'],
    Sudan: ['MTN Sudan', 'Zain Sudan'],
    Rwanda: ['MTN Rwanda', 'Airtel Rwanda'],
  };

  const mobileCarriers = carriersByCountry[selectedCountry as keyof typeof carriersByCountry || 'Uganda'] || [];
  console.log("Available Mobile Carriers:", mobileCarriers);

  const getPhoneSymbol = (country: string) => {
    switch(country) {
      case 'Uganda': return 'UGX';
      case 'Kenya': return 'KES';
      case 'Tanzania': return 'TZS';
      case 'Sudan': return 'SDG';
      case 'Rwanda': return 'RWF';
      default: return 'UGX';
    }
  }

  const phoneSymbol = getPhoneSymbol(selectedCountry || '');

    //icons for phonecode
    const phoneIcons = {
      UGX: () => (
        <div className="flex items-center gap-1">
          <img
            src="/flags/ug.png"
            alt="Ugandan Flag"
            className="h-5.5 w-6"
          />
          <span className="text-sm font-medium text-black">+256</span>
        </div>
      ),
      KES: () => (
        <div className="flex items-center gap-1">
          <img
            src="/flags/ke.png"
            alt="Kenyan Flag"
            className="h-5.5 w-6"
          />
          <span className="text-sm font-medium text-black">+254</span>
        </div>
      ),
      TZS: () => (
        <div className="flex items-center gap-1">
          <img
            src="/flags/tz.png"
            alt="Tanzanian Flag"
            className="h-5.5 w-6"
          />
          <span className="text-sm font-medium text-black">+255</span>
        </div>
      ),
      SDG: () => (
        <div className="flex items-center gap-1">
          <img
            src="/flags/sd.png"
            alt="Sudanese Flag"
            className="h-5.5 w-6"
          />
          <span className="text-sm font-medium text-black">+249</span>
        </div>
      ),
      RWF: () => (
        <div className="flex items-center gap-1">
          <img
            src="/flags/rw.png"
            alt="Rwandan Flag"
            className="h-5.5 w-6"
          />
          <span className="text-sm font-medium text-black">+250</span>
        </div>
      ),
    };

  const handleConnectWallet = () => {
    // In a real app, this would connect to a wallet provider
    setWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] py-4 px-4 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto flex items-center justify-start py-6">
        <Link href="/" className="flex items-center">
          <img
            src="/Logo/Swift Ramp (dark version).png" 
            alt="swift Logo"
            className="h-11 w-auto"
          />
        </Link>
      </div>

      <div className='flex flex-row'>

      {/* first div for the left side of the page*/}
        <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
          {/* Header */}
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Link href="/" className="mr-2">
                <FiArrowLeft className="text-[#25BA88]" size={20} />
              </Link>
              <p className="font-normal text-[#25BA88]">Go back</p>
            </div>

            <div className="flex justify-center w-full">
              <h2 className="text-xl font-semibold text-[#25BA88] mb-6">Checkout</h2>
            </div>
            
            {/* Personal Information Form */}
            <div className="space-y-4 mb-8">
              
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <input
                      type="text"
                      value={firstName}
                      placeholder={"First Name"}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-3 bg-[#F4F4F4] rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                    />
                  </div>

                  <div className="w-full md:w-1/2">
                    <input
                      type="text"
                      value={lastName}
                      placeholder={"Last Name"}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-3 bg-[#F4F4F4] rounded-md 
                        focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                    />
                  </div>
                </div>

                <div>
                <input
                  type="email"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-3 bg-[#F4F4F4] 
                    rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                />
              </div>

              <div>  
                <div className="flex space-x-2">
                  <select className="w-2/3 px-3 py-4 border border-[#25BA88] text-gray-400 text-sm rounded-md mr-5 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Select Wallet Address</option>
                    <option>MetaMask</option>
                    <option>Trust Wallet</option>
                    <option>Coinbase Wallet</option>
                  </select>

                  <button
                    onClick={handleConnectWallet}
                    className={`w-1/3 px-4 py-2 rounded-md font-medium transition ${
                      walletConnected 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-[#25BA88] text-white hover:bg-blue-700'
                    }`}
                  >
                    {walletConnected ? 'Connected ✓' : 'Connect Wallet'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                <div className="flex">
                <div className="w-1/4 px-3 py-2 bg-[#F4F4F4] 
                    rounded-l-md bg-gray-100 flex items-center justify-center text-black">
                    {phoneIcons[phoneSymbol as keyof typeof phoneIcons]?.()}
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-3/4 px-3 py-3 bg-[#F4F4F4] rounded-r-md focus:outline-none 
                      focus:ring-2 focus:ring-[#25BA88] text-black"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-[#25BA88] border-gray-300 rounded"
                />
                <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-700">
                  Save information for future exchange
                </label>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              className="w-full bg-[#25BA88] hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
            >
              Pay Now
            </button>
          </div>
        </div>
                      
        {/* Second div for the right side of the page*/}
        <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden">
          {/* Header */}
          <div className="p-6">
            <div className="flex justify-center w-full">
              <h2 className="text-xl font-normal text-[#0C0C0D] mb-6">You are currently: Buying </h2>
            </div>

              <div className="flex justify-center w-full">
                <h3 className="text-xl font-normal text-[#0C0C0D] mb-6">
                <span className="text-[#25BA88]">USDC</span>
                <span className="text-[#0C0C0D] font-semibold"> {selectedCrypto ? `$${selectedCrypto}` : ': 0'}</span>
                </h3>
              </div>
          </div>

          <div className="space-y-4 mb-8 w-full max-w-md">
            <div className="flex justify-between items-center px-6 gap-4">
              <p className="text-sm font-normal text-[#0C0C0D]">Payment Method:</p>
              <select
                value={selectedPaymentMethod || ''}
                onChange={(e) => console.log(`Selected Payment Method: ${e.target.value}`)}
                className="text-sm font-normal text-[#0C0C0D]  px-2 py-1 focus:outline-none"
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center px-6">
                <p className="text-sm font-normal text-[#0C0C0D]">Mobile Carrier:</p>
                <select
                  value={selectedMobileCarrier || ''}
                  onChange={(e) => console.log(`Selected Payment Method: ${e.target.value}`)}
                  className="text-sm font-normal text-[#0C0C0D]  px-2 py-1 focus:outline-none"
                >
                  <option value="" disabled>Select Mobile Carrier</option>
                  {mobileCarriers.map((carrier) => (
                    <option key={carrier} value={carrier}>
                      {carrier}
                    </option>
                  ))}
                </select>
            </div>
          </div>

          <hr className="my-4 h-px border-t-0 bg-[#E3E3E3]" />

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center px-6">
              <p className="text-sm font-normal text-[#0C0C0D]">Subtotal:</p>
              <p className="text-sm font-normal text-[#0C0C0D]">{selectedLocalCurrency} {getPhoneSymbol(selectedCountry || '')}</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center px-6">
                <p className="text-sm font-normal text-[#0C0C0D]">Estimated Fee:</p>
                <p className="text-sm font-normal text-[#0C0C0D]">{(parseFloat(selectedLocalCurrency || '0') * 0.025).toFixed(2)} {getPhoneSymbol(selectedCountry || '')}</p>
            </div>
          </div>

          <hr className="my-4 h-px border-t-0 bg-[#E3E3E3]" />

          <div className="mb-8 px-6">
            <div className="flex justify-between items-center">
              <p className="text-sm font-normal text-[#0C0C0D]">Total:</p>
              <p className="text-sm font-semibold text-[#0C0C0D]">
                {((parseFloat(selectedLocalCurrency || '0') + parseFloat(selectedLocalCurrency || '0') * 0.025).toFixed(2))}
                <span className="text-[#25BA88]"> {getPhoneSymbol(selectedCountry || '')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;