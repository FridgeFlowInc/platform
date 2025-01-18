import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

export const axiosWithoutAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  // baseURL: `http://176.108.253.40:8001/api/v1`,
  timeout: 10000,
})

export const axiosWithAuth = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  // baseURL: `http://176.108.253.40:8001/api/v1`,
  timeout: 10000,
})

axiosWithAuth.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState().auth
    if (accessToken) {
      config.headers['Authorization'] =
        `Bearer ${encodeURIComponent(accessToken)}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
