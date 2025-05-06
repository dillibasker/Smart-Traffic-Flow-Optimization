import React, { useState } from 'react';
import { Zap, Clock, AlertTriangle, Check, ChevronDown, ChevronUp, BarChart3, Info } from 'lucide-react';

interface TrafficSignal {
  id: number;
  name: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  congestion: 'Low' | 'Medium' | 'High';
  optimized: boolean;
  recommendation?: string;
}

const SignalManagement: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const trafficSignals: TrafficSignal[] = [
    {
      id: 1,
      name: 'Main & 5th Intersection',
      location: 'Downtown',
      status: 'Active',
      congestion: 'High',
      optimized: false,
      recommendation: 'Extend green light duration by 15 seconds during peak hours'
    },
    {
      id: 2,
      name: 'Highway 101 Entrance',
      location: 'North District',
      status: 'Active',
      congestion: 'Medium',
      optimized: true
    },
    {
      id: 3,
      name: 'Park Avenue & 3rd',
      location: 'East District',
      status: 'Maintenance',
      congestion: 'Low',
      optimized: false,
      recommendation: 'Resume normal operation within 2 hours'
    },
    {
      id: 4,
      name: 'Commerce & State St',
      location: 'Business District',
      status: 'Active',
      congestion: 'High',
      optimized: false,
      recommendation: 'Synchronize with adjacent signals for better flow'
    },
    {
      id: 5,
      name: 'University Blvd',
      location: 'Campus Area',
      status: 'Active',
      congestion: 'Medium',
      optimized: true
    }
  ];

  const filteredSignals = selectedStatus === 'all' 
    ? trafficSignals 
    : trafficSignals.filter(signal => {
        if (selectedStatus === 'optimized') return signal.optimized;
        if (selectedStatus === 'needs-optimization') return !signal.optimized;
        return signal.status.toLowerCase() === selectedStatus.toLowerCase();
      });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800">Signal Management</h1>
          <p className="text-slate-500">Monitor and optimize traffic signal timings</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="btn btn-primary">
            <Zap className="h-4 w-4 mr-2" />
            Optimize All Signals
          </button>
        </div>
      </div>
      
      <div className="card p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-lg font-heading font-semibold text-slate-800">Traffic Signals</h2>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center">
              <span className="text-sm text-slate-600 mr-2">Filter:</span>
              <select 
                className="input h-9 py-1"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Signals</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
                <option value="optimized">Optimized</option>
                <option value="needs-optimization">Needs Optimization</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-slate-600 mr-2">Region:</span>
              <select className="input h-9 py-1">
                <option value="all">All Regions</option>
                <option value="downtown">Downtown</option>
                <option value="north">North District</option>
                <option value="east">East District</option>
                <option value="business">Business District</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-6 divide-y divide-slate-200">
          {filteredSignals.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-slate-500">No traffic signals match your filter criteria.</p>
            </div>
          ) : (
            filteredSignals.map((signal) => (
              <div key={signal.id} className="py-4">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpanded(expanded === signal.id ? null : signal.id)}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      signal.status === 'Active' ? 'bg-green-100' : 
                      signal.status === 'Inactive' ? 'bg-slate-100' : 
                      'bg-amber-100'
                    }`}>
                      <Zap className={`h-5 w-5 ${
                        signal.status === 'Active' ? 'text-green-600' : 
                        signal.status === 'Inactive' ? 'text-slate-600' : 
                        'text-amber-600'
                      }`} />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-slate-800">{signal.name}</h3>
                      <p className="text-sm text-slate-500">{signal.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                      <p className="text-xs text-slate-500">Status</p>
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-1.5 ${
                          signal.status === 'Active' ? 'bg-green-500' : 
                          signal.status === 'Inactive' ? 'bg-slate-500' : 
                          'bg-amber-500'
                        }`}></div>
                        <span className="text-sm font-medium text-slate-700">{signal.status}</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:block">
                      <p className="text-xs text-slate-500">Congestion</p>
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-1.5 ${
                          signal.congestion === 'Low' ? 'bg-green-500' : 
                          signal.congestion === 'Medium' ? 'bg-amber-500' : 
                          'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium text-slate-700">{signal.congestion}</span>
                      </div>
                    </div>
                    
                    <div className="hidden md:block">
                      <p className="text-xs text-slate-500">Optimization</p>
                      <div className="flex items-center">
                        {signal.optimized ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            Optimized
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Needs Review
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {expanded === signal.id ? (
                      <ChevronUp className="h-5 w-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    )}
                  </div>
                </div>
                
                {expanded === signal.id && (
                  <div className="mt-4 pl-14 pr-4 pb-2 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="text-sm font-medium text-slate-700">Signal Timing</h4>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Green Light:</span>
                            <span className="text-xs font-medium text-slate-700">45 seconds</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Yellow Light:</span>
                            <span className="text-xs font-medium text-slate-700">4 seconds</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Red Light:</span>
                            <span className="text-xs font-medium text-slate-700">60 seconds</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Full Cycle:</span>
                            <span className="text-xs font-medium text-slate-700">109 seconds</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="text-sm font-medium text-slate-700">Traffic Flow</h4>
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Vehicles/Hour:</span>
                            <span className="text-xs font-medium text-slate-700">450</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Avg. Wait Time:</span>
                            <span className="text-xs font-medium text-slate-700">75 seconds</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Peak Hours:</span>
                            <span className="text-xs font-medium text-slate-700">8-9 AM, 5-6 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-slate-500">Last Updated:</span>
                            <span className="text-xs font-medium text-slate-700">15 mins ago</span>
                          </div>
                        </div>
                      </div>
                      
                      {signal.recommendation && (
                        <div className="p-3 bg-primary-50 border border-primary-100 rounded-lg">
                          <div className="flex">
                            <Info className="h-4 w-4 text-primary-700 mt-0.5" />
                            <div className="ml-2">
                              <h4 className="text-sm font-medium text-primary-800">AI Recommendation</h4>
                              <p className="mt-1 text-xs text-primary-700">{signal.recommendation}</p>
                              <button className="mt-2 btn btn-primary py-1 px-3 h-auto text-xs">
                                Apply Recommendation
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 flex justify-end space-x-3">
                      <button className="btn btn-outline py-2 px-3 h-auto text-xs">
                        <BarChart3 className="h-3.5 w-3.5 mr-1" />
                        View Details
                      </button>
                      <button className="btn btn-primary py-2 px-3 h-auto text-xs">
                        <Zap className="h-3.5 w-3.5 mr-1" />
                        Optimize Signal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-5">
          <h2 className="font-heading font-semibold text-slate-800 mb-3">Signal Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Overall Efficiency</p>
                <p className="text-xs text-slate-500">Based on wait times and traffic flow</p>
              </div>
              <div className="w-24 bg-slate-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <span className="text-sm font-medium text-slate-700">75%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">Optimization Rate</p>
                <p className="text-xs text-slate-500">Signals operating at optimal settings</p>
              </div>
              <div className="w-24 bg-slate-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm font-medium text-slate-700">60%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">System Uptime</p>
                <p className="text-xs text-slate-500">Signals operational status</p>
              </div>
              <div className="w-24 bg-slate-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '98%' }}></div>
              </div>
              <span className="text-sm font-medium text-slate-700">98%</span>
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <h2 className="font-heading font-semibold text-slate-800 mb-3">Critical Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-red-50 border border-red-100 rounded-md">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
              <div className="ml-2">
                <p className="text-sm font-medium text-red-800">Signal Malfunction</p>
                <p className="text-xs text-red-700">Riverside & Oak Street - Reported 23 mins ago</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-amber-50 border border-amber-100 rounded-md">
              <Clock className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="ml-2">
                <p className="text-sm font-medium text-amber-800">Timing Adjustment Needed</p>
                <p className="text-xs text-amber-700">Highway 101 & Commerce Blvd - High congestion detected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalManagement;