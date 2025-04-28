
"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAccount, useBalance, useStarkProfile } from "@starknet-react/core"

import { FiArrowLeft } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../lib/store';
import Receipt from '@/components/Receipt';
import { saveUserInfo, clearUserInfo } from '../actions/userActions';
import { orderSuccess, orderFailure } from '../actions/orderActions';

import { HeaderConnectButton } from '@/components/HeaderConnectButton';
import { generateTransactionReference } from '@/utils/chargeFlutterwave';

import { chargeWithFlutterwave } from '@/utils/chargeFlutterwave';
import { OrderStatus } from '../actions/actionTypes';

const CheckoutPage: React.FC = () => {

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
  const [email, setEmail] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);


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
        dispatch(
          saveUserInfo(userInfo)
        ); //dispatching the action to save the userinfo
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
    
    
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center  w-full mt-9">
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <Receipt />
      </div>
      <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
       {/* Header */}
        <div className="p-6">
          <div className="items-center mb-6">
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
                  required
                />
              </div>
             
            

            <div>
              
              
              <div className="flex">
                {/*
                  <select className="w-1/3 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Select Wallet</option>
                    <option>MetaMask</option>
                    <option>Trust Wallet</option>
                    <option>Coinbase Wallet</option>
                  </select>
                */}
                
                {/*
                  <button
                    onClick={handleConnectWallet}
                    className={`w-2/3 px-4 py-2
                      rounded-r-md font-medium ${
                        walletConnected 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'}
                      `}
                  >
                    {walletConnected ? 'Connected ✓' : <HeaderConnectButton />}
                  </button>
                  */}
               
                

{
  isConnected ? (
    <div className="space-y-2 p-3 border border-green-200 rounded-md bg-green-50">
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
        <span className="text-sm font-medium text-green-800">Wallet Connected</span>
      </div>
      
      {
        strkBalance && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Balance:</span>
                      <span className="font-medium text-black">
                        {
                          parseFloat(strkBalance.formatted).toFixed(4)} {strkBalance.symbol}
                      </span>
                    </div>
                  )}
                  
                  {data?.name && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Starknet ID:</span>
                      <span className="font-medium">{data.name}</span>
                    </div>
                  )}
                  
                  {address && (
                    <div className="text-xs text-gray-500 truncate">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </div>
                  )}
                </div>
              ) : (
                <HeaderConnectButton />
              )
            }
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
                  required
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
                required
              />
            </div>
            {/*
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
            */}
            
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          

           

          {/* Pay Now Button */}
          <Link
            onClick={handlePayNow}
            href={"/order-status"}
            className="w-full bg-green-600 
            hover:bg-green-700 text-white font-bold py-3 px-4 
            rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 
            focus:ring-offset-2 transition duration-150"
          >
            Pay Now
          </Link>
        </div>
      </div>
      

  
    </div>
  );
};

export default CheckoutPage;