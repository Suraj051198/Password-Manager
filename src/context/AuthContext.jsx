import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/localStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (err) {
        console.error('Error parsing stored user data:', err);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await authService.login(username, password);
      const userData = { 
        id: response.userId, 
        username,
        masterPassword: password // In a real app, this should be handled more securely
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const register = async (username, password, masterPassword) => {
    try {
      setError(null);
      const response = await authService.register(username, password, masterPassword);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    error,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 