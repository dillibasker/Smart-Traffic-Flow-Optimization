import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Navigation as NavigationIcon, 
  Zap, 
  BarChart3, 
  Settings
} from 'lucide-react';

interface SidebarProps {
  mobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false }) => {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center px-3 py-2 text-sm font-medium rounded-md ${
      isActive 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    <div className={`flex flex-col h-full border-r border-slate-200 bg-white ${mobile ? 'pt-16' : ''}`}>
      {!mobile && (
        <div className="flex h-16 shrink-0 items-center px-4 border-b border-slate-200">
          <h1 className="font-heading font-bold text-xl text-primary-800">Traffic Flow AI</h1>
        </div>
      )}
      
      <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4 px-3">
        <nav className="flex-1 space-y-1">
          <NavLink to="/" className={navLinkClass} end>
            <LayoutDashboard className="mr-3 h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink to="/map" className={navLinkClass}>
            <Map className="mr-3 h-5 w-5" />
            Traffic Map
          </NavLink>
          <NavLink to="/routes" className={navLinkClass}>
          <NavigationIcon className="mr-3 h-5 w-5" />
            Route Optimization
          </NavLink>
          <NavLink to="/signals" className={navLinkClass}>
            <Zap className="mr-3 h-5 w-5" />
            Signal Management
          </NavLink>
          <NavLink to="/analytics" className={navLinkClass}>
            <BarChart3 className="mr-3 h-5 w-5" />
            Analytics
          </NavLink>
          <NavLink to="/settings" className={navLinkClass}>
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </NavLink>
        </nav>
      </div>
      
      <div className="px-3 py-4 border-t border-slate-200">
        <div className="rounded-md bg-primary-50 p-3">
          <h3 className="text-sm font-medium text-primary-800">AI Status</h3>
          <div className="mt-2 flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs font-medium text-slate-700">Prediction Active</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">Last update: 2 mins ago</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;