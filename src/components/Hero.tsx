// src/components/Hero.tsx
import React from 'react';

import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Buy and Sell Crypto Instantly
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8">
            Join the world's fastest-growing crypto exchange. Start trading in minutes.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/buysell"
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-300"
            >
              Get Started
            </Link>
            <a
              href="#"
              className="bg-white text-green-500 px-6 py-3 rounded-lg font-semibold text-lg border border-green-500 hover:bg-green-50 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500">1M+</h2>
            <p className="text-gray-600 mt-2">Happy Users</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500">99.9%</h2>
            <p className="text-gray-600 mt-2">Uptime</p>
          </div>
          <div className="text-center">
            <h2 className="text-4xl font-bold text-green-500">24/7</h2>
            <p className="text-gray-600 mt-2">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;