import React, { useState } from 'react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onStatusFilter: (status: number | null) => void;
  placeholder?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  onSearch, 
  onStatusFilter, 
  placeholder = 'Search posts...' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value ? parseInt(e.target.value) : null;
    setSelectedStatus(status);
    onStatusFilter(status);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedStatus(null);
    onSearch('');
    onStatusFilter(null);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={selectedStatus ?? ''}
            onChange={handleStatusChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="0">Pending</option>
            <option value="1">Approved</option>
            <option value="2">Rejected</option>
          </select>
        </div>

        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;