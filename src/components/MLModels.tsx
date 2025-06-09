import React, { useState } from 'react';
import { Brain, Activity, Settings, TrendingUp, AlertCircle, CheckCircle, XCircle, PlayCircle, PauseCircle } from 'lucide-react';

const MLModels = () => {
  const [models, setModels] = useState([
    {
      id: 1,
      name: 'Random Forest Classifier',
      type: 'Ensemble',
      status: 'active',
      accuracy: 98.4,
      precision: 97.8,
      recall: 96.2,
      f1Score: 97.0,
      lastTrained: '2024-01-15',
      features: 47,
      predictions: 145289,
      version: '2.1.3'
    },
    {
      id: 2,
      name: 'Deep Neural Network',
      type: 'Deep Learning',
      status: 'active',
      accuracy: 97.9,
      precision: 98.1,
      recall: 95.8,
      f1Score: 96.9,
      lastTrained: '2024-01-14',
      features: 52,
      predictions: 98456,
      version: '1.8.7'
    },
    {
      id: 3,
      name: 'XGBoost Classifier',
      type: 'Gradient Boosting',
      status: 'active',
      accuracy: 98.1,
      precision: 97.5,
      recall: 96.9,
      f1Score: 97.2,
      lastTrained: '2024-01-13',
      features: 43,
      predictions: 134567,
      version: '3.2.1'
    },
    {
      id: 4,
      name: 'Support Vector Machine',
      type: 'Classical ML',
      status: 'standby',
      accuracy: 96.7,
      precision: 96.3,
      recall: 95.1,
      f1Score: 95.7,
      lastTrained: '2024-01-10',
      features: 38,
      predictions: 87234,
      version: '1.4.2'
    }
  ]);

  const [selectedModel, setSelectedModel] = useState(models[0]);

  const featureImportance = [
    { feature: 'Transaction Amount', importance: 0.23, description: 'Monetary value of the transaction' },
    { feature: 'Time of Day', importance: 0.18, description: 'Hour when transaction occurred' },
    { feature: 'Merchant Category', importance: 0.16, description: 'Type of merchant (retail, gas, etc.)' },
    { feature: 'Geographic Location', importance: 0.14, description: 'Transaction location vs user profile' },
    { feature: 'Card Present/Not Present', importance: 0.12, description: 'Physical vs online transaction' },
    { feature: 'Spending Velocity', importance: 0.11, description: 'Rate of recent transactions' },
    { feature: 'Day of Week', importance: 0.06, description: 'Weekday vs weekend patterns' }
  ];

  const toggleModelStatus = (modelId) => {
    setModels(models.map(model => 
      model.id === modelId 
        ? { ...model, status: model.status === 'active' ? 'standby' : 'active' }
        : model
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'standby':
        return <PauseCircle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-900/20';
      case 'standby':
        return 'text-yellow-400 bg-yellow-900/20';
      case 'error':
        return 'text-red-400 bg-red-900/20';
      default:
        return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ML Model Management</h2>
          <p className="text-gray-400 mt-1">Monitor and manage fraud detection models</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Brain className="w-4 h-4" />
          <span>Train New Model</span>
        </button>
      </div>

      {/* Model Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Models</p>
              <p className="text-2xl font-bold text-green-400">
                {models.filter(m => m.status === 'active').length}
              </p>
            </div>
            <Activity className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Accuracy</p>
              <p className="text-2xl font-bold text-blue-400">
                {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div>
            <p className="text-sm text-gray-400">Total Predictions</p>
            <p className="text-2xl font-bold text-purple-400">
              {models.reduce((sum, m) => sum + m.predictions, 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div>
            <p className="text-sm text-gray-400">Ensemble Accuracy</p>
            <p className="text-2xl font-bold text-yellow-400">98.7%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold">Model Registry</h3>
          </div>
          <div className="p-6 space-y-4">
            {models.map((model) => (
              <div 
                key={model.id} 
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedModel.id === model.id 
                    ? 'border-blue-500 bg-blue-900/20' 
                    : 'border-gray-700 bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedModel(model)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(model.status)}
                    <div>
                      <h4 className="font-medium text-white">{model.name}</h4>
                      <p className="text-sm text-gray-400">{model.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleModelStatus(model.id);
                      }}
                      className="p-1 rounded hover:bg-gray-600 transition-colors"
                    >
                      {model.status === 'active' ? 
                        <PauseCircle className="w-4 h-4 text-yellow-400" /> : 
                        <PlayCircle className="w-4 h-4 text-green-400" />
                      }
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Accuracy:</span>
                    <span className="text-white ml-2 font-medium">{model.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Version:</span>
                    <span className="text-white ml-2 font-medium">{model.version}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Details */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedModel.name}</h3>
              <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* Performance Metrics */}
            <div>
              <h4 className="font-medium text-white mb-3">Performance Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Accuracy</div>
                  <div className="text-xl font-bold text-green-400">{selectedModel.accuracy}%</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Precision</div>
                  <div className="text-xl font-bold text-blue-400">{selectedModel.precision}%</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">Recall</div>
                  <div className="text-xl font-bold text-purple-400">{selectedModel.recall}%</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <div className="text-sm text-gray-400">F1-Score</div>
                  <div className="text-xl font-bold text-yellow-400">{selectedModel.f1Score}%</div>
                </div>
              </div>
            </div>

            {/* Model Info */}
            <div>
              <h4 className="font-medium text-white mb-3">Model Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Trained:</span>
                  <span className="text-white">{selectedModel.lastTrained}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Features:</span>
                  <span className="text-white">{selectedModel.features}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Predictions Made:</span>
                  <span className="text-white">{selectedModel.predictions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-white">{selectedModel.version}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Importance */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold">Feature Importance Analysis</h3>
          <p className="text-sm text-gray-400 mt-1">Key features driving fraud detection decisions</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {featureImportance.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-32 text-sm text-white font-medium">{feature.feature}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all"
                        style={{ width: `${feature.importance * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-blue-400 font-medium w-12">
                      {(feature.importance * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="w-64 text-xs text-gray-400">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLModels;