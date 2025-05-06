import React from 'react';
import TrafficStats from '../components/TrafficStats';
import CityMap3D from '../components/CityMap3D';
import { BarChart3, AlertTriangle, Navigation as NavigationIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800">Traffic Dashboard</h1>
          <p className="text-slate-500">Real-time traffic monitoring and predictions</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="btn btn-primary">
            Run AI Prediction
          </button>
          <button className="btn btn-outline">
            Export Report
          </button>
        </div>
      </div>
      
      <TrafficStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <div className="p-4 border-b border-slate-200">
            <h2 className="font-heading font-semibold text-slate-800">City Traffic Map</h2>
            <p className="text-sm text-slate-500">3D visualization with real-time traffic data</p>
          </div>
          <div className="h-[400px]">
            <CityMap3D />
          </div>
        </div>
        
        <div className="card">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-heading font-semibold text-slate-800">Traffic Incidents</h2>
              <p className="text-sm text-slate-500">Recent alerts and congestion</p>
            </div>
            <button className="btn btn-outline p-1 h-7">View All</button>
          </div>
          <div className="p-4 h-[400px] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-amber-50 border border-amber-100 rounded-md">
                <div className="rounded-full bg-amber-100 p-1.5 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">Congestion Alert</h3>
                  <p className="text-sm text-amber-700">Heavy traffic on Main Street due to accident</p>
                  <p className="text-xs text-amber-600 mt-1">10 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-red-50 border border-red-100 rounded-md">
                <div className="rounded-full bg-red-100 p-1.5 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-red-800">Road Closure</h3>
                  <p className="text-sm text-red-700">5th Avenue closed due to construction</p>
                  <p className="text-xs text-red-600 mt-1">25 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-100 rounded-md">
                <div className="rounded-full bg-green-100 p-1.5 mt-0.5">
                  <NavigationIcon className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Route Optimized</h3>
                  <p className="text-sm text-green-700">Downtown signal timing updated for rush hour</p>
                  <p className="text-xs text-green-600 mt-1">45 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-slate-50 border border-slate-200 rounded-md">
                <div className="rounded-full bg-slate-100 p-1.5 mt-0.5">
                  <BarChart3 className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800">AI Model Update</h3>
                  <p className="text-sm text-slate-700">Traffic prediction model retrained with latest data</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card p-5">
        <div className="mb-4">
          <h2 className="font-heading font-semibold text-slate-800">Traffic Flow Prediction</h2>
          <p className="text-sm text-slate-500">AI-powered forecast for next 2 hours</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-medium text-slate-700">Current Status</h3>
            <div className="mt-2 flex items-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
              <span className="font-medium text-slate-800">Medium Congestion</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">Avg Speed: 28 km/h</p>
            <p className="text-sm text-slate-600">Delay: 12 min</p>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-medium text-slate-700">+1 Hour Prediction</h3>
            <div className="mt-2 flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span className="font-medium text-slate-800">Heavy Congestion</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">Avg Speed: 18 km/h</p>
            <p className="text-sm text-slate-600">Delay: 25 min</p>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg">
            <h3 className="font-medium text-slate-700">+2 Hour Prediction</h3>
            <div className="mt-2 flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="font-medium text-slate-800">Light Congestion</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">Avg Speed: 42 km/h</p>
            <p className="text-sm text-slate-600">Delay: 5 min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;