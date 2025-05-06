import React, { useState } from 'react';
import CityMap3D from '../components/CityMap3D';
import TrafficHeatmap from '../components/TrafficHeatmap';
import { Layers, Info, Calendar, Download } from 'lucide-react';

const TrafficMap: React.FC = () => {
  const [activeView, setActiveView] = useState<'3d' | 'heatmap'>('3d');
  const [timeFilter, setTimeFilter] = useState<string>('current');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-800">Traffic Map</h1>
          <p className="text-slate-500">Interactive 3D visualization with real-time data</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="btn btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export Map
          </button>
        </div>
      </div>
      
      <div className="card">
        <div className="p-4 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-slate-100 rounded-md p-0.5">
                <button 
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeView === '3d' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  onClick={() => setActiveView('3d')}
                >
                  3D View
                </button>
                <button 
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeView === 'heatmap' ? 'bg-white shadow-sm text-primary-700' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  onClick={() => setActiveView('heatmap')}
                >
                  Heatmap
                </button>
              </div>
              
              <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>
              
              <div className="flex items-center">
                <Layers className="h-4 w-4 text-slate-400 mr-2" />
                <select className="input h-9 w-36">
                  <option value="all">All Roads</option>
                  <option value="main">Main Roads</option>
                  <option value="highways">Highways Only</option>
                  <option value="downtown">Downtown</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-slate-400 mr-2" />
                <select 
                  className="input h-9 w-40"
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                >
                  <option value="current">Current</option>
                  <option value="morning">Morning Rush (7-9 AM)</option>
                  <option value="midday">Midday (11 AM-1 PM)</option>
                  <option value="evening">Evening Rush (4-6 PM)</option>
                  <option value="night">Night (8-10 PM)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-[600px]">
          {activeView === '3d' ? <CityMap3D /> : <TrafficHeatmap />}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-5">
          <div className="flex items-start">
            <div className="rounded-full bg-red-100 p-2.5">
              <Info className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-slate-800">Congestion Hotspots</h3>
              <p className="text-sm text-slate-600 mt-1">5 major congestion points detected</p>
              <ul className="mt-3 space-y-2">
                <li className="text-sm text-slate-700">• Main St & 5th Ave (Delay: 12 min)</li>
                <li className="text-sm text-slate-700">• Highway 101 Northbound (Delay: 18 min)</li>
                <li className="text-sm text-slate-700">• Downtown Bridge (Delay: 15 min)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-start">
            <div className="rounded-full bg-amber-100 p-2.5">
              <Info className="h-5 w-5 text-amber-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-slate-800">Traffic Incidents</h3>
              <p className="text-sm text-slate-600 mt-1">2 active incidents affecting traffic flow</p>
              <ul className="mt-3 space-y-2">
                <li className="text-sm text-slate-700">• Accident on 7th Avenue (Cleared in 20 min)</li>
                <li className="text-sm text-slate-700">• Road work on East Boulevard (Until 5 PM)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-start">
            <div className="rounded-full bg-green-100 p-2.5">
              <Info className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-slate-800">Optimized Routes</h3>
              <p className="text-sm text-slate-600 mt-1">3 alternative routes suggested</p>
              <ul className="mt-3 space-y-2">
                <li className="text-sm text-slate-700">• Use Riverside Dr instead of Main St</li>
                <li className="text-sm text-slate-700">• Take Highland Ave to bypass downtown</li>
                <li className="text-sm text-slate-700">• Use Express Lane on Highway 101</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;