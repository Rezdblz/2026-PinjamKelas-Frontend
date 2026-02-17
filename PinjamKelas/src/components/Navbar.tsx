import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

interface ViewToggleProps{
  activeView: 'table'|'form'
  onToggle:(view:'table'|'form')=>void;
}

function ViewToggle({activeView,onToggle}:ViewToggleProps){
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return(
    <nav className="bg-slate-900 border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-2 md:py-4 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center shrink-0">
          <h1 className="text-[10px] xs:text-xs sm:text-sm md:text-lg lg:text-xl font-bold text-white uppercase tracking-wider">Pinjam Kelas</h1>
        </div>

        {/* Hamburger Menu - Mobile Only */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-0 bg-slate-700 rounded-lg shrink-0">

          <button 
            onClick={()=>onToggle('form')}
            className={`px-3 md:px-4 py-1 md:py-2 text-[10px] xs:text-xs sm:text-sm md:text-lg lg:text-2xl font-bold transition ${
              activeView === 'form'
                ? 'bg-white text-slate-900'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Form
          </button>
          <button 
            onClick={()=>onToggle('table')}
            className={`px-3 md:px-4 py-1 md:py-2 text-[10px] xs:text-xs sm:text-sm md:text-lg lg:text-2xl font-bold transition ${
              activeView === 'table'
                ? 'bg-white text-slate-900'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Table
          </button>
        </div>

        {/* User Info & Logout - Hide on mobile */}
        <div className="hidden md:flex items-center gap-2 md:gap-4 shrink-0">
          <div className="text-right">
            <p className="text-xs md:text-sm font-semibold text-white">{user?.username}</p>
            <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-2 md:px-4 py-2 rounded text-xs md:text-sm font-medium transition shrink-0"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 px-4 py-4">
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => {
                onToggle('form');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition text-left ${
                activeView === 'form'
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              Form
            </button>
            <button 
              onClick={() => {
                onToggle('table');
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition text-left ${
                activeView === 'table'
                  ? 'bg-white text-slate-900'
                  : 'bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              Table
            </button>
            <button
              onClick={logout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-medium transition w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
export default ViewToggle