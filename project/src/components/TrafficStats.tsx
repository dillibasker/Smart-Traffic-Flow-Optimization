import React from 'react';
import { ArrowDown, ArrowUp, Clock, 
  Navigation as NavigationIcon, Car
  } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change && change > 0;
  
  return (
    <div className="card p-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          
          {change !== undefined && (
            <div className="mt-2 flex items-center">
              {isPositive ? (
                <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
              )}
              <span 
                className={`text-xs font-medium ${
                  isPositive ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-slate-400 ml-1">from last week</span>
            </div>
          )}
        </div>
        
        <div className="rounded-full p-2 bg-primary-100">
          {icon}
        </div>
      </div>
    </div>
  );
};

const TrafficStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Average Traffic Speed"
        value="32 km/h"
        change={-15}
        icon={<Car className="h-5 w-5 text-primary-700" />}
      />
      <StatCard 
        title="Congestion Level"
        value="Medium"
        change={5}
        icon={<Clock className="h-5 w-5 text-primary-700" />}
      />
      <StatCard 
        title="Active Traffic Signals"
        value={124}
        icon={<Clock className="h-5 w-5 text-primary-700" />}
      />
      <StatCard 
        title="Optimized Routes"
        value={18}
        change={-8}
        icon={<NavigationIcon className="h-5 w-5 text-primary-700" />}
      />
    </div>
  );
};

export default TrafficStats;