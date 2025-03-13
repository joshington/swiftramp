"use client"

// src/components/Navbar.tsx
import { useSession, signOut } from 'next-auth/react';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

const Navbar: React.FC = () => {
  //const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  //==addin the router here =====
  const router = useRouter();

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center py-6 px-2">
              <img
                src="/slogo.png" // Path to your logo file in the public folder
                alt="swift Logo"
                className="h-8 w-auto" // Adjust height and width as needed
              />
            </a>
          </div>

          {/* Primary Navbar Items */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
              Home
            </Link>
            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
              Buy Crypto
            </a>
            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
              Sell Crypto
            </a>
            <div className="relative group">
              <button className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 flex items-center">
                <span>More</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500">
                  About Us
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500">
                  Blog
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500">
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/buysell"
                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
              >
                Get Started
              </Link>
            {/*
                {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                >
                    Get Started
                </Link>
                <button
                  onClick={() => signOut()}
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                >
                  Sign Out
                </button>
              </>
                
            ) : (
              <>
                <Link href="/signin" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                  Sign In
                </Link>
                <Link href="/signup" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
                  Sign Up
                </Link>
              </>
            )}
            */}
            
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-50">
          Home
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-50">
          Buy Crypto
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-50">
          Sell Crypto
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-50">
          About Us
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-50">
          Blog
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-green-50">
          Contact
        </a>
        <Link
          href="/dashboard"
          className="block py-2 px-4 text-sm bg-green-500 text-white font-semibold hover:bg-green-600"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;