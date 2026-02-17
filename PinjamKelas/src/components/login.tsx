import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      alert('Login failed');
      console.log("login failed" + err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-slate-800 rounded-lg shadow-lg">

        <h1 className='text-3xl font-bold text-blue-400 text-center mb-8'>Pinjam Kelas</h1>
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-3 border border-slate-600 rounded bg-slate-700 text-white placeholder-slate-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 p-3 border border-slate-600 rounded bg-slate-700 text-white placeholder-slate-400"
          />
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-bold transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;