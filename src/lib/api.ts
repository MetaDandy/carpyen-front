import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true, // Permite enviar cookies automáticamente
})

// Flag para evitar múltiples refresh simultáneos
let isRefreshing = false
let isLoggingOut = false
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

/**
 * Intenta refrescar el token si está próximo a expirar o expirado
 * Esto se ejecuta ANTES de cada petición
 */
const tryAutoRefresh = async () => {
  const authStore = useAuthStore.getState()
  
  // Si no está autenticado, no hacer nada
  if (!authStore.isAuthenticated) {
    return
  }
  
  // Si ya está en proceso de logout, no hacer nada
  if (isLoggingOut) {
    return
  }

  // Verificar si el token está expirado O próximo a expirar
  const isExpired = authStore.isTokenExpired()
  const isExpiringSoon = authStore.isTokenExpiringSoon(5)

  // Si está expirado o próximo a expirar, intentar refresh
  if (isExpired || isExpiringSoon) {
    if (isExpired) {
      console.warn('Token expirado, intentando refresh...')
    } else {
      console.log(`Token expira en ${authStore.getMinutesUntilExpiry()} minutos, realizando refresh...`)
    }
    
    if (!isRefreshing) {
      isRefreshing = true
      try {
        await authStore.refreshAccessToken()
      } catch (error) {
        console.error('Refresh falló, redirigiendo a login:', error)
        // El refresh falló, hacer logout y redirigir
        isLoggingOut = true
        await authStore.logout()
        isLoggingOut = false
        window.location.href = '/'
      } finally {
        isRefreshing = false
      }
    } else {
      // Si ya está refresco, esperar
      await new Promise((resolve) => {
        setTimeout(resolve, 500)
      })
    }
  }
}

// Interceptor de petición para verificar expiración ANTES de enviar
api.interceptors.request.use(
  async (config) => {
    // No hacer verificación en rutas de autenticación
    if (config.url?.includes('/users/login') || config.url?.includes('/users/logout')) {
      return config
    }
    
    await tryAutoRefresh()
    return config
  },
  (error) => Promise.reject(error)
)

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
        const authStore = useAuthStore.getState()
        await authStore.refreshAccessToken()

        processQueue(null)

        // Reintenta la petición original
        return api(originalRequest)
      } catch (err) {
        processQueue(err)

        // El refresh falló, redirect a login
        isLoggingOut = true
        const authStore = useAuthStore.getState()
        await authStore.logout()
        isLoggingOut = false
        window.location.href = '/'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api