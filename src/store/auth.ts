import { create } from 'zustand'

interface AuthStore {
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  loading: false,

  login: async (email: string, password: string) => {
    set({ loading: true })
    try {
      // TODO: Aquí irá tu API de login
      // const response = await fetch('http://localhost:8000/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // const data = await response.json()
      // if (data.token) localStorage.setItem('token', data.token)

      set({ isAuthenticated: true })
    } catch (error) {
      console.error('Error al iniciar sesión:', error)
      throw error
    } finally {
      set({ loading: false })
    }
  },

  logout: () => {
    set({ isAuthenticated: false })
    localStorage.removeItem('token')
  },
}))
