import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { API_URL, fetchWithAuth } from '../../config/api';

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

interface UpdateProps {
  post: PostRecord | null;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  title: string;
  description: string;
  startTime: Date | null;
  endTime: Date | null;
}

const Update: React.FC<UpdateProps> = ({ post, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    startTime: null,
    endTime: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        description: post.description,
        startTime: new Date(post.startTime),
        endTime: new Date(post.endTime),
      });
    }
  }, [post]);

  if (!post) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (field: 'startTime' | 'endTime', dates: Date[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: dates[0] || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.title.trim() || !formData.description.trim() || !formData.startTime || !formData.endTime) {
        setError('Semua field harus diisi');
        setLoading(false);
        return;
      }

      const updateData = {
        title: formData.title,
        description: formData.description,
        startTime: formData.startTime.toISOString(),
        endTime: formData.endTime.toISOString(),
      };

      const response = await fetchWithAuth(`${API_URL}/Posts/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update post: ${errorText || response.statusText}`);
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Edit Peminjaman</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
              &times;
            </button>
          </div>

          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">✓ Peminjaman berhasil diperbarui!</p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Judul</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Deskripsi</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Waktu Mulai</label>
                <Flatpickr
                  value={formData.startTime || ''}
                  onChange={(dates) => handleDateChange('startTime', dates)}
                  options={{
                    enableTime: true,
                    dateFormat: 'Y-m-d H:i',
                    time_24hr: true,
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">Waktu Selesai</label>
                <Flatpickr
                  value={formData.endTime || ''}
                  onChange={(dates) => handleDateChange('endTime', dates)}
                  options={{
                    enableTime: true,
                    dateFormat: 'Y-m-d H:i',
                    time_24hr: true,
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
