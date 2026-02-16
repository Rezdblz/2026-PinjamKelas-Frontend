import { useAuth } from '../hooks/useAuth';

interface ViewToggleProps{
  activeView: 'table'|'form'
  onToggle:(view:'table'|'form')=>void;
}

function ViewToggle({activeView,onToggle}:ViewToggleProps){
  const { user, logout } = useAuth();

  return(
    <nav className="bg-blue-200 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center">
          <h1 className="text-l font-bold text-blue-600">Pinjam Kelas</h1>
        </div>
        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <button 
            onClick={()=>onToggle('form')}
            className={`px-2 py-2 text-sm font-semibold transition border-b-2 ${
              activeView === 'form'
                ? 'text-blue-600 border-blue-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Form
          </button>
          <button 
            onClick={()=>onToggle('table')}
            className={`px-2 py-2 text-sm font-semibold transition border-b-2 ${
              activeView === 'table'
                ? 'text-blue-600 border-blue-600'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            Table
          </button>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">{user?.username}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
export default ViewToggle