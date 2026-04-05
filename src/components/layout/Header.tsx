import { ChevronDown, Moon, Sun, User } from 'lucide-react';
import React from 'react';
import { useFinance } from '../../context/FinanceContext';

const Header: React.FC = () => {
  const { currentRole, setCurrentRole, darkMode, toggleDarkMode } = useFinance();

  return (
    <header className="bg-slate-950/95 backdrop-blur border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-semibold text-slate-100">
              Welcome back, John!
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Role Switcher */}
            <div className="relative">
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as 'Viewer' | 'Admin')}
                className="appearance-none bg-slate-900 border border-slate-700 rounded-full px-3 py-2 pr-8 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Admin">Admin</option>
                <option value="Viewer">Viewer</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-slate-400 hover:text-slate-100 transition-colors duration-200"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;