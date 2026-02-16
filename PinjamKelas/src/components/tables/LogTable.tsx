import React, { useEffect, useState } from 'react';
import { API_URL, fetchWithAuth } from '../../config/api';

export interface Classroom {
  id?: number;
  className?: string;
  name?: string;
}

export interface LogRecord {
  id: number;
  idClassroom: number;
  description?: string;
  logTime: string;
  classroom?: Classroom;
}

const LogTable: React.FC = () => {
  const [data, setData] = useState<LogRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetchWithAuth(`${API_URL}/statuslogs`);
        if (!response.ok) throw new Error('Failed to fetch logs');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Pagination
  const logsArray = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(logsArray.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = logsArray.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div className="flex items-center justify-center py-8">Loading...</div>;
  if (error) return <div className="text-red-600 py-8">Error: {error}</div>;

  return (
    <div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-100">
              <th className="px-6 py-3 text-left text-sm font-semibold">Waktu Log</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Kelas</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((record) => (
                <tr key={record.id} className="border-b hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm">{formatDateTime(record.logTime)}</td>
                  <td className="px-6 py-3 text-sm">
                    {record.classroom?.className ?? record.classroom?.name ?? record.idClassroom}
                  </td>
                  <td className="px-6 py-3 text-sm">{record.description || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No logs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, logsArray.length)} of {logsArray.length} logs
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogTable;
