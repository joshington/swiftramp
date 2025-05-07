
"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAccount, useBalance, useStarkProfile } from "@starknet-react/core"

import { FiArrowLeft } from 'react-icons/fi';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import TermsModal from '../../components/modal/termsmodal';
import PhoneVerificationModal from '../../components/modal/PhoneVerificationModal';
import { useAppDispatch, useAppSelector } from '../lib/store';
import Receipt from '@/components/Receipt';
import { saveUserInfo, clearUserInfo } from '../actions/userActions';
import { orderSuccess, orderFailure } from '../actions/orderActions';

import { HeaderConnectButton } from '@/components/HeaderConnectButton';
import { generateTransactionReference } from '@/utils/chargeFlutterwave';

import { chargeWithFlutterwave } from '@/utils/chargeFlutterwave';
import { OrderStatus } from '../actions/actionTypes';

const CheckoutPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

interface MobileMoneyPayload {
  amount: number;
  currency: string;
  email: string;
  tx_ref: string;
  phone_number: string;
  order_id?: string;
  fullname?: string;
  client_ip?: string;
  device_fingerprint?: string;
  meta?: Record<string, any>;
  redirect_url?: string;
  voucher?: number;
  network: string;
}

  const router = useRouter();


  //functionality to check if wallet is connected
  const { address, isConnected, chainId } = useAccount()

  const { data: balance } = useBalance({
    address: address,
  })

  //since i intend to use strkBalance
  const { data: strkBalance } = useBalance({
    address,
    token: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d" // STRK token address
  })

  //get address user data use this====
  const { data } = useStarkProfile({ address });


  const [userName, setUserName] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState('');

  const [showTerms, setShowTerms] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);

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

  const selectedCryptoExchangeState = useSelector((state: RootState) => state.checkoutForum.isBuying);
  console.log("Selected Crypto Exchange State:", selectedCryptoExchangeState);

  const getCryptoExchangeState = () => {
    if (selectedCryptoExchangeState) {
      return "Buying";
    }
    return "Selling";
  }

  const carriersByCountry = {
    Uganda: ['MTN Uganda', 'Airtel Uganda'],
    Kenya: ['Safaricom', 'Airtel Kenya'],
    Tanzania: ['Vodacom', 'Airtel Tanzania'],
    Sudan: ['MTN Sudan', 'Zain Sudan'],
    Rwanda: ['MTN Rwanda', 'Airtel Rwanda'],
  };

  const dispatch = useAppDispatch();
  const { currentOrder } = useAppSelector((state) => state.order);
  //getting the order from the app state, coz the order was initiated
  const user = useAppSelector((state) => state.user);

   //calculate total bases on order details
   const subTotal:any = currentOrder?.amount
   const fee = Math.round(subTotal  * 0.03); //3% fee charged
   const total = subTotal + fee;


  // Pre-fill form with user data if available
  useEffect(() => {
    if(user.userName) {
      setUserName(user.userName);
      setPhoneNumber(user.phoneNumber);
      setEmail(user.email);
      //setSaveInfo(user.saveForFuture || false);
    }
  }, [user]);


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

  const handlePayNow = async () => {
    if(!isConnected) {
      alert('please connect your wallet first');
      return;
    }
    if(!userName || !phoneNumber || !email) {
      alert('please fill in all rqd fields');
      return;
    }
  

    if (!currentOrder) {
      alert('No order found');
      return;
    }
   
    

    const userInfo = {
      userName,
      phoneNumber,
      email,
     
    };

    try{
      if(userInfo){
        //now that we have the data, create the user
        {/*dispatch(
          dispatch(saveUserInfo(userInfo))
        );*/}

        
        //dispatching the action to save the userinfo
        //now save to the DB
        await fetch('/api/user/save-info', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            ...userInfo,
            walletAddress: address,  //aswell we intend to save our address to the db
          })
        })

        //===now dispatch the flutterwave to make a payment=====
        //handle the payment processing
        // 2. Prepare transaction reference
        const txRef = generateTransactionReference();
        //==prepare flutterwave payload
        const payload:MobileMoneyPayload = {
          amount: Number(currentOrder?.amount),// Convert BigInt to number
          currency: 'UGX',
          email: email,
          tx_ref: txRef,
          phone_number: phoneNumber.startsWith('+256') ? phoneNumber : `+256${phoneNumber}`,
          fullname: userName,
          network: 'MTN', // or get from UI
          // Add other required fields
        }

         // 4. Initiate payment
        const paymentResponse = await chargeWithFlutterwave(payload);
        if(paymentResponse.status === 'success') {
          //we are supposed to get the payment link actually
          paymentResponse.data
        }
        if (paymentResponse.status === 'error') {
          throw new Error(paymentResponse.error || 'Payment failed');
        }

        // 5. Create order and transaction in database
        //const response = await fetch('/api/orders', {
        //  method: 'POST',
        //  headers: {
        //    'Content-Type': 'application/json',
        //  },
        //  body: JSON.stringify({
        //    userInfo,
        //    order: {
        //      ...currentOrder,
        //      status: 'PENDING' as OrderStatus,
        //      txRef,
        //    },
        //    walletAddress: address,
        //    strkBalance: strkBalance?.formatted
        //  })
        //});


      }else {
        //what do i intend to do if atall the data isnt there, just return
        return;
      }



    } catch (error){
      console.log(error);
    }

   

      //rest of your payment logic....
      

      // In a real app, you would:
      // 1. Send the order to your backend API
      // 2. Handle the payment processing
      // 3. Update the order status based on the result

      // Mock success after 2 seconds

       // 2. Prepare transaction reference
      //const txRef = generateTransactionReference();

       //==prepare flutterwave payload
      //const payload:MobileMoneyPayload = {
      //  amount: Number(currentOrder?.amount),// Convert BigInt to number
      //  currency: 'UGX',
      //  email: email,
      //  tx_ref: txRef,
      //  phone_number: phoneNumber.startsWith('+256') ? phoneNumber : `+256${phoneNumber}`,
      //  fullname: userName,
      //  network: 'MTN', // or get from UI
        // Add other required fields
      
      //}

       // 4. Initiate payment
      //const paymentResponse = await chargeWithFlutterwave(payload);
      //console.log("======checking out something====")
      //console.log(paymentResponse); 
      //since we are trying to find the error. first logit

      //if (paymentResponse.status === 'error') {
      //  throw new Error(paymentResponse.error || 'Payment failed');
      //}

      // 5. Create order and transaction in database
      //const response = await fetch('/api/orders', {
      //  method: 'POST',
      //  headers: {
      //    'Content-Type': 'application/json',
      //  },
      //  body: JSON.stringify({
      //    userInfo,
      //    order: {
      //      ...currentOrder,
      //      status: 'PENDING' as OrderStatus,
      //      txRef,
      //    },
      //    walletAddress: address,
      //    strkBalance: strkBalance?.formatted
      //  })
      //});


      //interface OrderResponse {
      //  orderId: string;
      //  txnHash?: string;
      //}
      //const orderData:OrderResponse = await response.json();


      // 6. Update Redux store
      //dispatch(orderSuccess(
      //  orderData.txnHash || txRef,
      //  Number(total)
      //));

      //redirect on success
      //router.push(`/order-status/${orderData.orderId}?status=success`);

    //} catch (error: any) {
      //const errorMessage = error.response?.data?.message || error.message || 'Payment failed';
      //dispatch(orderFailure(errorMessage));
      //router.push(`/order-status?status=failed&error=${encodeURIComponent(errorMessage)}`);
    //  console.log(error);
    //}
  };
 
  if (!currentOrder) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Order Found</h2>
          <Link href="/" className="text-blue-500 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

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

      <div className='flex flex-row items-start'>
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
                <input
                  type="password"
                  value={password}
                  placeholder={"Password"}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 bg-[#F4F4F4] 
                    rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  placeholder={"Confirm Password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-3 bg-[#F4F4F4] 
                    rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="termsAndConditions"
                  className="h-4 w-4 text-green-600 focus:ring-[#25BA88] border-gray-300 rounded cursor-pointer"
                />
                 <label htmlFor="termsAndConditions" className="ml-2 block text-sm text-gray-700">
                    I agree to the  
                    <span 
                      className="text-[#25BA88] underline cursor-pointer ml-1" 
                      onClick={() => setShowTerms(true)}
                    >
                      terms and conditions
                    </span>
                  </label>
                <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
              </div>

              <hr className="my-4 h-px border-t-0 bg-[#E3E3E3]" />

              {/* Payment Details Form */}

              <div className="flex justify-center w-full">
                <h2 className="text-xl font-semibold text-[#25BA88] mb-2">Payment Details</h2>
              </div>

              {selectedPaymentMethod === "Mobile Money" ? (
                <div>
                  <div className="flex space-x-2">
                    <select
                      className="w-2/3 px-3 py-4 border border-[#25BA88] text-gray-400 cursor-pointer text-sm rounded-md mr-5 focus:outline-none focus:ring-2 focus:ring-[#25BA88]"
                      onChange={(e) => setSelectedWallet(e.target.value)}
                    >
                      <option value="">Select Wallet Address</option>
                      <option value="MetaMask">MetaMask</option>
                      <option value="Trust Wallet">Trust Wallet</option>
                      <option value="Coinbase Wallet">Coinbase Wallet</option>
                    </select>

                    <button
                      onClick={handleConnectWallet}
                      disabled={!selectedWallet}
                      className={`w-1/3 px-4 py-2 rounded-md font-medium transition ${
                        walletConnected
                          ? 'bg-green-100 text-green-800'
                          : selectedWallet
                          ? 'bg-[#25BA88] text-white hover:bg-[#0B9567] cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {walletConnected ? 'Connected ✓' : 'Connect Wallet'}
                    </button>
                  </div>

                  <div>
                    <div className="flex py-4">
                      <div
                        className="w-1/4 px-3 py-2 bg-[#F4F4F4] rounded-l-md bg-gray-100 flex items-center justify-center text-black"
                      >
                        {phoneIcons[phoneSymbol as keyof typeof phoneIcons]?.()}
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-3/4 px-3 py-3 bg-[#F4F4F4] rounded-r-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </div>
              ) : selectedPaymentMethod === "Credit Card" ? (
                <div>
                  <div className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="w-full px-3 py-3 bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-3 py-3 bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <input
                          type="text"
                          placeholder="MM/YYYY"
                          className="w-full px-3 py-3 bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                        />
                      </div>
                      <div className="w-1/2">
                        <input
                          type="text"
                          placeholder="CVV"
                          className="w-full px-3 py-3 bg-[#F4F4F4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#25BA88] text-black"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="saveInfo"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                  className="h-4 w-4 text-green-600 cursor-pointer focus:ring-[#25BA88] border-gray-300 rounded"
                />
                <label htmlFor="saveInfo" className="ml-2 block cursor-pointer text-sm text-gray-700">
                  Save information for future exchange
                </label>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={() => {
                if (selectedPaymentMethod === "Mobile Money") {
                  setShowPhoneVerification(true);
                  <div className="flex items-center">
                    <PhoneVerificationModal isOpen={showPhoneVerification} onClose={() => setShowPhoneVerification(false)} />
                  </div>
                  } 
              
              else {
                  console.log("Processing payment...");
                }
              }}
              className="w-full bg-[#25BA88] hover:bg-[#0B9567] cursor-pointer text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150"
            >
              Pay Now
            </button>
            <PhoneVerificationModal
              isOpen={showPhoneVerification}
              onClose={() => setShowPhoneVerification(false)}
            />
          </div>
        </div>
                      
        {/* Second div for the right side of the page*/}
        <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden mt-4">
          <div className="p-6">
            <div className="flex justify-center w-full">
              <h2 className="text-xl font-semibold text-[#25BA88]">Order Summary</h2>
            </div>
            
          </div>

          {/* Header */}
          <div className="p-2">
            <div className="flex justify-center w-full">
              <h2 className="text-xl font-normal text-[#0C0C0D] mb-2">You are currently:
                <span className="text-[#25BA88]"> {getCryptoExchangeState()}</span>
              </h2>
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
                className="text-sm font-normal text-[#0C0C0D] cursor-pointer px-2 py-1 focus:outline-none"
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
          </div>

          {selectedPaymentMethod === "Mobile Money" && (
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center px-6">
                <p className="text-sm font-normal text-[#0C0C0D]">Mobile Carrier:</p>
                <select
                  value={selectedMobileCarrier || ''}
                  onChange={(e) => console.log(`Selected Mobile Carrier: ${e.target.value}`)}
                  className="text-sm font-normal text-[#0C0C0D] cursor-pointer px-2 py-1 focus:outline-none"
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
          )}

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