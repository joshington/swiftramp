

'use client';

import React, { useState } from 'react';
import { FiHome, FiCreditCard, FiSettings, FiBell, FiChevronDown, 
  FiSend, FiLogOut, FiUser, FiDollarSign, FiTrendingUp, FiMoreHorizontal,FiEye,FiMenu} from 'react-icons/fi';
import { IoAddCircleSharp } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiConvertio } from "react-icons/si";
import { useEffect, useRef } from 'react';

import ActionCard from '@/components/ActionCard';

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'transactions' | 'payments' | 'expense' | 'crypto'>('dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("Last 7 days");

  const options = ["Today", "Last 7 days", "Last 30 days", "Last 90 days"];

  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="flex h-screen bg-[#F4F4F4]">
      {/* Side Panel */}
      <div className={`transition-all duration-300 overflow-hidden bg-[#070F2B] shadow-md flex flex-col h-screen
        ${menuOpen ? 'w-64' : 'w-0'}
      `}
      >
        <div>
          <div className="p-5">
            <a href="/" className="flex items-center py-6 px-2">
                <img
                  src="/Logo/Swift Ramp (Light version).png" // Path to your logo file in the public folder
                  alt="swift Logo"
                  className="h-10 w-auto" // Adjust height and width as needed
                />
            </a>
          </div>

          <nav className="p-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`relative flex items-center space-x-2 w-full p-3 mt-2 cursor-pointer
                ${activeTab === 'home'
                  ? 'text-[#25BA88] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#25BA88] after:rounded-full'
                  : 'text-gray-300 hover:text-[#25BA88] transition-colors duration-300'
                }`}
            >
              <FiCreditCard />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`relative flex items-center space-x-2 w-full p-3 mt-2 cursor-pointer
                ${activeTab === 'dashboard'
                  ? 'text-[#25BA88] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#25BA88] after:rounded-full'
                  : 'text-gray-300 hover:text-[#25BA88] transition-colors duration-300'
                }`}
            >
              <FiCreditCard />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('transactions')}
              className={`relative flex items-center space-x-2 w-full p-3 mt-2 cursor-pointer
                ${activeTab === 'transactions'
                  ? 'text-[#25BA88] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#25BA88] after:rounded-full'
                  : 'text-gray-300 hover:text-[#25BA88] transition-colors duration-300'
                }`}
            >
              <FiCreditCard />
              <span>All Transactions</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`relative flex items-center space-x-2 w-full p-3 mt-2 cursor-pointer
                ${activeTab === 'payments'
                  ? 'text-[#25BA88] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#25BA88] after:rounded-full'
                  : 'text-gray-300 hover:text-[#25BA88] transition-colors duration-300'
                }`}
            >
              <RiSecurePaymentLine />
              <span>Payment methods</span>
            </button>

            <button
              onClick={() => setActiveTab('expense')}
              className={`relative flex items-center space-x-2 w-full p-3 mt-2 cursor-pointer
                ${activeTab === 'expense'
                  ? 'text-[#25BA88] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#25BA88] after:rounded-full'
                  : 'text-gray-300 hover:text-[#25BA88] transition-colors duration-300'
                }`}
            >
              <RiSecurePaymentLine />
              <span>Expense overview</span>
            </button>

            <button
              onClick={() => setActiveTab('crypto')}
              className={`relative flex items-center space-x-2 w-full p-3 mt-2 cursor-pointer
                ${activeTab === 'crypto'
                  ? 'text-[#25BA88] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-[#25BA88] after:rounded-full'
                  : 'text-gray-300 hover:text-[#25BA88] transition-colors duration-300'
                }`}
            >
              <RiSecurePaymentLine />
              <span>Crypto</span>
            </button>
            </nav>    
        </div>
       
        {/* Copyright notice at the bottom */}
        <div className="mt-70 p-4 text-center text-xs text-gray-400 border-t border-blue-900">
          <p>© 2025 All rights reserved, SwiftRamp</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Tab Navigation */}
          {/* New Header */}
          <header className="bg-[#070F2B] shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white cursor-pointer"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-sm font-semibold text-white">
                {menuOpen ? 'Hide Menu' : 'Show Menu'}
              </h1>

            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm text-gray-300">Welcome back, <span className="font-medium text-white ml-3">Jose</span></p>    
                </div>  
                
                <div className='relative' ref={dropdownRef}>
                <FiChevronDown
                  className={`ml-1 text-gray-300 transition-transform cursor-pointer ${isProfileOpen ? 'rotate-180' : ''}`}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                />  
                  
                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      <FiUser className="mr-2" />
                      Edit Profile
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer">
                      <FiLogOut className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
                </div>

                <div className="flex items-center"></div>
                <div 
                  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  NS
                </div>
                </div>

                <button className="relative text-gray-300 hover:text-white">
                  <FiBell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    3
                  </span>
                </button>

              </div>
            </div>    
          </header>

        {/* Dashboard Content */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Action Cards Section */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h4 className='text-black mb-4 font-semibold text-center'>
              What do you want to do?
            </h4>
            <hr className="border-t border-gray-200" />
            <div className="flex flex-row gap-5 justify-center items-center mt-4">
              <ActionCard 
                icon={<SiConvertio size={35} />}
                title="Buy or Sell Crypto" 
              />
              <ActionCard 
                icon={<FiTrendingUp size={35} />} 
                title="Invest" 
              />
              <ActionCard 
                icon={<FiMoreHorizontal size={35} />} 
                title="More" 
              />
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            {/* Using react-icons/ri */}
            <h3 className="text-xl font-semibold text-[#1E1E1E]">Your Payment Methods</h3>
            <IoAddCircleSharp className="text-[#25BA88] text-3xl" />
          </div>    
          <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">+256 *** *45678</p>
                    <p className="text-xs text-[#828282] mt-1">Mobile carrier: MTN Uganda</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">+256 *** *23456</p>
                    <p className="text-xs text-[#828282] mt-1">Mobile carrier: Airtel Uganda</p>    
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-[#25BA88] cursor-pointer">
                <span className="font-medium ">View all</span>
              </div>
            </div>
          </div>
        </div>        
               
        <div className="flex flex-col md:flex-row gap-6 w-full mt-6">
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Recent Transactions</h3>
              <div className="space-y-3 rounded-xl bg-white p-4 shadow">
                <TransactionItem
                  title="UGX → USDC(starknet)"
                  date="Mar 22, 3:52 PM"
                  items={[
                    { amount: "-367 608 UGX", isNegative: true },
                    { amount: "+100 USDT", isNegative: false },
                  ]}
                />
                <div className="border-t border-gray-100"></div>
                <TransactionItem
                  title="ETHEREUM"
                  date="Mar 18, 9:07 AM"
                  items={[{ amount: "+30 ETH", isNegative: false }]}
                />
            </div>
          </div>

          <div className="max-w-sm w-full bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex justify-between pb-4 mb-4">
              <div>
                <h5 className="leading-none text-sm font-normal text-[#1E1E1E] pb-1">You have used</h5>
                <dd className="text-gray-900 text-xl font-semibold">300 000 UGX</dd>
                <dd className="text-[#25BA88] text-xs font-normal">42 857,1 UGX on avg per week</dd>
              </div>
              <div>
                <span className="bg-[#25BA88] text-white text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md">
                  <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                  </svg>
                  8.2%
                </span>
              </div>
            </div>

            {/* Going to add an chart */}
            <div id="column-chart" className="h-40"></div>

            {/* Bottom section */}
            <div className="grid grid-cols-1 border-t border-gray-200 pt-5 relative">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-sm font-medium text-[#25BA88] hover:text-[#0B9567] cursor-pointer inline-flex items-center"
                  type="button"
                >
                  {selectedRange}
                  <svg className="w-2.5 h-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute bottom-12 left-0 z-10 bg-white border border-gray-100 rounded-lg shadow-sm w-44">
                    <ul className="py-2 text-sm text-[#25BA88] cursor-pointer">
                      {options.map((option) => (
                        <li key={option}>
                          <button
                            onClick={() => {
                              setSelectedRange(option);
                              setDropdownOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          >
                            {option}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};



const TransactionItem = ({
  title,
  date,
  items,
}: {
  title: string;
  date: string;
  items: { amount: string; isNegative: boolean }[];
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <h4 className="font-medium text-gray-800">{title}</h4>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <div className="mt-2 space-y-1 pl-2">
        {items.map((item, index) => (
          <p
            key={index}
            className={`text-sm ${item.isNegative ? 'text-red-500' : 'text-green-500'}`}
          >
            {item.amount}
          </p>
        ))}
      </div>
    </div>
  );
};

const PaymentMethodCard = ({ number, description }: { number: string; description: string }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h4 className="text-lg font-bold text-gray-800">{number}</h4>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
};

export default Dashboard;