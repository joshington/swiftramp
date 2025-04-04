

// src/components/Hero.tsx
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { FiCalendar, FiChevronDown} from 'react-icons/fi';

const Hero: React.FC = () => {
  const [isBuying, setIsBuying] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileCarrier, setMobileCarrier] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [ugxAmount, setUgxAmount] = useState('');
  const [bnbAmount, setBnbAmount] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);


  const [isLocalInputFocused, setIsLocalInputFocused] = useState(false);

  const [selectedNetwork, setSelectedNetwork] = useState('Starknet');
  const networks = ['Starknet', 'Lisk', 'Celo', 'Ethereum', 'Binance Smart Chain', 'Polygon'];

  // Exchange rates (will be replaced with API call later)
  const exchangeRates = {
    'UGX': 3664.83,
    'KES': 124.50,
    'TZS': 2330.25,
    'SDG': 56.75,
    'RWF': 1050.30
  };


  //icons for countries====
  const CurrencyIcons = {
    UGX: () => (
      <div className="flex items-center gap-1">
        <img
          src="/flags/ug.png"
          alt="Ugandan Flag"
          className="h-5.5 w-6"
        />
        <span className="text-sm font-medium text-black">UG</span>
      </div>
    ),
    KES: () => (
      <div className="flex items-center gap-1">
        <img
          src="/flags/ke.png"
          alt="Kenyan Flag"
          className="h-5.5 w-6"
        />
        <span className="text-sm font-medium text-black">KE</span>
      </div>
    ),
    TZS: () => (
      <div className="flex items-center gap-1">
        <img
          src="/flags/tz.png"
          alt="Tanzanian Flag"
          className="h-5.5 w-6"
        />
        <span className="text-sm font-medium text-black">TZ</span>
      </div>
    ),
    SDG: () => (
      <div className="flex items-center gap-1">
        <img
          src="/flags/sd.png"
          alt="Sudanese Flag"
          className="h-5.5 w-6"
        />
        <span className="text-sm font-medium text-black">SD</span>
      </div>
    ),
    RWF: () => (
      <div className="flex items-center gap-1">
        <img
          src="/flags/rw.png"
          alt="Rwandan Flag"
          className="h-5.5 w-6"
        />
        <span className="text-sm font-medium text-black">RW</span>
      </div>
    ),
  };

  const countries = ['Uganda', 'Kenya', 'Tanzania', 'Sudan', 'Rwanda'];
  const carriersByCountry = {
    'Uganda': ['MTN Uganda', 'Airtel Uganda'],
    'Kenya': ['Safaricom', 'Airtel Kenya'],
    'Tanzania': ['Vodacom', 'Airtel Tanzania'],
    'Sudan': ['Zain Sudan', 'MTN Sudan'],
    'Rwanda': ['MTN Rwanda', 'Airtel Rwanda']
  };

  useEffect(() => {
    // Check if all required fields are filled
    if(paymentMethod !== 'Mobile Money'){
      setMobileCarrier('');
    } 
    const requiredFieldsFilled = 
      selectedCountry && 
      paymentMethod && 
      (paymentMethod !== 'Mobile Money' || mobileCarrier) && 
      (parseFloat(ugxAmount) > 0|| parseFloat(bnbAmount) > 0);
    setIsFormComplete(!!requiredFieldsFilled);
  }, [selectedCountry, paymentMethod, mobileCarrier, ugxAmount, bnbAmount]);

  const getCurrencySymbol = (country: string) => {
    switch(country) {
      case 'Uganda': return 'UGX';
      case 'Kenya': return 'KES';
      case 'Tanzania': return 'TZS';
      case 'Sudan': return 'SDG';
      case 'Rwanda': return 'RWF';
      default: return 'UGX';
    }
  };

  const handleLocalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUgxAmount(value);
    if (value && !isNaN(Number(value))) {
      const rate = exchangeRates[getCurrencySymbol(selectedCountry) as keyof typeof exchangeRates];

      const bnbValue = (Number(value) / rate).toFixed(6);
      setBnbAmount(bnbValue);
    } else {
      setBnbAmount('');
    }
  };

  const handleBnbAmountChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBnbAmount(value);

    if(value && !isNaN(Number(value))) {
      const rate = exchangeRates[getCurrencySymbol(selectedCountry) as keyof typeof exchangeRates];
      const localValue = (Number(value) * rate).toFixed(2);
      setUgxAmount(localValue);
    } else {
      setUgxAmount('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#191E29] to-[#25BA88] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Text content */}
          <div className="lg:w-3/5 lg:pr-8 mb-10 lg:mb-0">
            <div className="text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className='text-[#25BA88]'>Swiftly </span>
                 Buy and Sell Crypto
                <span className="text-[#25BA88]"> Instantly</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-white mb-8">
                Join the world's fastest-growing crypto exchange. Start trading in minutes.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/buysell"
                  className="bg-[#25BA88] text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300 text-center"
                >
                  Get Started
                </Link>
                <a
                  href="#"
                  className="bg-white text-[#25BA88] px-6 py-3 rounded-lg font-semibold text-lg border border-white hover:bg-green-50 transition duration-300 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-4">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-[#25BA88]">1M+</h2>
                <p className="text-white mt-2">Happy Users</p>
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-[#25BA88]">99.9%</h2>
                <p className="text-white mt-2">Uptime</p>
              </div>
              <div className="text-center">
                <h2 className="text-4xl font-bold text-[#25BA88]">24/7</h2>
                <p className="text-white mt-2">Support</p>
              </div>
            </div>
          </div>

          {/* Right side - Buy/Sell component (reduced width) */}
          <div className="lg:w-3/5 bg-white rounded-xl p-12">
          <div className="flex justify-center items-center mb-5">
                <button 
                  onClick={() => setIsBuying(true)}
                  className={`px-8 py-1 rounded-l-full text-sm ${isBuying ? 'bg-[#25BA88] text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Buy Crypto
                </button>
                <button 
                  onClick={() => setIsBuying(false)}
                  className={`px-8 py-1 rounded-r-full text-sm  ${!isBuying ? 'bg-[#25BA88] text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  Sell Crypto
                </button>
              </div>

            <div className="space-y-5">
              {/* Country Selector Dropdown */}
              <div>
                <select
                  id="country"
                  defaultValue=""
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="block w-full px-4 py-4 text-base text-gray-900 bg-white border-2 border-[#25BA88] 
                            rounded-lg focus:ring-[#25BA88] focus:border-[#25BA88] 
                            focus:outline-none"
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h4 className="text-lg font-medium text-gray-700 mb-2">Select Payment Method</h4>
                <div className="flex space-x-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Mobile Money"
                      checked={paymentMethod === 'Mobile Money'}
                      onChange={() => setPaymentMethod('Mobile Money')}
                      className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300"
                    />
                    <span className="text-gray-700 text-sm">Mobile Money</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit Card"
                      checked={paymentMethod === 'Credit Card'}
                      onChange={() => setPaymentMethod('Credit Card')}
                      className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300"
                    />
                    <span className="text-gray-700 text-sm">Credit Card</span>
                  </label>
                </div>
              </div>

              <hr className="my-4 h-px border-t-0 bg-[#E3E3E3]" />

              {/* Mobile Carrier Selection */}
              {paymentMethod === 'Mobile Money' && (
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Select Mobile Carrier</h4>
                  <div className="flex space-x-3">
                    {carriersByCountry[selectedCountry as keyof typeof carriersByCountry]?.map((carrier) => (
                      <label key={carrier} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mobileCarrier"
                          value={carrier}
                          checked={mobileCarrier === carrier}
                          onChange={() => setMobileCarrier(carrier)}
                          className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300"
                        />
                        <span className="text-gray-700 text-sm">{carrier}</span>
                      </label>
                    ))}
                  </div>
                  <hr className="my-4 h-px border-t-0 bg-[#E3E3E3]" />
                </div>
              )}

              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  You are currently: <span className="text-[#25BA88]">{isBuying ? 'Buying' : 'Selling'}</span>
                </h3>
                <div className="flex justify-start items-center mb-2">
                <img src="/stocks.svg" alt="Exchange Rate Icon"/>
                  <span className="text-xs font-medium text-[#25BA88]">
                    1 USDC = {
                      exchangeRates[getCurrencySymbol(selectedCountry) as 
                        keyof typeof exchangeRates].toLocaleString()} {getCurrencySymbol(selectedCountry)}
                  </span>
                </div>
              </div>

              {/* Exchange Rate and Currency Inputs */}
              <div className="pt-2">
                <div className="mb-3">
                  <div className="relative rounded-md bg-[#F4F4F4]">
                  <input
                      type="text"
                      value={ugxAmount}
                      onChange={handleLocalAmountChange}
                      onFocus={() => setIsLocalInputFocused(true)}
                      onBlur={() => setIsLocalInputFocused(false)}
                      dir="rtl" 
                      className={`block w-full transition-all duration-200 text-right pr-13
                                  ${isLocalInputFocused || ugxAmount !== '' ? 'pl-3' : 'pl-10'} pr-3 
                                  py-4 border border-[#F4F4F4] rounded-md focus:outline-none 
                                  focus:ring-[#25BA88] focus:border-[#25BA88] text-black text-sm`}
                      placeholder={isBuying ? "0-" : "0+"} 
                    />
                    {!isLocalInputFocused && ugxAmount === '' && (
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {CurrencyIcons[getCurrencySymbol(selectedCountry) as keyof typeof CurrencyIcons]()}
                      </div>
                    )}
                    
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500 text-sm">
                        {getCurrencySymbol(selectedCountry)}
                      </span>
                    </div>                    
                  </div>
                </div>

                <div className="mb-3">
                  {/* Flex container for Select & Input */}
                  <div className="flex items-center bg-[#F4F4F4] border border-[#F4F4F4] rounded-md">
                    {/* Network Selection (Left) */}
                    <select
                      value={selectedNetwork}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                      className="w-1/3 py-4 px-3
                                rounded-l-md focus:outline-none focus:ring-green-500 
                                focus:border-green-500 text-black text-sm bg-[#F4F4F4]"
                    >
                      {networks.map((network) => (
                        <option key={network} value={network}>
                          {network}
                        </option>
                      ))}
                    </select>

                    {/* Amount Input (Right) */}
                    <input
                      type="text"
                      value={bnbAmount}
                      onChange={(e) => setBnbAmount(e.target.value)}
                      className="w-2/3 py-2 px-3 bg-[#F4F4F4] text-black text-sm text-right
                                focus:outline-none focus:ring-green-500"
                      placeholder={isBuying ? "+0" : "-0"}
                    />
                    <span className="text-gray-500 text-sm pr-3">
                      USDC
                    </span>
                  </div>
                </div>

                <div className="flex space-x-3">
                <button 
                    className="flex items-center justify-center px-6 py-5 border border-[#25BA88] rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition duration-300 text-sm"
                    title="Schedule Order"
                  >
                    <FiCalendar className="text-base text-[#25BA88]" />
                  </button>
                
                <Link
                  href={isFormComplete ? "/checkout" : "#"}
                  passHref
                  className={`w-full py-2 rounded-lg font-semibold 
                    transition duration-300 flex items-center justify-center text-sm ${
                    isFormComplete 
                      ? 'bg-[#25BA88] text-white hover:bg-[#0B9567]' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  aria-disabled={!isFormComplete}
                  onClick={(e) => {
                    if (!isFormComplete) {
                      e.preventDefault();
                    }
                  }}
                >
                  Proceed Order
                </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;