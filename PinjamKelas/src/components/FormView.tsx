import { useEffect, useState } from "react";
interface FormData {
    title: string;
    id_classroom: string;
    description: string;
    start_time: string;
    end_time: string;
}
interface Classroom {
    id: number
    class_name: string
    status: string
}
function FormView() {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        id_classroom: '',
        description: '',
        start_time: '',
        end_time: ''
    })
    const [classroom, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                setLoading(true);
                //add api call or endpoint here for classroom data
                const response = await fetch('')
                if (!response.ok) {
                    throw new Error('Failed to fetch Classroom')
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
        e.preventDefault();
        const postData = {
            title: formData.title,
            id_users: 1,//get from user data if possible
            id_classroom: parseInt(formData.id_classroom),
            description: formData.description,
            status: 'pending',
            start_time: new Date(formData.start_time).toISOString(),
            end_time: new Date(formData.end_time).toISOString()
        }
        console.log('sending form data to backend', postData)
        //api call here
    }
    return (
        <div className="">
            <form onSubmit={handleSubmit} className="">
                {/* title */}
                <div>
                    <label htmlFor="title" className="">
                        Judul Peminjaman
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className=""
                        placeholder="rapat,kelas,......."
                        required
                    />
                </div>
                {/* Classroom Selection - Dynamic from Database */}
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
                            .filter(classroom => classroom.status === 'available') // Only show available classrooms
                            .map((classroom) => (
                                <option key={classroom.id} value={classroom.id}>
                                    {classroom.class_name}
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
                    <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu Mulai <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        id="start_time"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
                {/* End Time */}
                <div>
                    <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu Selesai <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        id="end_time"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
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