import React, { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, MapPin, Calendar, DollarSign, Shield } from 'lucide-react';

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('7d');

  const fraudTrends = [
    { month: 'Jan', detected: 1240, blocked: 1156, amount: 2.4 },
    { month: 'Feb', detected: 1380, blocked: 1289, amount: 2.8 },
    { month: 'Mar', detected: 1156, blocked: 1067, amount: 2.1 },
    { month: 'Apr', detected: 1489, blocked: 1398, amount: 3.2 },
    { month: 'May', detected: 1678, blocked: 1589, amount: 3.8 },
    { month: 'Jun', detected: 1567, blocked: 1456, amount: 3.5 }
  ];

  const fraudTypes = [
    { type: 'Card Not Present', count: 2847, percentage: 42.1, color: 'bg-red-400' },
    { type: 'Stolen Card', count: 1923, percentage: 28.4, color: 'bg-orange-400' },
    { type: 'Account Takeover', count: 1156, percentage: 17.1, color: 'bg-yellow-400' },
    { type: 'Identity Theft', count: 845, percentage: 12.4, color: 'bg-purple-400' }
  ];

  const topRiskLocations = [
    { location: 'New York, NY', riskScore: 8.7, incidents: 234 },
    { location: 'Los Angeles, CA', riskScore: 7.9, incidents: 189 },
    { location: 'Miami, FL', riskScore: 8.2, incidents: 156 },
    { location: 'Chicago, IL', riskScore: 6.8, incidents: 143 },
    { location: 'Houston, TX', riskScore: 7.1, incidents: 128 }
  ];

  const modelPerformance = [
    { model: 'Random Forest', accuracy: 98.4, improvement: '+0.3%', color: 'text-green-400' },
    { model: 'Neural Network', accuracy: 97.9, improvement: '+0.8%', color: 'text-green-400' },
    { model: 'XGBoost', accuracy: 98.1, improvement: '-0.1%', color: 'text-red-400' },
    { model: 'Ensemble', accuracy: 98.7, improvement: '+0.5%', color: 'text-green-400' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Fraud Analytics</h2>
          <p className="text-gray-400 mt-1">Comprehensive fraud detection insights and trends</p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Fraud Detection Rate</p>
              <p className="text-2xl font-bold text-green-400">94.2%</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">+2.1%</span>
              </div>
            </div>
            <Shield className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">False Positive Rate</p>
              <p className="text-2xl font-bold text-blue-400">2.8%</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">-0.5%</span>
              </div>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Processing Time</p>
              <p className="text-2xl font-bold text-purple-400">0.3s</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">-15ms</span>
              </div>
            </div>
            <Calendar className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Money Saved</p>
              <p className="text-2xl font-bold text-yellow-400">$2.4M</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">+18.3%</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fraud Trends Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Fraud Detection Trends</h3>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-4">
            {fraudTrends.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400 w-8">{data.month}</span>
                  <div className="flex-1">
                    <div className="flex space-x-2">
                      <div className="bg-red-400 h-6 rounded" style={{ width: `${(data.detected / 2000) * 100}px` }}></div>
                      <div className="bg-green-400 h-6 rounded" style={{ width: `${(data.blocked / 2000) * 100}px` }}></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white">{data.detected} detected</div>
                  <div className="text-sm text-gray-400">${data.amount}M saved</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded"></div>
              <span className="text-gray-400">Detected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span className="text-gray-400">Blocked</span>
            </div>
          </div>
        </div>

        {/* Fraud Types */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Fraud Types Distribution</h3>
            <PieChart className="w-5 h-5 text-blue-400" />
          </div>
          <div className="space-y-4">
            {fraudTypes.map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${type.color}`}></div>
                  <span className="text-sm text-white">{type.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white font-medium">{type.count}</div>
                  <div className="text-sm text-gray-400">{type.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High-Risk Locations */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">High-Risk Locations</h3>
            <MapPin className="w-5 h-5 text-red-400" />
          </div>
          <div className="space-y-4">
            {topRiskLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
                <div>
                  <div className="text-sm text-white font-medium">{location.location}</div>
                  <div className="text-sm text-gray-400">{location.incidents} incidents</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-red-400 font-bold">{location.riskScore}/10</div>
                  <div className="w-16 bg-gray-600 rounded-full h-2 mt-1">
                    <div 
                      className="bg-red-400 h-2 rounded-full"
                      style={{ width: `${(location.riskScore / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Performance */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">ML Model Performance</h3>
            <BarChart3 className="w-5 h-5 text-green-400" />
          </div>
          <div className="space-y-4">
            {modelPerformance.map((model, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-700">
                <div>
                  <div className="text-sm text-white font-medium">{model.model}</div>
                  <div className="text-sm text-gray-400">Accuracy: {model.accuracy}%</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${model.color}`}>{model.improvement}</div>
                  <div className="w-16 bg-gray-600 rounded-full h-2 mt-1">
                    <div 
                      className="bg-green-400 h-2 rounded-full"
                      style={{ width: `${model.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;