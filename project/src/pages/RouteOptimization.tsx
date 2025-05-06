import React, { useState } from 'react';
import { Car, Navigation as NavigationIcon, Clock, ArrowRight } from 'lucide-react';

interface Route {
  id: number;
  name: string;
  start: string;
  end: string;
  distance: string;
  duration: string;
  congestion: 'Low' | 'Medium' | 'High';
  saved: string;
}

const RouteOptimization: React.FC = () => {
  const [originValue, setOriginValue] = useState<string>('');
  const [destinationValue, setDestinationValue] = useState<string>('');
  
  const routes: Route[] = [
    {
      id: 1,
      name: 'Main Route',
      start: 'Downtown',
      end: 'Tech District',
      distance: '12.3 km',
      duration: '24 min',
      congestion: 'Medium',
      saved: '0 min'
    },
    {
      id: 2,
      name: 'Alternate Route 1',
      start: 'Downtown',
      end: 'Tech District',
      distance: '14.1 km',
      duration: '19 min',
      congestion: 'Low',
      saved: '5 min'
    },
    {
      id: 3,
      name: 'Highway Route',
      start: 'Downtown',
      end: 'Tech District',
      distance: '15.7 km',
      duration: '18 min',
      congestion: 'Low',
      saved: '6 min'
    },
    {
      id: 4,
      name: 'Scenic Route',
      start: 'Downtown',
      end: 'Tech District',
      distance: '13.5 km',
      duration: '22 min',
      congestion: 'Medium',
      saved: '2 min'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800">Route Optimization</h1>
          <p className="text-slate-500">AI-powered route suggestions to avoid congestion</p>
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-lg font-heading font-semibold text-slate-800 mb-4">Find Optimal Route</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Origin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <input
                type="text"
                className="input pl-8"
                placeholder="Enter starting point"
                value={originValue}
                onChange={(e) => setOriginValue(e.target.value)}
              />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
              </div>
              <input
                type="text"
                className="input pl-8"
                placeholder="Enter destination"
                value={destinationValue}
                onChange={(e) => setDestinationValue(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-end">
            <button className="btn btn-primary w-full">
              Find Routes
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-end">
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>Departure time:</span>
            <select className="ml-2 input h-8 py-0 w-36 text-sm">
              <option value="now">Now</option>
              <option value="15m">In 15 minutes</option>
              <option value="30m">In 30 minutes</option>
              <option value="1h">In 1 hour</option>
              <option value="custom">Custom time</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-slate-800">Optimized Routes</h2>
          <div className="flex items-center text-sm text-slate-600">
            <span>Sort by:</span>
            <select className="ml-2 input h-8 py-0 w-36 text-sm">
              <option value="time">Time Saved</option>
              <option value="distance">Distance</option>
              <option value="congestion">Congestion Level</option>
            </select>
          </div>
        </div>
        
        <div className="divide-y divide-slate-200">
          {routes.map((route) => (
            <div key={route.id} className="p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="rounded-full bg-primary-100 p-1.5">
                    <NavigationIcon className="h-5 w-5 text-primary-700" />
                  </div>
                  <h3 className="ml-2 font-medium text-slate-800">{route.name}</h3>
                </div>
                
                <div className="mt-2 flex items-center">
                  <span className="text-sm text-slate-600">{route.start}</span>
                  <ArrowRight className="mx-2 h-3 w-3 text-slate-400" />
                  <span className="text-sm text-slate-600">{route.end}</span>
                </div>
                
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-slate-500">Distance</p>
                    <p className="text-sm font-medium text-slate-800">{route.distance}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="text-sm font-medium text-slate-800">{route.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Congestion</p>
                    <div className="flex items-center">
                      <div 
                        className={`h-2 w-2 rounded-full mr-1.5 ${
                          route.congestion === 'Low' ? 'bg-green-500' : 
                          route.congestion === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-slate-800">{route.congestion}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  <span>Save {route.saved}</span>
                </div>
                <button className="btn btn-primary py-2 px-4 h-auto text-sm flex items-center">
                  <Car className="mr-1.5 h-4 w-4" />
                  <span>Use this route</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-lg font-heading font-semibold text-slate-800 mb-4">
          Traffic-Based Recommendations
        </h2>
        
        <div className="space-y-5">
          <div className="flex items-start p-4 bg-primary-50 border border-primary-100 rounded-lg">
            <div className="rounded-full bg-primary-100 p-1.5 mt-0.5">
              <Info className="h-4 w-4 text-primary-700" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-primary-800">AI Recommendation</h3>
              <p className="text-sm text-primary-700 mt-1">
                Based on current traffic patterns and your historical travel data, we recommend leaving 15 minutes 
                earlier tomorrow morning to avoid predicted heavy congestion on your usual route.
              </p>
            </div>
          </div>
          
          <div className="flex items-start p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="rounded-full bg-slate-100 p-1.5 mt-0.5">
              <BarChart3 className="h-4 w-4 text-slate-700" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-slate-800">Traffic Trend</h3>
              <p className="text-sm text-slate-700 mt-1">
                Rush hour congestion on Highway 101 has increased by 12% over the past week due to ongoing 
                construction. Consider alternative routes during peak hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;