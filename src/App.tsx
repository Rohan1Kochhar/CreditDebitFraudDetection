import React, { useState, useEffect } from 'react';
import { Shield, CreditCard, AlertTriangle, TrendingUp, Brain, Activity, Search, Filter, Bell, Settings, Users, BarChart3, DollarSign, Clock, MapPin, Smartphone, Calculator } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionMonitor from './components/TransactionMonitor';
import Analytics from './components/Analytics';
import MLModels from './components/MLModels';
import AlertCenter from './components/AlertCenter';
import RiskAssessment from './components/RiskAssessment';
import FraudDetector from './components/FraudDetector';

function App() {
  const [activeTab, setActiveTab] = useState('detector');
  const [alerts, setAlerts] = useState(12);

  const navigation = [
    { id: 'detector', name: 'Fraud Detector', icon: Calculator },
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'monitor', name: 'Live Monitor', icon: Activity },
    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
    { id: 'models', name: 'ML Models', icon: Brain },
    { id: 'alerts', name: 'Alerts', icon: Bell, badge: alerts },
    { id: 'risk', name: 'Risk Assessment', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'detector':
        return <FraudDetector />;
      case 'dashboard':
        return <Dashboard />;
      case 'monitor':
        return <TransactionMonitor />;
      case 'analytics':
        return <Analytics />;
      case 'models':
        return <MLModels />;
      case 'alerts':
        return <AlertCenter />;
      case 'risk':
        return <RiskAssessment />;
      default:
        return <FraudDetector />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold">CrediSecure AI</h1>
            </div>
            <div className="text-sm text-gray-400">
              Enterprise Fraud Detection Platform
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Developed by <span className="text-blue-400 font-medium">Rohan Kochhar</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">System Active</span>
            </div>
            <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;