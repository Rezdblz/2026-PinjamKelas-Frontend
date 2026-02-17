import React, { useState } from 'react';
import MyPostsTable from './tables/MyPostsTable';
import AllPostsTable from './tables/AllPostsTable';
{/*import LogTable from './tables/LogTable';*/}
import { useAuth } from '../hooks/useAuth';

type TableType = 'myPosts' | 'allPosts' | 'logTable';

const TableView: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  
  // Set default view based on role
  const defaultView: TableType = isAdmin ? 'allPosts' : 'myPosts';
  const [activeTable, setActiveTable] = useState<TableType>(defaultView);

  return (
    <div className="min-h-screen w-full bg-slate-500">
      {/* Table Toggle Navbar */}
      <div className="bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-8">
          {!isAdmin && (
            <button
              onClick={() => setActiveTable('myPosts')}
              className={`px-3 py-2 font-bold rounded-lg transition-colors text-sm ${
                activeTable === 'myPosts'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              My Posts
            </button>
          )}
          {isAdmin && (
            <>
              <button
                onClick={() => setActiveTable('allPosts')}
                className={`px-3 py-2 font-bold rounded-lg transition-colors text-sm ${
                  activeTable === 'allPosts'
                    ? 'bg-white text-slate-900'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Posts
              </button>
              {/* 
              <button
                onClick={() => setActiveTable('logTable')}
                className={`pb-2 px-3 font-medium transition-colors text-sm ${
                  activeTable === 'logTable'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Activity Logs
              </button>
              */}
            </>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!isAdmin && activeTable === 'myPosts' && <MyPostsTable />}
        {isAdmin && activeTable === 'allPosts' && <AllPostsTable />}
        {/*{isAdmin && activeTable === 'logTable' && <LogTable />}*/}
      </div>
    </div>
  );
};

export default TableView;