import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isOpen: true,
      
      setIsOpen: (isOpen: boolean) => {
        set({ isOpen })
      },
      
      toggleSidebar: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },
    }),
    {
      name: 'sidebar-storage',
    }
  )
)
