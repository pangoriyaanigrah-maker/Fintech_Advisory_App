import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { BudgetEntry, TransactionCategory } from '@/types'
import { DEFAULT_BUDGETS } from '@/features/budgeting/utils/budget-helpers'

interface BudgetStore {
  budgets: BudgetEntry[]
  // actions
  updateCategoryBudget: (category: TransactionCategory, limit: number) => void
}

const useBudgetStore = create<BudgetStore>()(
  immer((set) => ({
    budgets: DEFAULT_BUDGETS,
    updateCategoryBudget: (category, limit) =>
      set((state) => {
        const entry = state.budgets.find(b => b.category === category)
        if (entry) entry.limit = limit
      }),
  }))
)

export default useBudgetStore

// Selectors
export const useBudgets = () => useBudgetStore(s => s.budgets)
export const useUpdateCategoryBudget = () => useBudgetStore(s => s.updateCategoryBudget)
