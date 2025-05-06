import React from 'react';
import { Bell, User, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <button
          type="button"
          className="md:hidden -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div className="hidden md:flex md:w-64 md:flex-shrink-0 md:items-center">
          <h1 className="font-heading font-bold text-xl text-primary-800">Traffic Flow AI</h1>
        </div>
      </div>
      
      <div className="flex-1 px-4 md:px-8">
        <div className="relative max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="input pl-10"
            placeholder="Search for locations, routes..."
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="btn-outline p-2 h-auto rounded-full relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
        </button>
        <div className="border-l border-slate-200 h-8 mx-2"></div>
        <div className="flex items-center">
          <div className="mr-2 text-right hidden md:block">
            <p className="text-sm font-medium text-slate-700">Admin User</p>
            <p className="text-xs text-slate-500">Traffic Manager</p>
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;