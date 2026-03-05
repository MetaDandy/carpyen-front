import type { User } from '@/services/user/user.schema'
import userService from '@/services/user/user.service'
import {
  isTokenExpiredFromCookie,
  isTokenExpiringSoon,
  getMinutesUntilExpiry,
} from '@/lib/jwt'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAuthenticated: boolean
  loading: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void
  refreshAccessToken: () => Promise<void>
  isTokenExpired: () => boolean // Verifica si el token está expirado (leyendo cookie)
  isTokenExpiringSoon: (minutesThreshold?: number) => boolean // Verifica si el token caduca pronto
  getMinutesUntilExpiry: () => number // Retorna minutos hasta expiración
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      loading: false,
      user: null,

      login: async (email: string, password: string) => {
        set({ loading: true })
        try {
          const user = await userService.login({ email, password })
          set({
            user,
            isAuthenticated: true,
          })
        } catch (error) {
          console.error('Error al iniciar sesión:', error)
          throw error
        } finally {
          set({ loading: false })
        }
      },

      logout: async () => {
        set({ loading: true })
        try {
          await userService.logout()
        } catch (error) {
          console.error('Error al cerrar sesión:', error)
        } finally {
          set({ isAuthenticated: false, user: null, loading: false })
        }
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true })
      },

      // Renovar access token usando el refresh token
      refreshAccessToken: async () => {
        try {
          await userService.refreshToken()
          // El token se actualiza en la cookie automáticamente
        } catch (error) {
          // El refresh falló, significa que el refresh token expiró
          console.error('Refresh token expirado, logout requerido')
          set({ isAuthenticated: false, user: null })
          throw error
        }
      },

      // Verifica si el token ha expirado (leyendo de la cookie)
      isTokenExpired: () => {
        return isTokenExpiredFromCookie()
      },

      // Verifica si el token está próximo a expirar (leyendo de la cookie)
      isTokenExpiringSoon: (minutesThreshold: number = 5) => {
        return isTokenExpiringSoon(minutesThreshold)
      },

      // Obtiene los minutos restantes hasta expiración (leyendo de la cookie)
      getMinutesUntilExpiry: () => {
        return getMinutesUntilExpiry()
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)