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
      console.log("login failed"+err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;