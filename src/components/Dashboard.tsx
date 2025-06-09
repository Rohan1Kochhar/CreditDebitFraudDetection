import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Shield, AlertTriangle, CreditCard, DollarSign, Activity, Brain, Clock } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    transactionsToday: 15247,
    fraudDetected: 89,
    riskScore: 7.2,
    modelAccuracy: 98.4,
    totalBlocked: 156780,
    falsePositives: 12
  });

  const [recentAlerts] = useState([
    {
      id: 1,
      type: 'high',
      message: 'Multiple high-value transactions detected',
      card: '**** 4532',
      amount: 5690,
      time: '2 min ago',
      location: 'New York, NY'
    },
    {
      id: 2,
      type: 'medium',
      message: 'Unusual spending pattern identified',
      card: '**** 7891',
      amount: 1250,
      time: '8 min ago',
      location: 'Miami, FL'
    },
    {
      id: 3,
      type: 'high',
      message: 'Geographic anomaly detected',
      card: '**** 2456',
      amount: 850,
      time: '15 min ago',
      location: 'London, UK'
    }
  ]);

  const [modelMetrics] = useState([
    { name: 'Random Forest', accuracy: 98.4, precision: 97.8, recall: 96.2, status: 'active' },
    { name: 'Neural Network', accuracy: 97.9, precision: 98.1, recall: 95.8, status: 'active' },
    { name: 'XGBoost', accuracy: 98.1, precision: 97.5, recall: 96.9, status: 'active' },
    { name: 'SVM', accuracy: 96.7, precision: 96.3, recall: 95.1, status: 'standby' }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">CrediSecure AI Dashboard</h2>
          <p className="text-gray-400 mt-1">Real-time monitoring and AI-powered fraud analysis</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Transactions Today</p>
              <p className="text-2xl font-bold text-white">{stats.transactionsToday.toLocaleString()}</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">+12.5%</span>
              </div>
            </div>
            <CreditCard className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Fraud Detected</p>
              <p className="text-2xl font-bold text-red-400">{stats.fraudDetected}</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">-8.2%</span>
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Average Risk Score</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.riskScore}/10</p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.riskScore / 10) * 100}%` }}
                ></div>
              </div>
            </div>
            <Shield className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Model Accuracy</p>
              <p className="text-2xl font-bold text-green-400">{stats.modelAccuracy}%</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">+0.3%</span>
              </div>
            </div>
            <Brain className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent High-Risk Alerts</h3>
            <span className="text-sm text-gray-400">Live Feed</span>
          </div>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'high' ? 'bg-red-400' : 'bg-yellow-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{alert.message}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                    <span>Card: {alert.card}</span>
                    <span>${alert.amount.toLocaleString()}</span>
                    <span>{alert.location}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ML Model Performance */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">ML Model Performance</h3>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">All Systems Active</span>
            </div>
          </div>
          <div className="space-y-4">
            {modelMetrics.map((model, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{model.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    model.status === 'active' 
                      ? 'bg-green-900 text-green-400' 
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {model.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Accuracy</p>
                    <p className="text-white font-medium">{model.accuracy}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Precision</p>
                    <p className="text-white font-medium">{model.precision}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Recall</p>
                    <p className="text-white font-medium">{model.recall}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">${stats.totalBlocked.toLocaleString()}</div>
            <p className="text-sm text-gray-400 mt-1">Fraud Blocked (Total)</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.falsePositives}</div>
            <p className="text-sm text-gray-400 mt-1">False Positives (Today)</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">99.2%</div>
            <p className="text-sm text-gray-400 mt-1">System Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;