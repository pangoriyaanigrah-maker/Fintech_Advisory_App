import type { BudgetEntry, BudgetProgress, MonthlySnapshot } from '@/types'

// Budget categories with NO preset limits — every limit starts at 0 ("not set")
// and is configured by the user inline on the budget tracker.
export const DEFAULT_BUDGETS: BudgetEntry[] = [
  { category: 'rent',          label: 'Rent',          limit: 0, type: 'essential',     icon: 'home' },
  { category: 'groceries',     label: 'Groceries',     limit: 0, type: 'essential',     icon: 'shopping-basket' },
  { category: 'emi',           label: 'Home Loan EMI', limit: 0, type: 'essential',     icon: 'landmark' },
  { category: 'utilities',     label: 'Utilities',     limit: 0, type: 'essential',     icon: 'zap' },
  { category: 'dining',        label: 'Dining Out',    limit: 0, type: 'non-essential', icon: 'utensils' },
  { category: 'shopping',      label: 'Shopping',      limit: 0, type: 'non-essential', icon: 'shopping-bag' },
  { category: 'entertainment', label: 'Entertainment', limit: 0, type: 'non-essential', icon: 'music' },
  { category: 'subscriptions', label: 'Subscriptions', limit: 0, type: 'non-essential', icon: 'play-circle' },
]

export function computeBudgetProgress(budgets: BudgetEntry[], snapshot: MonthlySnapshot): BudgetProgress[] {
  return budgets.map(b => {
    const cat = snapshot.categories.find(c => c.category === b.category)
    const spent = cat?.spent ?? 0
    const hasLimit = b.limit > 0
    const remaining = b.limit - spent
    // A limit of 0 means "not set yet" — no percentage and never flagged over.
    const percentUsed = hasLimit ? Math.min(Math.round((spent / b.limit) * 100), 999) : 0
    return { ...b, spent, remaining, percentUsed, isOverBudget: hasLimit && spent > b.limit }
  })
}

export function detectOverspending(progress: BudgetProgress[]): BudgetProgress[] {
  return progress.filter(p => p.isOverBudget)
}
