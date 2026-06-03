import { create } from 'zustand'

interface UIStore {
  isMobileMenuOpen: boolean
  prefersReducedMotion: boolean
  isSidebarOpen: boolean
  // actions
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  setPrefersReducedMotion: (v: boolean) => void
  toggleSidebar: () => void
  closeSidebar: () => void
}

const useUIStore = create<UIStore>()((set) => ({
  isMobileMenuOpen: false,
  prefersReducedMotion: false,
  isSidebarOpen: false,

  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  setPrefersReducedMotion: (v) => set({ prefersReducedMotion: v }),

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}))

export default useUIStore

// Granular selector hooks
export const useIsMobileMenuOpen = () => useUIStore(s => s.isMobileMenuOpen)
export const useToggleMobileMenu = () => useUIStore(s => s.toggleMobileMenu)
export const useCloseMobileMenu = () => useUIStore(s => s.closeMobileMenu)
export const useIsSidebarOpen = () => useUIStore(s => s.isSidebarOpen)
export const useToggleSidebar = () => useUIStore(s => s.toggleSidebar)
export const useCloseSidebar = () => useUIStore(s => s.closeSidebar)
