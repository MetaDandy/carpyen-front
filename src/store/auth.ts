import userService from '@/services/user/user.service'
import { create } from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  loading: boolean
  token: string
  login: (email: string, password: string) => Promise<void>
  setToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  loading: false,
  token: '',

  login: async (email: string, password: string) => {
    set({ loading: true })
    try {
      const tokken = await userService.login({ email, password })
      set({ token: tokken })

      set({ isAuthenticated: true })
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    } finally {
      set({ loading: false })
    }
  },

  setToken: (token: string) => {
    set({ token })
    localStorage.setItem('token', token)
  },

  logout: () => {
    set({ isAuthenticated: false })
    localStorage.removeItem('token')
  },
}))
