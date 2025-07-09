import axios from 'axios';
import { AuthResponse, SearchResponse, ApiError } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('rebel_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('rebel_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  },

  verify: async (): Promise<{ user: AuthUser }> => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

export const searchApi = {
  search: async (query: string, type?: string): Promise<SearchResponse> => {
    const params = new URLSearchParams({ q: query });
    if (type) params.append('type', type);
    
    const response = await api.get(`/search?${params}`);
    return response.data;
  },

  getDetails: async (type: string, id: string): Promise<any> => {
    const response = await api.get(`/details/${type}/${id}`);
    return response.data;
  },
};

export default api;