import React, { useEffect, useState } from 'react';
import { API_URL } from '../../config/api';
import Detail, { type PostRecord } from '../ButtonComponents/Detail';
import { useAuth } from '../../hooks/useAuth';
import Update from '../ButtonComponents/Update';
import SearchFilter from '../filter/SearchFilter';

const MyPostsTable: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<PostRecord[]>([]);
  const [filteredData, setFilteredData] = useState<PostRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostRecord | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [postToUpdate, setPostToUpdate] = useState<PostRecord | null>(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        if (!user?.id) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/Posts/user/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading posts');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [user?.id]);

  useEffect(() => {
    let filtered = data;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== null) {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    setFilteredData(filtered);
  }, [data, searchQuery, statusFilter]);

  const getStatusBadge = (status: number) => {
    const statusStyles = {
      0: 'bg-yellow-100 text-yellow-800',
      1: 'bg-green-100 text-green-800',
      2: 'bg-red-100 text-red-800',
    };
    return statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: number) => {
    const statusLabels = {
      0: 'pending',
      1: 'approved',
      2: 'rejected',
    };
    return statusLabels[status as keyof typeof statusLabels] || 'unknown';
  };

  const handleUpdate = (id: number) => {
    const post = data.find(p => p.id === id);
    if (post) {
      setPostToUpdate(post);
      setShowUpdateModal(true);
    }
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    setPostToUpdate(null);
  };

  const handleUpdateSuccess = () => {
    // Refresh the posts list after successful update
    const fetchMyPosts = async () => {
      try {
        if (!user?.id) return;
        const response = await fetch(`${API_URL}/Posts/user/${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error refreshing posts:', err);
      }
    };
    fetchMyPosts();
  };

  const handleDetail = (id: number) => {
    const post = data.find(p => p.id === id);
    if (post) {
      setSelectedPost(post);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const response = await fetch(`${API_URL}/Posts/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      
      setData(data.filter(post => post.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Failed to delete post');
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) return <div className="flex items-center justify-center py-8">Loading...</div>;
  if (error) return <div className="text-red-600 py-8">Error: {error}</div>;

  return (
    <>
      <SearchFilter 
        onSearch={setSearchQuery}
        onStatusFilter={setStatusFilter}
        placeholder="Search your posts..."
      />
      
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b bg-slate-100">
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Judul</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Kelas</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Status</th>
              <th className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Waktu Mulai</th>
              <th className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Waktu Selesai</th>
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record) => (
              <tr key={record.id} className="border-b hover:bg-slate-50">
                <td className="px-2 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">{record.title}</td>
                <td className="px-2 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">
                  {record.classroom?.className ?? record.classroom?.name ?? record.idClassroom}
                </td>
                <td className="px-2 sm:px-6 py-2 sm:py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(record.status)}`}>
                    {getStatusLabel(record.status)}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">{formatDateTime(record.startTime)}</td>
                <td className="hidden sm:table-cell px-2 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm">{formatDateTime(record.endTime)}</td>
                <td className="px-2 sm:px-6 py-2 sm:py-3">
                  <div className="flex gap-1 sm:gap-2">
                    <button 
                      onClick={() => handleUpdate(record.id)}
                      style={{ backgroundColor: '#ca8a04' }}
                      className="hover:opacity-80 text-white px-2 sm:px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDetail(record.id)}
                      style={{ backgroundColor: '#2563eb' }}
                      className="hover:opacity-80 text-white px-2 sm:px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Detail
                    </button>
                    <button 
                      onClick={() => handleDelete(record.id)}
                      style={{ backgroundColor: '#dc2626' }}
                      className="hover:opacity-80 text-white px-2 sm:px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Detail post={selectedPost} onClose={() => setSelectedPost(null)} />
      
      {showUpdateModal && (
        <Update 
          post={postToUpdate} 
          onClose={handleUpdateClose} 
          onSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default MyPostsTable;