

'use client';

import React, { useState } from 'react';
import { FiHome, FiCreditCard, FiSettings, FiBell, FiChevronDown, 
  FiSend, FiLogOut, FiUser, FiDollarSign, FiTrendingUp, FiMoreHorizontal,FiEye,FiMenu} from 'react-icons/fi';
import { IoAddCircleSharp } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiConvertio } from "react-icons/si";

import ActionCard from '@/components/ActionCard';

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'transactions' | 'payments' | 'expense' | 'crypto'>('transactions');

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Side Panel */}
      <div className={`${menuOpen ? 'block' : 'hidden'} md:block w-64 
        bg-[#070F2B] shadow-md flex flex-col h-screen`}
      >
        <div>
          <div className="p-5">
            <h1 className="text-2xl font-bold text-white">SwiftRamp</h1>
          </div>

          <nav className="p-4">
            <div className="px-5 py-3 bg-blue-900 border-l-4 border-blue-400">
              <span className="text-sm font-medium text-gray-300"></span>
              <h2 className="text-lg font-semibold text-white">Dashboard</h2>
            </div>

            <button 
              onClick={() => setActiveTab('transactions')}
              className={`flex items-center space-x-2 w-full p-3 rounded-lg mt-2 
                ${activeTab === 'transactions' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-300 hover:bg-blue-900'
                }`}
            >
              <FiCreditCard />
              <span>All Transactions</span>
            </button>

            <button 
              onClick={() => setActiveTab('payments')}
              className={`flex items-center space-x-2 w-full
                 p-3 rounded-lg mt-2 ${
                  activeTab === 'payments' ? 
                  'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <RiSecurePaymentLine />
              <span>Payment methods</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('expense')}
              className={`flex items-center space-x-2 w-full p-3 rounded-lg mt-2 
                ${activeTab === 'expense' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <RiSecurePaymentLine />
              <span>Expense overview</span>
            </button>

            <button 
              onClick={() => setActiveTab('crypto')}
              className={`flex items-center space-x-2 w-full p-3 rounded-lg mt-2 ${activeTab === 'crypto' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}
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
            <div className="flex items-center ">
              <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden mr-4 text-gray-300"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-xl font-bold text-white">Hide Menu</h1>
            </div>
            <div className="flex items-center space-x-4">
              
              <div className="flex items-center space-x-2">
              
                <div className="text-right">
                  <p className="text-sm text-gray-300">Welcome back,</p>
                  <p className="font-medium text-white">Jose</p>
                </div>
                <button className="relative text-gray-300 hover:text-white">
                  <FiBell size={20} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    3
                  </span>
                </button>
                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <FiUser className="mr-2" />
                      Edit Profile
                    </button>
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      <FiLogOut className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    NS
                  </div>
                  <FiChevronDown className={`ml-1 text-gray-300 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                </div>

              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          {/* Action Cards Section */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h4 className='text-black mb-4 font-medium text-center'>
              What do you want to do?
            </h4>
            <hr className="border-t border-gray-200" />
            <div className="flex flex-row gap-5 justify-center items-center mt-4">
              <ActionCard 
                icon={<SiConvertio size={35} />}
                title="Buy/Sell" 
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
            <h3 className="text-lg font-semibold text-gray-800">Your Payment Methods</h3>
            <IoAddCircleSharp  className="text-gray-800 text-xl" />
          </div>
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">+256 *** *45678</p>
                    <p className="text-sm text-gray-500 mt-1">Mobile carrier: MTN Uganda</p>
                  </div>
                </div>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">+256 *** *23456</p>
                    <p className="text-sm text-gray-500 mt-1">Mobile carrier: JMFEL Uganda</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-blue-600 cursor-pointer">
                <FiEye className="mr-2" />
                <span className="font-medium">View all</span>
              </div>
            </div>
          </div>
        </div>
        {/*
        
        */}
       

          

          
        
               
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
        </div>
          {/* Recent Transactions */}
          
          
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