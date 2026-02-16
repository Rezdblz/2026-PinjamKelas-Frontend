import React, { useState } from 'react';
import { API_URL } from '../config/api';
import { AuthContext, type User } from './AuthContextType';
export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Failed to parse user from localStorage:', e);
      localStorage.removeItem('user');
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem('token');
    } catch (e) {
      console.error('Failed to get token from localStorage:', e);
      return null;
    }
  });

  const login = async (username: string, password: string) => {
    try {
      console.log('Attempting login with:', username);
      const response = await fetch(`${API_URL}/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Login error response:', errorData);
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      console.log('Full API response:', data);
      
      // Extract from API response structure
      const user = {
        id: data.userId,
        username: data.username,
        email: data.email || '',
        role: data.role,
      };
      const token = data.token;
      
      console.log('Extracted user:', user);
      console.log('Extracted token:', token);
      
      if (!user.id || !token) {
        throw new Error('Invalid response: missing user or token');
      }
      
      setUser(user);
      setToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      
      console.log('User set to:', user);
      console.log('Token set to:', token);
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
