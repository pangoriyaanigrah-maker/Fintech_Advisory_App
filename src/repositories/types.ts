import type { MonthlySnapshot, BudgetEntry, TransactionCategory, Transaction, NewTransaction } from '@/types'

/**
 * Data-access contracts. The app talks ONLY to these interfaces, never to a
 * concrete data source. Today they're backed by mock implementations; swapping
 * to Supabase later means providing new implementations behind getRepositories()
 * — hooks, services, and UI stay unchanged. All methods are async to match the
 * eventual network/database contract.
 */
export interface SpendingRepository {
  getMonthlyHistory(): Promise<MonthlySnapshot[]>
  getCurrentSnapshot(): Promise<MonthlySnapshot>
  getPreviousSnapshot(): Promise<MonthlySnapshot>
  /** The current month's logged transactions, newest first. */
  getTransactions(): Promise<Transaction[]>
  /**
   * Log a transaction against the current month and return the recomputed
   * current snapshot. Income lifts `income`; an expense adds to its category's
   * spend. Totals, savings amount and savings rate are all derived.
   */
  addTransaction(input: NewTransaction): Promise<MonthlySnapshot>
  /** Remove a logged transaction and return the recomputed current snapshot. */
  deleteTransaction(id: string): Promise<MonthlySnapshot>
}

export interface BudgetRepository {
  getBudgets(): Promise<BudgetEntry[]>
  updateBudget(category: TransactionCategory, limit: number): Promise<BudgetEntry[]>
}

export interface Repositories {
  spending: SpendingRepository
  budgets: BudgetRepository
}
