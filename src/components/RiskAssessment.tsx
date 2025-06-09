import React, { useState } from 'react';
import { Shield, Calculator, TrendingUp, AlertTriangle, Settings, BarChart3, Target, Activity } from 'lucide-react';

const RiskAssessment = () => {
  const [riskFactors, setRiskFactors] = useState({
    transactionAmount: 500,
    velocity: 3,
    location: 'domestic',
    timeOfDay: 'business',
    merchantType: 'retail',
    cardPresent: true,
    deviceType: 'mobile'
  });

  const [riskScore, setRiskScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('low');

  const calculateRisk = () => {
    let score = 0;
    
    // Amount-based risk
    if (riskFactors.transactionAmount > 1000) score += 20;
    else if (riskFactors.transactionAmount > 500) score += 10;
    else if (riskFactors.transactionAmount > 100) score += 5;
    
    // Velocity risk
    score += riskFactors.velocity * 5;
    
    // Location risk
    if (riskFactors.location === 'international') score += 15;
    else if (riskFactors.location === 'high-risk') score += 25;
    
    // Time-based risk
    if (riskFactors.timeOfDay === 'late-night') score += 10;
    else if (riskFactors.timeOfDay === 'early-morning') score += 5;
    
    // Merchant type risk
    if (riskFactors.merchantType === 'high-risk') score += 20;
    else if (riskFactors.merchantType === 'online') score += 10;
    
    // Card present risk
    if (!riskFactors.cardPresent) score += 15;
    
    // Device risk
    if (riskFactors.deviceType === 'unknown') score += 10;
    
    setRiskScore(Math.min(score, 100));
    
    if (score > 70) setRiskLevel('high');
    else if (score > 40) setRiskLevel('medium');
    else setRiskLevel('low');
  };

  React.useEffect(() => {
    calculateRisk();
  }, [riskFactors]);

  const riskThresholds = [
    { name: 'Card Not Present', threshold: 15, current: !riskFactors.cardPresent ? 15 : 0, description: 'Online/phone transactions' },
    { name: 'High Amount', threshold: 20, current: riskFactors.transactionAmount > 1000 ? 20 : 0, description: 'Transactions over $1,000' },
    { name: 'International', threshold: 15, current: riskFactors.location === 'international' ? 15 : 0, description: 'Cross-border transactions' },
    { name: 'High Velocity', threshold: 15, current: riskFactors.velocity > 2 ? 15 : 0, description: 'Multiple recent transactions' },
    { name: 'Off-hours', threshold: 10, current: riskFactors.timeOfDay === 'late-night' ? 10 : 0, description: 'Unusual transaction times' },
    { name: 'High-risk Merchant', threshold: 20, current: riskFactors.merchantType === 'high-risk' ? 20 : 0, description: 'Gambling, adult content, etc.' }
  ];

  const modelWeights = [
    { factor: 'Transaction Amount', weight: 0.25, impact: 'High' },
    { factor: 'Geographic Location', weight: 0.20, impact: 'High' },
    { factor: 'Transaction Velocity', weight: 0.18, impact: 'Medium' },
    { factor: 'Merchant Category', weight: 0.15, impact: 'Medium' },
    { factor: 'Card Present/Not Present', weight: 0.12, impact: 'Medium' },
    { factor: 'Time of Day', weight: 0.10, impact: 'Low' }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high':
        return 'text-red-400 bg-red-900/20 border-red-500';
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500';
      case 'low':
        return 'text-green-400 bg-green-900/20 border-green-500';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Risk Assessment Engine</h2>
          <p className="text-gray-400 mt-1">Configure and test fraud detection parameters</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-sm">Assessment Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Configuration */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Risk Parameters</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Transaction Amount ($)
              </label>
              <input
                type="number"
                value={riskFactors.transactionAmount}
                onChange={(e) => setRiskFactors(prev => ({ ...prev, transactionAmount: parseInt(e.target.value) || 0 }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Transaction Velocity (last hour)
              </label>
              <select
                value={riskFactors.velocity}
                onChange={(e) => setRiskFactors(prev => ({ ...prev, velocity: parseInt(e.target.value) }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1 transaction</option>
                <option value={2}>2 transactions</option>
                <option value={3}>3 transactions</option>
                <option value={4}>4 transactions</option>
                <option value={5}>5+ transactions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Transaction Location
              </label>
              <select
                value={riskFactors.location}
                onChange={(e) => setRiskFactors(prev => ({ ...prev, location: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
                <option value="high-risk">High-risk Country</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Time of Day
              </label>
              <select
                value={riskFactors.timeOfDay}
                onChange={(e) => setRiskFactors(prev => ({ ...prev, timeOfDay: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="business">Business Hours</option>
                <option value="evening">Evening</option>
                <option value="late-night">Late Night</option>
                <option value="early-morning">Early Morning</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Merchant Type
              </label>
              <select
                value={riskFactors.merchantType}
                onChange={(e) => setRiskFactors(prev => ({ ...prev, merchantType: e.target.value }))}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="retail">Retail</option>
                <option value="online">Online</option>
                <option value="restaurant">Restaurant</option>
                <option value="gas">Gas Station</option>
                <option value="high-risk">High-risk Merchant</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="cardPresent"
                checked={riskFactors.cardPresent}
                onChange={(e) => setRiskFactors(prev => ({ ...prev, cardPresent: e.target.checked }))}
                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="cardPresent" className="text-sm font-medium text-white">
                Card Present Transaction
              </label>
            </div>
          </div>
        </div>

        {/* Risk Score */}
        <div className="space-y-6">
          <div className={`bg-gray-800 rounded-lg border-2 p-6 ${getRiskColor(riskLevel)}`}>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Calculator className="w-6 h-6" />
                <h3 className="text-lg font-semibold">Risk Score</h3>
              </div>
              <div className="text-4xl font-bold mb-2">{riskScore}%</div>
              <div className={`text-lg font-medium capitalize px-4 py-2 rounded-full inline-block ${getRiskColor(riskLevel)}`}>
                {riskLevel} Risk
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-300 ${
                      riskLevel === 'high' ? 'bg-red-400' : 
                      riskLevel === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}
                    style={{ width: `${riskScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
              <div className="text-lg font-bold text-green-400">0-30%</div>
              <div className="text-sm text-gray-400">Low Risk</div>
              <div className="text-xs text-gray-500 mt-1">Auto-approve</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
              <div className="text-lg font-bold text-yellow-400">31-70%</div>
              <div className="text-sm text-gray-400">Medium Risk</div>
              <div className="text-xs text-gray-500 mt-1">Manual review</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
              <div className="text-lg font-bold text-red-400">71-100%</div>
              <div className="text-sm text-gray-400">High Risk</div>
              <div className="text-xs text-gray-500 mt-1">Auto-block</div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Factors Breakdown */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold">Risk Factors Breakdown</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {riskThresholds.map((factor, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{factor.name}</span>
                  <span className={`text-sm font-bold ${factor.current > 0 ? 'text-red-400' : 'text-gray-400'}`}>
                    +{factor.current}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{factor.description}</div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${factor.current > 0 ? 'bg-red-400' : 'bg-gray-500'}`}
                    style={{ width: `${(factor.current / factor.threshold) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model Weights */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold">Model Feature Weights</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {modelWeights.map((weight, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{weight.factor}</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex-1 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: `${weight.weight * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-green-400 font-medium">
                      {(weight.weight * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ml-4 ${
                  weight.impact === 'High' ? 'bg-red-900/20 text-red-400' :
                  weight.impact === 'Medium' ? 'bg-yellow-900/20 text-yellow-400' :
                  'bg-green-900/20 text-green-400'
                }`}>
                  {weight.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;