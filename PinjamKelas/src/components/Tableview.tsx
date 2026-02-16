import React, { useState } from 'react';
import MyPostsTable from './tables/MyPostsTable';
import AllPostsTable from './tables/AllPostsTable';
import LogTable from './tables/LogTable';
import { useAuth } from '../hooks/useAuth';

type TableType = 'myPosts' | 'allPosts' | 'logTable';

const TableView: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  
  // Set default view based on role
  const defaultView: TableType = isAdmin ? 'allPosts' : 'myPosts';
  const [activeTable, setActiveTable] = useState<TableType>(defaultView);

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* Table Toggle Navbar */}
      <div className="bg-white border-b">
        <div className="p-4 flex gap-6">
          {!isAdmin && (
            <button
              onClick={() => setActiveTable('myPosts')}
              className={`pb-2 px-2 font-medium transition-colors ${
                activeTable === 'myPosts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Posts
            </button>
          )}
          {isAdmin && (
            <>
              <button
                onClick={() => setActiveTable('allPosts')}
                className={`pb-2 px-2 font-medium transition-colors ${
                  activeTable === 'allPosts'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setActiveTable('logTable')}
                className={`pb-2 px-2 font-medium transition-colors ${
                  activeTable === 'logTable'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Activity Logs
              </button>
            </>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="p-8">
        {!isAdmin && activeTable === 'myPosts' && <MyPostsTable />}
        {isAdmin && activeTable === 'allPosts' && <AllPostsTable />}
        {isAdmin && activeTable === 'logTable' && <LogTable />}
      </div>
    </div>
  );
};

export default TableView;