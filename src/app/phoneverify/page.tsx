
'use client'; // Mark this as a Client Component
import React, { useState } from 'react';


export default function PhoneVerify() {
    const [phoneNumber, setPhoneNumber] = useState('+256'); // Default country code
    const [isPasswordLogin, setIsPasswordLogin] = useState(false); // Toggle between phone and password login

    //handle phone number input change
    const handlePhoneNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    //handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //add the verification logic here
        console.log('Phone Number:', phoneNumber);
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
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                        Log in with password
                        </button>
                    </div>

                    {/* Next Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
                    >
                        Next: Phone Verification
                    </button>
                </form>
            </div>
        </div>
    )

}