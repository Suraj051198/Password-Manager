import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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