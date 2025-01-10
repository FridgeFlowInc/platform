import axios from 'axios';

import { useStore } from '@/store/zustand';

const axiosWithoutAuth = axios.create({
  // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  baseURL: `http://176.108.253.40:8001/api/v1`,
  timeout: 10000,
});

const axiosWithAuth = axios.create({
  // baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  baseURL: `http://176.108.253.40:8001/api/v1`,
  timeout: 10000,
});

axiosWithAuth.interceptors.request.use(
  (config) => {
    const { token, isAuthenticated } = useStore.getState();
    if (isAuthenticated && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosWithoutAuth, axiosWithAuth };
