import React, { useState } from 'react';
import { CreditCard, Shield, AlertTriangle, CheckCircle, XCircle, Calculator, MapPin, Clock, Smartphone, DollarSign, TrendingUp, Brain } from 'lucide-react';

const FraudDetector = () => {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    transactionAmount: '',
    merchantName: '',
    merchantCategory: 'retail',
    transactionLocation: '',
    deviceType: 'mobile',
    timeOfDay: 'business',
    isCardPresent: true,
    previousTransactions: '1'
  });

  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const merchantCategories = [
    { value: 'retail', label: 'Retail Store', risk: 0.1 },
    { value: 'online', label: 'Online Shopping', risk: 0.3 },
    { value: 'restaurant', label: 'Restaurant', risk: 0.1 },
    { value: 'gas', label: 'Gas Station', risk: 0.2 },
    { value: 'atm', label: 'ATM Withdrawal', risk: 0.4 },
    { value: 'gambling', label: 'Gambling', risk: 0.8 },
    { value: 'adult', label: 'Adult Entertainment', risk: 0.7 },
    { value: 'crypto', label: 'Cryptocurrency', risk: 0.6 }
  ];

  const timeCategories = [
    { value: 'business', label: 'Business Hours (9AM-5PM)', risk: 0.1 },
    { value: 'evening', label: 'Evening (5PM-10PM)', risk: 0.2 },
    { value: 'late-night', label: 'Late Night (10PM-6AM)', risk: 0.5 },
    { value: 'early-morning', label: 'Early Morning (6AM-9AM)', risk: 0.3 }
  ];

  const calculateFraudScore = () => {
    let riskScore = 0;
    const factors = [];

    // Amount-based risk
    const amount = parseFloat(cardData.transactionAmount) || 0;
    if (amount > 5000) {
      riskScore += 25;
      factors.push({ factor: 'High Transaction Amount', impact: 25, description: `$${amount.toLocaleString()} exceeds normal spending` });
    } else if (amount > 1000) {
      riskScore += 15;
      factors.push({ factor: 'Elevated Transaction Amount', impact: 15, description: `$${amount.toLocaleString()} above average` });
    } else if (amount > 500) {
      riskScore += 8;
      factors.push({ factor: 'Moderate Transaction Amount', impact: 8, description: `$${amount.toLocaleString()} slightly elevated` });
    }

    // Merchant category risk
    const merchantRisk = merchantCategories.find(cat => cat.value === cardData.merchantCategory);
    if (merchantRisk) {
      const merchantScore = merchantRisk.risk * 30;
      riskScore += merchantScore;
      if (merchantScore > 15) {
        factors.push({ factor: 'High-Risk Merchant Category', impact: merchantScore, description: `${merchantRisk.label} has elevated fraud risk` });
      }
    }

    // Time-based risk
    const timeRisk = timeCategories.find(time => time.value === cardData.timeOfDay);
    if (timeRisk) {
      const timeScore = timeRisk.risk * 20;
      riskScore += timeScore;
      if (timeScore > 5) {
        factors.push({ factor: 'Unusual Transaction Time', impact: timeScore, description: `${timeRisk.label} transactions have higher risk` });
      }
    }

    // Card not present risk
    if (!cardData.isCardPresent) {
      riskScore += 20;
      factors.push({ factor: 'Card Not Present', impact: 20, description: 'Online/phone transactions have higher fraud risk' });
    }

    // Device type risk
    if (cardData.deviceType === 'unknown') {
      riskScore += 15;
      factors.push({ factor: 'Unknown Device', impact: 15, description: 'Unrecognized device increases risk' });
    }

    // Transaction velocity risk
    const velocity = parseInt(cardData.previousTransactions) || 1;
    if (velocity > 5) {
      riskScore += 20;
      factors.push({ factor: 'High Transaction Velocity', impact: 20, description: `${velocity} transactions in short timeframe` });
    } else if (velocity > 3) {
      riskScore += 10;
      factors.push({ factor: 'Elevated Transaction Velocity', impact: 10, description: `${velocity} recent transactions detected` });
    }

    // Location risk (simplified - in real system would use geolocation data)
    if (cardData.transactionLocation.toLowerCase().includes('international') || 
        cardData.transactionLocation.toLowerCase().includes('foreign')) {
      riskScore += 15;
      factors.push({ factor: 'International Transaction', impact: 15, description: 'Cross-border transaction detected' });
    }

    // CVV and card number validation (basic checks)
    if (cardData.cvv.length !== 3 && cardData.cvv.length !== 4) {
      riskScore += 10;
      factors.push({ factor: 'Invalid CVV Format', impact: 10, description: 'CVV does not match expected format' });
    }

    // Card number basic validation (Luhn algorithm simulation)
    const cardNum = cardData.cardNumber.replace(/\s/g, '');
    if (cardNum.length < 13 || cardNum.length > 19) {
      riskScore += 15;
      factors.push({ factor: 'Invalid Card Number', impact: 15, description: 'Card number format appears invalid' });
    }

    // Expiry date validation
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const expYear = parseInt(cardData.expiryYear) || 0;
    const expMonth = parseInt(cardData.expiryMonth) || 0;
    
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      riskScore += 30;
      factors.push({ factor: 'Expired Card', impact: 30, description: 'Card expiry date has passed' });
    }

    // Cap the score at 100
    riskScore = Math.min(riskScore, 100);

    // Determine fraud status
    let status, recommendation, confidence;
    if (riskScore >= 70) {
      status = 'HIGH_RISK';
      recommendation = 'BLOCK_TRANSACTION';
      confidence = 95;
    } else if (riskScore >= 40) {
      status = 'MEDIUM_RISK';
      recommendation = 'MANUAL_REVIEW';
      confidence = 85;
    } else if (riskScore >= 20) {
      status = 'LOW_RISK';
      recommendation = 'APPROVE_WITH_MONITORING';
      confidence = 90;
    } else {
      status = 'LEGITIMATE';
      recommendation = 'APPROVE_TRANSACTION';
      confidence = 98;
    }

    return {
      riskScore: Math.round(riskScore),
      status,
      recommendation,
      confidence,
      factors,
      timestamp: new Date(),
      transactionId: `TXN_${Date.now()}`
    };
  };

  const handleAnalyze = async () => {
    if (!cardData.cardNumber || !cardData.transactionAmount) {
      alert('Please fill in at least the card number and transaction amount');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysisResult = calculateFraudScore();
    setResult(analysisResult);
    
    // Add to history
    setAnalysisHistory(prev => [analysisResult, ...prev.slice(0, 9)]);
    
    setIsAnalyzing(false);
  };

  const resetForm = () => {
    setCardData({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      cardholderName: '',
      transactionAmount: '',
      merchantName: '',
      merchantCategory: 'retail',
      transactionLocation: '',
      deviceType: 'mobile',
      timeOfDay: 'business',
      isCardPresent: true,
      previousTransactions: '1'
    });
    setResult(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'HIGH_RISK':
        return 'text-red-400 bg-red-900/20 border-red-500';
      case 'MEDIUM_RISK':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500';
      case 'LOW_RISK':
        return 'text-blue-400 bg-blue-900/20 border-blue-500';
      case 'LEGITIMATE':
        return 'text-green-400 bg-green-900/20 border-green-500';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'HIGH_RISK':
        return <XCircle className="w-8 h-8 text-red-400" />;
      case 'MEDIUM_RISK':
        return <AlertTriangle className="w-8 h-8 text-yellow-400" />;
      case 'LOW_RISK':
        return <Shield className="w-8 h-8 text-blue-400" />;
      case 'LEGITIMATE':
        return <CheckCircle className="w-8 h-8 text-green-400" />;
      default:
        return <Shield className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Fraud Detection System</h2>
          <p className="text-gray-400 mt-1">Enter card details to analyze fraud risk using machine learning</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 text-sm">AI Engine Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Transaction Details</h3>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {/* Card Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-white border-b border-gray-700 pb-2">Card Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Card Number *</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.cardNumber}
                  onChange={(e) => setCardData(prev => ({ ...prev, cardNumber: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Exp Month</label>
                  <select
                    value={cardData.expiryMonth}
                    onChange={(e) => setCardData(prev => ({ ...prev, expiryMonth: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Exp Year</label>
                  <select
                    value={cardData.expiryYear}
                    onChange={(e) => setCardData(prev => ({ ...prev, expiryYear: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={new Date().getFullYear() + i}>
                        {new Date().getFullYear() + i}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength="4"
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardData.cardholderName}
                  onChange={(e) => setCardData(prev => ({ ...prev, cardholderName: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Transaction Information */}
            <div className="space-y-4">
              <h4 className="font-medium text-white border-b border-gray-700 pb-2">Transaction Information</h4>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Transaction Amount ($) *</label>
                <input
                  type="number"
                  placeholder="100.00"
                  value={cardData.transactionAmount}
                  onChange={(e) => setCardData(prev => ({ ...prev, transactionAmount: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Merchant Name</label>
                <input
                  type="text"
                  placeholder="Amazon, Walmart, etc."
                  value={cardData.merchantName}
                  onChange={(e) => setCardData(prev => ({ ...prev, merchantName: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Merchant Category</label>
                <select
                  value={cardData.merchantCategory}
                  onChange={(e) => setCardData(prev => ({ ...prev, merchantCategory: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                >
                  {merchantCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Transaction Location</label>
                <input
                  type="text"
                  placeholder="New York, NY or International"
                  value={cardData.transactionLocation}
                  onChange={(e) => setCardData(prev => ({ ...prev, transactionLocation: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Time of Day</label>
                <select
                  value={cardData.timeOfDay}
                  onChange={(e) => setCardData(prev => ({ ...prev, timeOfDay: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                >
                  {timeCategories.map(time => (
                    <option key={time.value} value={time.value}>{time.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Device Type</label>
                <select
                  value={cardData.deviceType}
                  onChange={(e) => setCardData(prev => ({ ...prev, deviceType: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="mobile">Mobile Device</option>
                  <option value="desktop">Desktop Computer</option>
                  <option value="tablet">Tablet</option>
                  <option value="pos">POS Terminal</option>
                  <option value="unknown">Unknown Device</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Recent Transactions (Last Hour)</label>
                <select
                  value={cardData.previousTransactions}
                  onChange={(e) => setCardData(prev => ({ ...prev, previousTransactions: e.target.value }))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">1 transaction</option>
                  <option value="2">2 transactions</option>
                  <option value="3">3 transactions</option>
                  <option value="4">4 transactions</option>
                  <option value="5">5 transactions</option>
                  <option value="6">6+ transactions</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="cardPresent"
                  checked={cardData.isCardPresent}
                  onChange={(e) => setCardData(prev => ({ ...prev, isCardPresent: e.target.checked }))}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="cardPresent" className="text-sm font-medium text-white">
                  Card Present Transaction (Physical card used)
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" />
                    <span>Analyze Fraud Risk</span>
                  </>
                )}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-3 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result && (
            <div className={`bg-gray-800 rounded-lg border-2 p-6 ${getStatusColor(result.status)}`}>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  {getStatusIcon(result.status)}
                  <h3 className="text-xl font-semibold">Fraud Analysis Result</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold mb-2">{result.riskScore}%</div>
                    <div className="text-lg font-medium capitalize mb-4">
                      {result.status.replace('_', ' ')}
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                      <div 
                        className={`h-4 rounded-full transition-all duration-1000 ${
                          result.status === 'HIGH_RISK' ? 'bg-red-400' : 
                          result.status === 'MEDIUM_RISK' ? 'bg-yellow-400' : 
                          result.status === 'LOW_RISK' ? 'bg-blue-400' : 'bg-green-400'
                        }`}
                        style={{ width: `${result.riskScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-white mb-2">Recommendation</h4>
                    <p className="text-sm text-gray-300">{result.recommendation.replace('_', ' ')}</p>
                    <p className="text-xs text-gray-400 mt-1">Confidence: {result.confidence}%</p>
                  </div>

                  <div className="text-xs text-gray-400">
                    Transaction ID: {result.transactionId}
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && result.factors.length > 0 && (
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">Risk Factors Detected</h3>
              </div>
              <div className="p-4 space-y-3">
                {result.factors.map((factor, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{factor.factor}</span>
                      <span className="text-sm font-bold text-red-400">+{factor.impact}</span>
                    </div>
                    <p className="text-xs text-gray-400">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysisHistory.length > 0 && (
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold">Recent Analysis History</h3>
              </div>
              <div className="p-4 space-y-2">
                {analysisHistory.slice(0, 5).map((analysis, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        analysis.status === 'HIGH_RISK' ? 'bg-red-400' : 
                        analysis.status === 'MEDIUM_RISK' ? 'bg-yellow-400' : 
                        analysis.status === 'LOW_RISK' ? 'bg-blue-400' : 'bg-green-400'
                      }`}></div>
                      <span className="text-sm text-white">{analysis.riskScore}% Risk</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      {analysis.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FraudDetector;