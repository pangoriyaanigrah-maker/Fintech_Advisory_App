import type { BudgetEntry, BudgetProgress, MonthlySnapshot } from '@/types'

// Default monthly budget limits
export const DEFAULT_BUDGETS: BudgetEntry[] = [
  { category: 'rent',          label: 'Rent',          limit: 18000, type: 'essential',     icon: 'home' },
  { category: 'groceries',     label: 'Groceries',     limit: 7000,  type: 'essential',     icon: 'shopping-basket' },
  { category: 'emi',           label: 'Home Loan EMI', limit: 12000, type: 'essential',     icon: 'landmark' },
  { category: 'utilities',     label: 'Utilities',     limit: 2500,  type: 'essential',     icon: 'zap' },
  { category: 'dining',        label: 'Dining Out',    limit: 3000,  type: 'non-essential', icon: 'utensils' },
  { category: 'shopping',      label: 'Shopping',      limit: 5000,  type: 'non-essential', icon: 'shopping-bag' },
  { category: 'entertainment', label: 'Entertainment', limit: 2000,  type: 'non-essential', icon: 'music' },
  { category: 'subscriptions', label: 'Subscriptions', limit: 1500,  type: 'non-essential', icon: 'play-circle' },
]

export function computeBudgetProgress(budgets: BudgetEntry[], snapshot: MonthlySnapshot): BudgetProgress[] {
  return budgets.map(b => {
    const cat = snapshot.categories.find(c => c.category === b.category)
    const spent = cat?.spent ?? 0
    const remaining = b.limit - spent
    const percentUsed = Math.min(Math.round((spent / b.limit) * 100), 999)
    return { ...b, spent, remaining, percentUsed, isOverBudget: spent > b.limit }
  })
}

export function detectOverspending(progress: BudgetProgress[]): BudgetProgress[] {
  return progress.filter(p => p.isOverBudget)
}
