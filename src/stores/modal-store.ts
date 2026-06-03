import { create } from 'zustand'

type ModalId = 'goal' | 'article' | 'syllabus' | string

interface ModalStore {
  activeModal: ModalId | null
  payload: Record<string, unknown>
  // actions
  openModal: (id: ModalId, payload?: Record<string, unknown>) => void
  closeModal: () => void
  isOpen: (id: ModalId) => boolean
}

const useModalStore = create<ModalStore>()((set, get) => ({
  activeModal: null,
  payload: {},

  openModal: (id, payload = {}) => set({ activeModal: id, payload }),

  closeModal: () => set({ activeModal: null, payload: {} }),

  isOpen: (id) => get().activeModal === id,
}))

export default useModalStore

// Granular selector hooks
export const useActiveModal = () => useModalStore(state => state.activeModal)
export const useModalPayload = () => useModalStore(state => state.payload)
export const useOpenModal = () => useModalStore(state => state.openModal)
export const useCloseModal = () => useModalStore(state => state.closeModal)
