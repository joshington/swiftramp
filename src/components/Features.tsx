// src/components/Features.tsx
import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SwiftRamp?
          </h2>
          <p className="text-lg text-gray-600">
            Discover the features that make us the best choice for buying and selling crypto.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-500 p-4 rounded-full inline-block">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-6">Fast Transactions</h3>
            <p className="text-gray-600 mt-2">
              Buy and sell crypto instantly with no delays.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-500 p-4 rounded-full inline-block">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-6">24/7 Support</h3>
            <p className="text-gray-600 mt-2">
              Our support team is always available to assist you.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-500 p-4 rounded-full inline-block">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-6">Secure Platform</h3>
            <p className="text-gray-600 mt-2">
              Your assets are safe with our advanced security measures.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-500 p-4 rounded-full inline-block">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-6">User-Friendly</h3>
            <p className="text-gray-600 mt-2">
              Easy-to-use platform for beginners and experts alike.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-500 p-4 rounded-full inline-block">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-6">Low Fees</h3>
            <p className="text-gray-600 mt-2">
              Enjoy competitive fees on all transactions.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="bg-green-50 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-500 p-4 rounded-full inline-block">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-6">Multiple Currencies</h3>
            <p className="text-gray-600 mt-2">
              Trade in a variety of cryptocurrencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;