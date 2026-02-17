import React from 'react';

export interface PostRecord {
  id: number;
  title: string;
  description: string;
  status: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  idUsers: number;
  idClassroom: number;
  user?: { id: number; name?: string; username?: string } | null;
  classroom?: { id: number; className?: string; name?: string } | null;
}

interface DetailProps {
  post: PostRecord | null;
  onClose: () => void;
}

const Detail: React.FC<DetailProps> = ({ post, onClose }) => {
  if (!post) return null;

  const getStatusLabel = (status: number) => {
    const statusLabels = { 0: 'Pending', 1: 'Approved', 2: 'Rejected' };
    return statusLabels[status as keyof typeof statusLabels] || 'Unknown';
  };

  const getStatusColor = (status: number) => {
    const colors = { 0: 'text-yellow-600', 1: 'text-green-600', 2: 'text-red-600' };
    return colors[status as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Detail Peminjaman</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Judul</label>
              <p className="text-gray-900 mt-1">{post.title}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Peminjam</label>
              <p className="text-gray-900 mt-1">{post.user?.name || post.user?.username || `User ID: ${post.idUsers}`}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Kelas</label>
              <p className="text-gray-900 mt-1">{post.classroom?.className || post.classroom?.name || `Classroom ID: ${post.idClassroom}`}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Waktu Mulai</label>
                <p className="text-gray-900 mt-1">{new Date(post.startTime).toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Waktu Selesai</label>
                <p className="text-gray-900 mt-1">{new Date(post.endTime).toLocaleString()}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Status</label>
              <p className={`mt-1 font-semibold ${getStatusColor(post.status)}`}>{getStatusLabel(post.status)}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Deskripsi</label>
              <p className="text-gray-900 mt-1 whitespace-pre-wrap">{post.description}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-600">Dibuat</label>
              <p className="text-gray-900 mt-1">{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;