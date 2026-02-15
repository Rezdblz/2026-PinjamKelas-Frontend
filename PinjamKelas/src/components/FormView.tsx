import { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface FormData {
    title: string;
    id_classroom: string;
    description: string;
    start_time: Date | null;
    end_time: Date | null;
}
interface Classroom {
    id: number
    className: string
    status: number
}
function FormView() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        id_classroom: '',
        description: '',
        start_time: null,
        end_time: null,
    })
    const [classroom, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                setLoading(true);
                const apiUrl = import.meta.env.VITE_API_URL;
                console.log('Fetching from:', `${apiUrl}/Classrooms`);
                const response = await fetch(`${apiUrl}/Classrooms`)
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`)
                }
                const data = await response.json();
                setClassrooms(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'an error occured');
                console.error('Error fetching classrooms:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchClassrooms();
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.start_time || !formData.end_time) {
            alert('Waktu mulai dan selesai wajib diisi.')
            return
        }

        const postData = {
            title: formData.title,
            id_users: 1, // TODO: from session
            id_classroom: parseInt(formData.id_classroom, 10),
            description: formData.description,
            status: 'pending',
            start_time: formData.start_time.toISOString(),
            End_time: formData.end_time.toISOString(),
        }

        console.log('Submitting to backend:', postData)
        // TODO: API call
    }
    return (
        <div className="min-h-screen w-full bg-slate-50 py-8 px-4">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 space-y-6">
                {/* title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Judul Peminjaman
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="rapat,kelas,......."
                        required
                    />
                </div>
                {/* Classroom Selection */}
                <div>
                    <label htmlFor="id_classroom" className="block text-sm font-medium text-gray-700 mb-2">
                        Pilih Kelas <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="id_classroom"
                        name="id_classroom"
                        value={formData.id_classroom}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                        disabled={loading}
                    >
                        <option value="">
                            {loading ? 'Loading...' : '-- Pilih Kelas --'}
                        </option>
                        {classroom
                            .filter(classroom => classroom.status === 0) // Status 0 = available
                            .map((classroom) => (
                                <option key={classroom.id} value={classroom.id}>
                                    {classroom.className}
                                </option>
                            ))}
                    </select>
                    {error && (
                        <p className="text-xs text-red-500 mt-1">Error: {error}</p>
                    )}
                    {!loading && classroom.length === 0 && (
                        <p className="text-xs text-yellow-600 mt-1">Tidak ada kelas tersedia</p>
                    )}
                </div>
                {/* Start Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu Mulai <span className="text-red-500">*</span>
                    </label>
                    <Flatpickr
                        value={formData.start_time ?? undefined}
                        options={{ enableTime: true, dateFormat: 'Y-m-d H:i' }}
                        onChange={([date]) => setFormData({ ...formData, start_time: date ?? null })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                {/* End Time */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu Selesai <span className="text-red-500">*</span>
                    </label>
                    <Flatpickr
                        value={formData.end_time ?? undefined}
                        options={{ enableTime: true, dateFormat: 'Y-m-d H:i' }}
                        onChange={([date]) => setFormData({ ...formData, end_time: date ?? null })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi Keperluan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Jelaskan keperluan peminjaman kelas secara detail"
                        required
                    />
                </div>
                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                    >
                        Ajukan Peminjaman
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormView;