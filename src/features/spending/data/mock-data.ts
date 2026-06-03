import type { MonthlySnapshot, CategorySummary } from '@/types'

// June 2026 — current month
export const juneCategoryData: CategorySummary[] = [
  { category: 'rent',         label: 'Rent',          spent: 18000, type: 'essential',     icon: 'home' },
  { category: 'groceries',    label: 'Groceries',     spent: 6500,  type: 'essential',     icon: 'shopping-basket' },
  { category: 'emi',          label: 'Home Loan EMI', spent: 12000, type: 'essential',     icon: 'landmark' },
  { category: 'utilities',    label: 'Utilities',     spent: 2200,  type: 'essential',     icon: 'zap' },
  { category: 'insurance',    label: 'Insurance',     spent: 3500,  type: 'essential',     icon: 'shield' },
  { category: 'healthcare',   label: 'Healthcare',    spent: 1500,  type: 'essential',     icon: 'heart' },
  { category: 'education',    label: 'Education',     spent: 2000,  type: 'essential',     icon: 'book-open' },
  { category: 'dining',       label: 'Dining Out',    spent: 4200,  type: 'non-essential', icon: 'utensils' },
  { category: 'shopping',     label: 'Shopping',      spent: 7200,  type: 'non-essential', icon: 'shopping-bag' },
  { category: 'entertainment',label: 'Entertainment', spent: 1800,  type: 'non-essential', icon: 'music' },
  { category: 'subscriptions',label: 'Subscriptions', spent: 1200,  type: 'non-essential', icon: 'play-circle' },
  { category: 'travel',       label: 'Transport',     spent: 2800,  type: 'non-essential', icon: 'car' },
  { category: 'personal_care',label: 'Personal Care', spent: 1600,  type: 'non-essential', icon: 'sparkles' },
]

export const juneSnapshot: MonthlySnapshot = {
  month: 'June 2026',
  income: 85000,
  totalExpenses: 64500,
  categories: juneCategoryData,
  savingsAmount: 20500,
  savingsRate: 24.1,
}

// May 2026 — previous month
export const mayCategoryData: CategorySummary[] = [
  { category: 'rent',         label: 'Rent',          spent: 18000, type: 'essential',     icon: 'home' },
  { category: 'groceries',    label: 'Groceries',     spent: 6200,  type: 'essential',     icon: 'shopping-basket' },
  { category: 'emi',          label: 'Home Loan EMI', spent: 12000, type: 'essential',     icon: 'landmark' },
  { category: 'utilities',    label: 'Utilities',     spent: 1900,  type: 'essential',     icon: 'zap' },
  { category: 'insurance',    label: 'Insurance',     spent: 3500,  type: 'essential',     icon: 'shield' },
  { category: 'healthcare',   label: 'Healthcare',    spent: 800,   type: 'essential',     icon: 'heart' },
  { category: 'education',    label: 'Education',     spent: 800,   type: 'essential',     icon: 'book-open' },
  { category: 'dining',       label: 'Dining Out',    spent: 3000,  type: 'non-essential', icon: 'utensils' },
  { category: 'shopping',     label: 'Shopping',      spent: 4800,  type: 'non-essential', icon: 'shopping-bag' },
  { category: 'entertainment',label: 'Entertainment', spent: 1500,  type: 'non-essential', icon: 'music' },
  { category: 'subscriptions',label: 'Subscriptions', spent: 1200,  type: 'non-essential', icon: 'play-circle' },
  { category: 'travel',       label: 'Transport',     spent: 2400,  type: 'non-essential', icon: 'car' },
  { category: 'personal_care',label: 'Personal Care', spent: 1700,  type: 'non-essential', icon: 'sparkles' },
]

export const maySnapshot: MonthlySnapshot = {
  month: 'May 2026',
  income: 82000,
  totalExpenses: 57800,
  categories: mayCategoryData,
  savingsAmount: 24200,
  savingsRate: 29.5,
}

export const monthlyHistory: MonthlySnapshot[] = [maySnapshot, juneSnapshot]
