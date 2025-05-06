import React, { useState } from 'react';
import { Save, RefreshCw, Trash2, Bell, User, Lock, MapPin, AlertCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('general');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500">Configure your traffic flow system preferences</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left ${
                activeTab === 'general' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <RefreshCw className="mr-3 h-5 w-5" />
              General
            </button>
            
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left ${
                activeTab === 'notifications' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </button>
            
            <button 
              onClick={() => setActiveTab('account')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left ${
                activeTab === 'account' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <User className="mr-3 h-5 w-5" />
              Account
            </button>
            
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left ${
                activeTab === 'security' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Lock className="mr-3 h-5 w-5" />
              Security
            </button>
            
            <button 
              onClick={() => setActiveTab('locations')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left ${
                activeTab === 'locations' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="mr-3 h-5 w-5" />
              Monitored Locations
            </button>
            
            <button 
              onClick={() => setActiveTab('advanced')}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left ${
                activeTab === 'advanced' ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <AlertCircle className="mr-3 h-5 w-5" />
              Advanced
            </button>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {activeTab === 'general' && (
            <div className="card p-6">
              <h2 className="text-lg font-heading font-semibold text-slate-800 mb-6">General Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    System Name
                  </label>
                  <input 
                    type="text"
                    className="input"
                    defaultValue="Smart Traffic Flow AI"
                  />
                  <p className="mt-1 text-xs text-slate-500">Used in notifications and reports</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Default Map View
                  </label>
                  <select className="input">
                    <option value="3d">3D City View</option>
                    <option value="heatmap">Traffic Heatmap</option>
                    <option value="satellite">Satellite View</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Data Refresh Interval
                  </label>
                  <select className="input">
                    <option value="30">Every 30 seconds</option>
                    <option value="60">Every 1 minute</option>
                    <option value="300">Every 5 minutes</option>
                    <option value="600">Every 10 minutes</option>
                  </select>
                  <p className="mt-1 text-xs text-slate-500">How often to fetch new traffic data</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    AI Prediction Frequency
                  </label>
                  <select className="input">
                    <option value="15">Every 15 minutes</option>
                    <option value="30">Every 30 minutes</option>
                    <option value="60">Every hour</option>
                  </select>
                  <p className="mt-1 text-xs text-slate-500">How often to run the traffic prediction algorithm</p>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="ai_automate"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="ai_automate" className="ml-2 block text-sm text-gray-900">
                    Enable automatic signal optimization based on AI predictions
                  </label>
                </div>
                
                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button className="btn btn-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="card p-6">
              <h2 className="text-lg font-heading font-semibold text-slate-800 mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">Notification Types</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="notify_congestion"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify_congestion" className="ml-2 block text-sm text-gray-900">
                          Traffic Congestion Alerts
                        </label>
                      </div>
                      <select className="input h-8 py-0 w-36 text-sm">
                        <option value="all">All Levels</option>
                        <option value="high">High Only</option>
                        <option value="medium">Medium & High</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="notify_incidents"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify_incidents" className="ml-2 block text-sm text-gray-900">
                          Traffic Incidents
                        </label>
                      </div>
                      <select className="input h-8 py-0 w-36 text-sm">
                        <option value="all">All Incidents</option>
                        <option value="major">Major Only</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="notify_signal"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify_signal" className="ml-2 block text-sm text-gray-900">
                          Signal Malfunctions
                        </label>
                      </div>
                      <select className="input h-8 py-0 w-36 text-sm">
                        <option value="all">All Signals</option>
                        <option value="major">Main Intersections</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="notify_ai"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          defaultChecked
                        />
                        <label htmlFor="notify_ai" className="ml-2 block text-sm text-gray-900">
                          AI Recommendations
                        </label>
                      </div>
                      <select className="input h-8 py-0 w-36 text-sm">
                        <option value="all">All Types</option>
                        <option value="critical">Critical Only</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">Notification Channels</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        id="channel_email"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="channel_email" className="ml-2 block text-sm text-gray-900">
                        Email Notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="channel_sms"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label htmlFor="channel_sms" className="ml-2 block text-sm text-gray-900">
                        SMS Notifications
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="channel_push"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="channel_push" className="ml-2 block text-sm text-gray-900">
                        In-App Notifications
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button className="btn btn-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'advanced' && (
            <div className="card p-6">
              <h2 className="text-lg font-heading font-semibold text-slate-800 mb-6">Advanced Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    AI Training Frequency
                  </label>
                  <select className="input">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <p className="mt-1 text-xs text-slate-500">How often to retrain the AI model with new data</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Traffic Data Retention
                  </label>
                  <select className="input">
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">6 months</option>
                    <option value="365">1 year</option>
                  </select>
                  <p className="mt-1 text-xs text-slate-500">How long to keep historical traffic data</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    System Backup Frequency
                  </label>
                  <select className="input">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="debug_mode"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="debug_mode" className="ml-2 block text-sm text-gray-900">
                    Enable debug mode (verbose logging)
                  </label>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Danger Zone</h3>
                  
                  <div className="bg-red-50 border border-red-100 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Reset System Data</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>This will reset all system data, including trained AI models, historical data, and configurations.</p>
                        </div>
                        <div className="mt-3">
                          <button type="button" className="inline-flex items-center px-3 py-2 border border-red-600 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Reset All Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button className="btn btn-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Save Advanced Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;