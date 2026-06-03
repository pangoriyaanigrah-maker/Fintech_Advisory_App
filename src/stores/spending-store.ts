import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { MonthlySnapshot } from '@/types'
import { juneSnapshot, maySnapshot, monthlyHistory } from '@/features/spending/data/mock-data'
import { getTotalEssential, getTotalNonEssential, getMonthOverMonthChange } from '@/features/analytics/utils/calculations'

interface SpendingStore {
  currentSnapshot: MonthlySnapshot
  previousSnapshot: MonthlySnapshot
  history: MonthlySnapshot[]
  // future API hook point: setCurrentSnapshot(data: MonthlySnapshot) => void
  setCurrentSnapshot: (snapshot: MonthlySnapshot) => void
}

const useSpendingStore = create<SpendingStore>()(
  immer((set) => ({
    currentSnapshot: juneSnapshot,
    previousSnapshot: maySnapshot,
    history: monthlyHistory,
    setCurrentSnapshot: (snapshot) => set((state) => { state.currentSnapshot = snapshot }),
  }))
)

export default useSpendingStore

// Granular selectors
export const useCurrentSnapshot = () => useSpendingStore(s => s.currentSnapshot)
export const usePreviousSnapshot = () => useSpendingStore(s => s.previousSnapshot)
export const useEssentialTotal = () => useSpendingStore(s => getTotalEssential(s.currentSnapshot))
export const useNonEssentialTotal = () => useSpendingStore(s => getTotalNonEssential(s.currentSnapshot))
export const useMoMChange = () => useSpendingStore(s => getMonthOverMonthChange(s.currentSnapshot, s.previousSnapshot))
