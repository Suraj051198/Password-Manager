import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || 'An error occurred');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Request setup error');
    }
  }
);

// Auth services
export const authService = {
  register: async (username, password) => {
    const response = await api.post('/register', { username, password });
    return response.data;
  },
  login: async (username, password) => {
    const response = await api.post('/login', { username, password });
    return response.data;
  },
};

// Password services
export const passwordService = {
  getAll: async (userId) => {
    const response = await api.get(`/passwords/${userId}`);
    return response.data;
  },
  create: async (userId, site, username, password) => {
    const response = await api.post('/passwords', { userId, site, username, password });
    return response.data;
  },
  update: async (id, site, username, password) => {
    const response = await api.put(`/passwords/${id}`, { site, username, password });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/passwords/${id}`);
    return response.data;
  },
}; 