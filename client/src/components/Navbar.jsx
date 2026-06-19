import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  User, LayoutDashboard, Flag, LogOut,
  ChevronDown, Settings, Bell,
} from 'lucide-react';
import BrandLogo from './BrandLogo';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const showAccountMenu = location.pathname === '/home';

  return (
    <nav
      className="flex justify-between items-center px-8 py-4 sticky top-0 z-50 transition-all duration-300"
      style={{
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--glass-border)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <BrandLogo size="nav" />

      {showAccountMenu && (
      <div className="flex items-center gap-4 relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-lg"
          style={{
            background: 'var(--glass-bg)',
            borderColor: 'var(--glass-border)',
            color: 'var(--text-main)',
            borderWidth: '1px',
          }}
        >
          <div className="bg-blue-500/20 p-1.5 rounded-lg border border-blue-500/30">
            <User size={16} className="text-blue-500" />
          </div>
          <span>My Account</span>
          <ChevronDown
            className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
            style={{ color: 'var(--text-muted)' }}
            size={16}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 glass-card-dark py-2 z-50 shadow-2xl transform origin-top-right transition-all">
            <div className="px-4 py-3 mb-2 border-b border-slate-700 bg-slate-800/50">
              <p className="text-sm font-bold text-white">Student User</p>
              <p className="text-xs text-slate-400">student@university.edu</p>
            </div>

            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <LayoutDashboard size={18} className="text-blue-400" /> Command Dashboard
            </Link>

            <Link
              to="/report"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Flag size={18} className="text-red-400" /> Report a Scam
            </Link>

            <Link
              to="/account"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <User size={18} className="text-emerald-400" /> Profile Settings
            </Link>

            <div className="border-t border-slate-700 my-2" />

            <Link
              to="/notifications"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors justify-between"
              onClick={() => setIsDropdownOpen(false)}
            >
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-yellow-400" /> Alerts
              </div>
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 New</span>
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Settings size={18} className="text-slate-400" /> App Preferences
            </Link>

            <div className="border-t border-slate-700 my-2" />

            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/');
              }}
            >
              <LogOut size={18} /> Sign Out
            </button>
          </div>
        )}
      </div>
      )}
    </nav>
  );
};

export default Navbar;
