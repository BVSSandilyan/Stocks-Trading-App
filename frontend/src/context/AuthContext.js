import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

// Use explicit backend URL so it works even if proxy fails
const BACKEND = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: `${BACKEND}/api`,
  timeout: 15000,
  withCredentials: false,
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('sta_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('sta_token');
    if (token) {
      API.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('sta_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const register = async (name, email, password) => {
    const res = await API.post('/auth/register', { name, email, password });
    localStorage.setItem('sta_token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    localStorage.setItem('sta_token', res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('sta_token');
    setUser(null);
  };

  const updateBalance = (newBalance) => {
    setUser(prev => ({ ...prev, virtualBalance: newBalance }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateBalance, API }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export { API };
