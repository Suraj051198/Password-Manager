import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    masterPassword: ''
  });
  const { login, register, user } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(formData.username, formData.password);
        toast.success('Login successful!');
      } else {
        if (!formData.masterPassword) {
          toast.error('Master password is required for registration');
          setIsLoading(false);
          return;
        }
        await register(formData.username, formData.password, formData.masterPassword);
        toast.success('Registration successful! Please login.');
        setIsLogin(true);
      }
      setFormData({ username: '', password: '', masterPassword: '' });
    } catch (error) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
            required
            disabled={isLoading}
          />
        </div>
        {!isLogin && (
          <div>
            <input
              type="password"
              name="masterPassword"
              value={formData.masterPassword}
              onChange={handleChange}
              placeholder="Master Password (for encrypting your passwords)"
              className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
              required
              disabled={isLoading}
            />
            <p className="text-sm text-gray-500 mt-1">
              This password will be used to encrypt your stored passwords. Make sure to remember it!
            </p>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            isLogin ? 'Login' : 'Register'
          )}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-green-500 hover:text-green-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
} 