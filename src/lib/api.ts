import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true, // Permite enviar cookies automáticamente
})

// Flag para evitar múltiples refresh simultáneos
let isRefreshing = false
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (err: any) => void }> = []

const processQueue = (error: any) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })

  isRefreshing = false
  failedQueue = []
}

// Interceptor de respuesta para manejar refresh automático
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Si es 401 con code: TOKEN_EXPIRED, intenta refresh
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Si ya está refresco, espera en la cola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Intenta renovar el access token
        const { refreshAccessToken } = useAuthStore.getState()
        await refreshAccessToken()

        processQueue(null)

        // Reintenta la petición original
        return api(originalRequest)
      } catch (err) {
        processQueue(err)

        // El refresh falló, redirect a login
        window.location.href = '/'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api