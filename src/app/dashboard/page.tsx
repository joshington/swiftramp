'use client';

import React, { useState } from 'react';
import { FiHome, FiCreditCard, FiTv, FiDroplet, FiSettings, FiSend, FiLogOut, FiUser, FiDollarSign } from 'react-icons/fi';

// Types
type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'credit' | 'debit';
};

type Service = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type UserProfile = {
  name: string;
  email: string;
  avatar: string;
  accountBalance: number;
  currency: string;
};

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salary Deposit',
    amount: 2500,
    date: '2023-05-15',
    status: 'completed',
    type: 'credit'
  },
  {
    id: '2',
    description: 'Electricity Bill',
    amount: 120,
    date: '2023-05-14',
    status: 'completed',
    type: 'debit'
  },
  {
    id: '3',
    description: 'DSTV Subscription',
    amount: 50,
    date: '2023-05-12',
    status: 'pending',
    type: 'debit'
  },
  {
    id: '4',
    description: 'Water Bill',
    amount: 35,
    date: '2023-05-10',
    status: 'failed',
    type: 'debit'
  }
];

const services: Service[] = [
  { id: 'tv', name: 'Pay TV', icon: <FiTv /> },
  { id: 'water', name: 'Water Bill', icon: <FiDroplet /> },
  { id: 'dstv', name: 'DSTV', icon: <FiTv /> },
  { id: 'send', name: 'Send Money', icon: <FiSend /> }
];

const mockUser: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  accountBalance: 5420.50,
  currency: 'USD'
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'transactions' | 'services' | 'profile'>('home');
  const [showSendMoneyModal, setShowSendMoneyModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSignOut = () => {
    // Implement sign out logic
    console.log('User signed out');
  };

  const handleSendMoney = () => {
    setShowSendMoneyModal(true);
    // Implement send money logic
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 flex items-center space-x-2 border-b">
          <FiDollarSign className="text-blue-600 text-2xl" />
          <h1 className="text-xl font-bold text-blue-600">SwiftRamp</h1>
        </div>
        
        <nav className="p-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center space-x-2 w-full p-2 rounded-lg ${activeTab === 'home' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FiHome />
            <span>Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center space-x-2 w-full p-2 rounded-lg mt-2 ${activeTab === 'transactions' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FiCreditCard />
            <span>Transactions</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('services')}
            className={`flex items-center space-x-2 w-full p-2 rounded-lg mt-2 ${activeTab === 'services' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FiSettings />
            <span>Services</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'home' && 'Dashboard'}
            {activeTab === 'transactions' && 'Transactions'}
            {activeTab === 'services' && 'Services'}
            {activeTab === 'profile' && 'Profile'}
          </h2>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <img src={mockUser.avatar} alt="User" className="w-8 h-8 rounded-full" />
              <span className="text-gray-700">{mockUser.name}</span>
            </button>
            
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FiUser className="mr-2" />
                  Profile
                </button>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FiLogOut className="mr-2" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeTab === 'home' && (
            <div>
              {/* Account Summary */}
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Summary</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Available Balance</p>
                    <p className="text-2xl font-bold">
                      {mockUser.currency} {mockUser.accountBalance.toLocaleString()}
                    </p>
                  </div>
                  <button 
                    onClick={handleSendMoney}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <FiSend className="mr-2" />
                    Send Money
                  </button>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {mockTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center p-3 border-b">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'credit' ? '+' : '-'}{mockUser.currency} {transaction.amount}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setActiveTab('transactions')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View all transactions →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">All Transactions</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{transaction.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{transaction.date}</td>
                        <td className={`px-6 py-4 whitespace-nowrap ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'credit' ? '+' : '-'}{mockUser.currency} {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Available Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service) => (
                  <button
                    key={service.id}
                    className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-blue-600 text-2xl mb-3">{service.icon}</div>
                    <h4 className="font-medium text-gray-900">{service.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Settings</h3>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <img src={mockUser.avatar} alt="User" className="w-16 h-16 rounded-full" />
                    <div>
                      <h4 className="font-medium text-gray-900">{mockUser.name}</h4>
                      <p className="text-gray-500">{mockUser.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Account Balance</label>
                      <p className="text-lg font-semibold">
                        {mockUser.currency} {mockUser.accountBalance.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>NGN</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button 
                      onClick={handleSendMoney}
                      className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <FiSend className="text-blue-600 mr-3" />
                        <span>Send Money</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>

                    <button className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <FiCreditCard className="text-blue-600 mr-3" />
                        <span>View Cards</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>

                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 text-red-600"
                    >
                      <div className="flex items-center">
                        <FiLogOut className="mr-3" />
                        <span>Sign Out</span>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Send Money Modal */}
      {showSendMoneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Send Money</h3>
              <button 
                onClick={() => setShowSendMoneyModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter recipient name or email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">{mockUser.currency}</span>
                  </div>
                  <input 
                    type="number" 
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 pr-12 sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add a note"
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setShowSendMoneyModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Implement send money logic
                    setShowSendMoneyModal(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;