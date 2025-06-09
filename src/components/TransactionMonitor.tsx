import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, XCircle, MapPin, Clock, CreditCard, Smartphone, Monitor } from 'lucide-react';

const TransactionMonitor = () => {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const generateTransaction = () => {
    const cards = ['**** 4532', '**** 7891', '**** 2456', '**** 9834', '**** 1234'];
    const merchants = ['Amazon', 'Walmart', 'Target', 'Best Buy', 'Starbucks', 'Shell', 'McDonalds', 'Apple Store'];
    const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL', 'London, UK', 'Toronto, CA'];
    const devices = ['Mobile', 'Desktop', 'Tablet', 'POS Terminal'];
    
    const riskScore = Math.random() * 100;
    const amount = Math.floor(Math.random() * 5000) + 10;
    
    return {
      id: Date.now() + Math.random(),
      cardNumber: cards[Math.floor(Math.random() * cards.length)],
      merchant: merchants[Math.floor(Math.random() * merchants.length)],
      amount: amount,
      location: locations[Math.floor(Math.random() * locations.length)],
      device: devices[Math.floor(Math.random() * devices.length)],
      timestamp: new Date().toLocaleTimeString(),
      riskScore: Math.round(riskScore),
      status: riskScore > 70 ? 'blocked' : riskScore > 40 ? 'flagged' : 'approved',
      fraudReason: riskScore > 70 ? 'High-risk pattern detected' : riskScore > 40 ? 'Unusual spending behavior' : null
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setTransactions(prev => [newTransaction, ...prev.slice(0, 49)]);
    }, 2000);

    // Initialize with some transactions
    const initial = Array.from({ length: 20 }, () => generateTransaction());
    setTransactions(initial);

    return () => clearInterval(interval);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.status === filter;
    const matchesSearch = transaction.cardNumber.includes(searchTerm) || 
                         transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'flagged':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'blocked':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-900/20';
      case 'flagged':
        return 'text-yellow-400 bg-yellow-900/20';
      case 'blocked':
        return 'text-red-400 bg-red-900/20';
      default:
        return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getRiskColor = (score) => {
    if (score > 70) return 'text-red-400';
    if (score > 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getDeviceIcon = (device) => {
    switch (device) {
      case 'Mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'Desktop':
        return <Monitor className="w-4 h-4" />;
      case 'Tablet':
        return <Monitor className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Transaction Monitor</h2>
          <p className="text-gray-400 mt-1">Real-time fraud detection and analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">Live Feed Active</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by card number or merchant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Transactions</option>
            <option value="approved">Approved</option>
            <option value="flagged">Flagged</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">
            {transactions.filter(t => t.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-400">Approved</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">
            {transactions.filter(t => t.status === 'flagged').length}
          </div>
          <div className="text-sm text-gray-400">Flagged</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-red-400">
            {transactions.filter(t => t.status === 'blocked').length}
          </div>
          <div className="text-sm text-gray-400">Blocked</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">
            ${transactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Total Volume</div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Card</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Merchant</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Risk Score</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Location</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Device</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white font-mono">{transaction.cardNumber}</td>
                  <td className="px-4 py-3 text-sm text-white">{transaction.merchant}</td>
                  <td className="px-4 py-3 text-sm text-white font-semibold">${transaction.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold ${getRiskColor(transaction.riskScore)}`}>
                        {transaction.riskScore}%
                      </span>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            transaction.riskScore > 70 ? 'bg-red-400' : 
                            transaction.riskScore > 40 ? 'bg-yellow-400' : 'bg-green-400'
                          }`}
                          style={{ width: `${transaction.riskScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1 text-sm text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>{transaction.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1 text-sm text-gray-300">
                      {getDeviceIcon(transaction.device)}
                      <span>{transaction.device}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1 text-sm text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{transaction.timestamp}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionMonitor;