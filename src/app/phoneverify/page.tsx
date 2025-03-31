
"use client"; // Mark this as a Client Component
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; 



export default function PhoneVerify() {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('+256'); // Default country code
    const [isPasswordLogin, setIsPasswordLogin] = useState(false); // Toggle between phone and password login

    const [isBuyMode, setIsBuyMode] = useState(false); // Buy Mode state
    const [amount, setAmount] = useState('0'); // Amount to pay


     // Use useSearchParams to read query parameters
    const searchParams = useSearchParams();//basing on next13+


    //read query params on component mount
    useEffect(() => {
        //if(router.isReady) {
        //    const {isBuyMode: buyMode, amount:queryAmount } = router.query;
        //    setIsBuyMode(buyMode === 'true');
        //    setAmount(queryAmount as string);
        //}
        const buyMode = searchParams.get('isBuyMode');
        const queryAmount = searchParams.get('amount');

        if(buyMode) {
            setIsBuyMode(buyMode === 'true');
        }
        if (queryAmount) {
            setAmount(queryAmount);
        }
    },[searchParams]);


    //handle phone number input change
    const handlePhoneNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    //handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //add the verification logic here


        //on hitting the submit here, i want to first tell if its buy mode we 
        //trigger the collect payment and if its sell we have to send money to phone number
        //console.log('Phone Number:', phoneNumber);

        const queryParams = new URLSearchParams({
            amount: amount.replace(/,/g, ''), //remove the commas for the amount
        }).toString();
        if(isBuyMode) {
            //redirect to the payment page with the amount
            router.push(`/payment?${queryParams}`);
        } else {
            //logic will be to get the full names because i wil be sedning money to the momo no.
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={() => window.history.back()} // Navigate back
                    className="text-gray-600 hover:text-gray-800 mb-4"
                >
                    &larr; Back
                </button>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Verify Your Phone Number
                </h1>

                {/* Phone Number Input */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Phone Number
                        </label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            className="w-full p-3 border border-gray-300 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                            placeholder="+256"
                            required
                        />
                    </div>

                    {/* Toggle to Log in with Password */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => setIsPasswordLogin(!isPasswordLogin)}
                            className="text-sm text-green-600 hover:text-green-700"
                        >
                            Log in with Email
                        </button>
                    </div>

                    {/* Next Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 
                            rounded-lg font-semibold hover:bg-green-600 transition duration-300"
                    >
                        {isBuyMode ? 'Next: Pay Amount' : 'Next: Phone Verification'}
                    </button>
                </form>
            </div>
        </div>
    )

}