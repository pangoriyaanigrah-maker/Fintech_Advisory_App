import type { MonthlySnapshot, CategorySummary } from '@/types'

// Categories are defined (so the transaction picker, budget tracker and charts
// have a category list) but every amount starts at ZERO — the user enters all
// of their own income and spending via "Log a Transaction".
const emptyCategories: CategorySummary[] = [
  { category: 'rent',         label: 'Rent',          spent: 0, type: 'essential',     icon: 'home' },
  { category: 'groceries',    label: 'Groceries',     spent: 0, type: 'essential',     icon: 'shopping-basket' },
  { category: 'emi',          label: 'Home Loan EMI', spent: 0, type: 'essential',     icon: 'landmark' },
  { category: 'utilities',    label: 'Utilities',     spent: 0, type: 'essential',     icon: 'zap' },
  { category: 'insurance',    label: 'Insurance',     spent: 0, type: 'essential',     icon: 'shield' },
  { category: 'healthcare',   label: 'Healthcare',    spent: 0, type: 'essential',     icon: 'heart' },
  { category: 'education',    label: 'Education',     spent: 0, type: 'essential',     icon: 'book-open' },
  { category: 'dining',       label: 'Dining Out',    spent: 0, type: 'non-essential', icon: 'utensils' },
  { category: 'shopping',     label: 'Shopping',      spent: 0, type: 'non-essential', icon: 'shopping-bag' },
  { category: 'entertainment',label: 'Entertainment', spent: 0, type: 'non-essential', icon: 'music' },
  { category: 'subscriptions',label: 'Subscriptions', spent: 0, type: 'non-essential', icon: 'play-circle' },
  { category: 'travel',       label: 'Transport',     spent: 0, type: 'non-essential', icon: 'car' },
  { category: 'personal_care',label: 'Personal Care', spent: 0, type: 'non-essential', icon: 'sparkles' },
]

const blankMonth = (month: string): MonthlySnapshot => ({
  month,
  income: 0,
  totalExpenses: 0,
  categories: emptyCategories.map((c) => ({ ...c })),
  savingsAmount: 0,
  savingsRate: 0,
})

// June 2026 — current month (everything user-entered, starts empty)
export const juneCategoryData: CategorySummary[] = emptyCategories.map((c) => ({ ...c }))
export const juneSnapshot: MonthlySnapshot = blankMonth('June 2026')

// May 2026 — previous month. Also empty: there is no demo history to compare to.
export const mayCategoryData: CategorySummary[] = emptyCategories.map((c) => ({ ...c }))
export const maySnapshot: MonthlySnapshot = blankMonth('May 2026')

export const monthlyHistory: MonthlySnapshot[] = [maySnapshot, juneSnapshot]
