import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Shield, Clock, MapPin, CreditCard, Filter, Search, CheckCircle, XCircle } from 'lucide-react';

const AlertCenter = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const generateAlert = () => {
    const types = ['high', 'medium', 'low'];
    const messages = [
      'Multiple high-value transactions detected',
      'Unusual spending pattern identified',
      'Geographic anomaly detected',
      'Suspicious merchant activity',
      'Card-not-present transaction spike',
      'Velocity check triggered',
      'Time-based anomaly detected',
      'Cross-channel fraud pattern'
    ];
    const cards = ['**** 4532', '**** 7891', '**** 2456', '**** 9834', '**** 1234'];
    const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL', 'London, UK', 'Toronto, CA'];
    
    const type = types[Math.floor(Math.random() * types.length)];
    const riskScore = type === 'high' ? Math.floor(Math.random() * 20) + 80 : 
                     type === 'medium' ? Math.floor(Math.random() * 30) + 40 : 
                     Math.floor(Math.random() * 40) + 10;

    return {
      id: Date.now() + Math.random(),
      type,
      message: messages[Math.floor(Math.random() * messages.length)],
      card: cards[Math.floor(Math.random() * cards.length)],
      amount: Math.floor(Math.random() * 5000) + 100,
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: new Date(),
      riskScore,
      status: 'pending',
      details: `Risk factors: ${Math.floor(Math.random() * 5) + 1} indicators detected`
    };
  };

  useEffect(() => {
    // Initialize with some alerts
    const initialAlerts = Array.from({ length: 15 }, () => generateAlert());
    setAlerts(initialAlerts);

    // Add new alerts periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 3 seconds
        const newAlert = generateAlert();
        setAlerts(prev => [newAlert, ...prev.slice(0, 49)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.type === filter || alert.status === filter;
    const matchesSearch = alert.card.includes(searchTerm) || 
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateAlertStatus = (alertId, newStatus) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, status: newStatus } : alert
    ));
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'medium':
        return <Shield className="w-5 h-5 text-yellow-400" />;
      case 'low':
        return <Bell className="w-5 h-5 text-blue-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'high':
        return 'border-red-500 bg-red-900/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-900/20';
      case 'low':
        return 'border-blue-500 bg-blue-900/20';
      default:
        return 'border-gray-500 bg-gray-900/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'text-green-400 bg-green-900/20';
      case 'dismissed':
        return 'text-gray-400 bg-gray-900/20';
      case 'investigating':
        return 'text-blue-400 bg-blue-900/20';
      default:
        return 'text-yellow-400 bg-yellow-900/20';
    }
  };

  const alertCounts = {
    total: alerts.length,
    high: alerts.filter(a => a.type === 'high').length,
    medium: alerts.filter(a => a.type === 'medium').length,
    low: alerts.filter(a => a.type === 'low').length,
    pending: alerts.filter(a => a.status === 'pending').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Alert Center</h2>
          <p className="text-gray-400 mt-1">Monitor and manage fraud detection alerts</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-red-400 text-sm">Live Monitoring</span>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">{alertCounts.total}</div>
          <div className="text-sm text-gray-400">Total Alerts</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-red-400">{alertCounts.high}</div>
          <div className="text-sm text-gray-400">High Risk</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">{alertCounts.medium}</div>
          <div className="text-sm text-gray-400">Medium Risk</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">{alertCounts.low}</div>
          <div className="text-sm text-gray-400">Low Risk</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-orange-400">{alertCounts.pending}</div>
          <div className="text-sm text-gray-400">Pending Review</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts by card, message, or location..."
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
            <option value="all">All Alerts</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className={`rounded-lg border-l-4 p-6 bg-gray-800 ${getAlertColor(alert.type)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{alert.message}</h3>
                      <p className="text-sm text-gray-400 mt-1">{alert.details}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      <span className={`text-sm font-bold ${alert.riskScore > 70 ? 'text-red-400' : alert.riskScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {alert.riskScore}% Risk
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-white font-mono">{alert.card}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white font-semibold">${alert.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{alert.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {alert.status === 'pending' && (
              <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={() => updateAlertStatus(alert.id, 'investigating')}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm transition-colors"
                >
                  Investigate
                </button>
                <button
                  onClick={() => updateAlertStatus(alert.id, 'resolved')}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Resolve</span>
                </button>
                <button
                  onClick={() => updateAlertStatus(alert.id, 'dismissed')}
                  className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Dismiss</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertCenter;