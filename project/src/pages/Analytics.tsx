import React, { useState } from 'react';
import { BarChart3, PieChart, LineChart, Download,
  Navigation as NavigationIcon, 
   Calendar } from 'lucide-react';

const Analytics: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<string>('week');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800">Traffic Analytics</h1>
          <p className="text-slate-500">Insights and performance metrics for traffic flow</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-slate-400 mr-2" />
            <select 
              className="input h-9"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button className="btn btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-slate-800">Congestion Reduction</h2>
            <div className="rounded-full p-1.5 bg-green-100">
              <LineChart className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">18%</p>
            <p className="text-sm text-slate-500 mt-1">Lower than previous period</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-slate-600">Trending downward</span>
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-slate-800">Average Commute Time</h2>
            <div className="rounded-full p-1.5 bg-amber-100">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">24.5 min</p>
            <p className="text-sm text-slate-500 mt-1">5.2 min reduction</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-slate-600">Improved vs. last month</span>
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-semibold text-slate-800">Optimized Routes</h2>
            <div className="rounded-full p-1.5 bg-primary-100">
              <NavigationIcon className="h-4 w-4 text-primary-600" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary-600">247</p>
            <p className="text-sm text-slate-500 mt-1">+32 from previous period</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs text-slate-600">14.8% increase</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-semibold text-slate-800">Traffic Volume by Time</h2>
            <div className="flex items-center">
              <span className="text-xs text-slate-500 mr-2">View by:</span>
              <div className="bg-slate-100 rounded-md p-0.5 flex text-xs">
                <button className="px-2 py-1 rounded bg-white text-primary-700 shadow-sm font-medium">
                  Day
                </button>
                <button className="px-2 py-1 rounded text-slate-600 hover:text-slate-900">
                  Week
                </button>
                <button className="px-2 py-1 rounded text-slate-600 hover:text-slate-900">
                  Month
                </button>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            <div className="text-center px-4">
              <BarChart3 className="h-16 w-16 text-slate-300 mx-auto" />
              <p className="mt-2 text-sm text-slate-600">Traffic volume chart visualization</p>
              <p className="text-xs text-slate-500">Shows vehicle count by hour of day</p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2 bg-slate-50 rounded">
              <p className="font-medium text-slate-800">Peak Morning</p>
              <p className="text-xs text-slate-600">8:15 AM</p>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <p className="font-medium text-slate-800">Peak Evening</p>
              <p className="text-xs text-slate-600">5:30 PM</p>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <p className="font-medium text-slate-800">Quietest Period</p>
              <p className="text-xs text-slate-600">3:00 AM</p>
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-semibold text-slate-800">Traffic Distribution</h2>
            <div className="flex items-center text-xs">
              <div className="flex items-center mr-3">
                <div className="h-2 w-2 rounded-full bg-primary-500 mr-1"></div>
                <span className="text-slate-600">Main Roads</span>
              </div>
              <div className="flex items-center mr-3">
                <div className="h-2 w-2 rounded-full bg-secondary-500 mr-1"></div>
                <span className="text-slate-600">Highways</span>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-accent-500 mr-1"></div>
                <span className="text-slate-600">Side Streets</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            <div className="text-center px-4">
              <PieChart className="h-16 w-16 text-slate-300 mx-auto" />
              <p className="mt-2 text-sm text-slate-600">Traffic distribution chart</p>
              <p className="text-xs text-slate-500">Shows vehicle distribution by road type</p>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <p className="text-sm text-slate-700 w-40">Main Roads</p>
              <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-sm font-medium text-slate-700 ml-3 w-8">45%</p>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-slate-700 w-40">Highways</p>
              <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                <div className="bg-secondary-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-sm font-medium text-slate-700 ml-3 w-8">35%</p>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-slate-700 w-40">Side Streets</p>
              <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <p className="text-sm font-medium text-slate-700 ml-3 w-8">20%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-slate-800">AI Optimization Impact</h2>
          <div className="flex items-center">
            <span className="text-xs text-slate-500 mr-2">Metric:</span>
            <select className="input h-8 py-0 w-40 text-sm">
              <option value="congestion">Congestion Reduction</option>
              <option value="time">Time Saved</option>
              <option value="emissions">Emissions Reduction</option>
              <option value="fuel">Fuel Saved</option>
            </select>
          </div>
        </div>
        
        <div className="p-5">
          <div className="h-80 flex items-center justify-center bg-slate-50 rounded-lg">
            <div className="text-center px-4">
              <LineChart className="h-16 w-16 text-slate-300 mx-auto" />
              <p className="mt-2 text-sm text-slate-600">AI optimization impact over time</p>
              <p className="text-xs text-slate-500">Shows improvement metrics since AI implementation</p>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="text-sm font-medium text-slate-700">Time Saved</h3>
              <p className="mt-1 text-xl font-bold text-primary-700">287,450 hours</p>
              <p className="text-xs text-slate-500">For all commuters combined</p>
            </div>
            
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="text-sm font-medium text-slate-700">Fuel Saved</h3>
              <p className="mt-1 text-xl font-bold text-primary-700">124,500 gallons</p>
              <p className="text-xs text-slate-500">Estimated reduction in consumption</p>
            </div>
            
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="text-sm font-medium text-slate-700">CO2 Reduction</h3>
              <p className="mt-1 text-xl font-bold text-primary-700">1,120 tons</p>
              <p className="text-xs text-slate-500">Estimated emissions prevented</p>
            </div>
            
            <div className="p-4 border border-slate-200 rounded-lg">
              <h3 className="text-sm font-medium text-slate-700">Economic Benefit</h3>
              <p className="mt-1 text-xl font-bold text-primary-700">$4.2 million</p>
              <p className="text-xs text-slate-500">Estimated economic impact</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;