import type { BudgetEntry, TransactionCategory } from '@/types'
import type { BudgetRepository } from '@/repositories/types'
import { DEFAULT_BUDGETS } from '@/features/budgeting/utils/budget-helpers'
import { readJSON, writeJSON } from '@/lib/utils/storage'

const tick = <T>(value: T): Promise<T> => Promise.resolve(value)

/** localStorage key for the persisted per-category limit overrides. */
const BUDGET_STORAGE_KEY = 'aarya_budget_limits_v1'

/** Only the edited limits are persisted, keyed by category, so newly added
 *  default categories still appear after a schema change. */
type LimitOverrides = Partial<Record<TransactionCategory, number>>

export class MockBudgetRepository implements BudgetRepository {
  // Start from the defaults, then overlay any limits the user edited last session.
  private budgets: BudgetEntry[]

  constructor() {
    const overrides = readJSON<LimitOverrides>(BUDGET_STORAGE_KEY, {})
    this.budgets = DEFAULT_BUDGETS.map((b) =>
      typeof overrides[b.category] === 'number' ? { ...b, limit: overrides[b.category]! } : { ...b }
    )
  }

  getBudgets(): Promise<BudgetEntry[]> {
    return tick(this.budgets.map((b) => ({ ...b })))
  }

  updateBudget(category: TransactionCategory, limit: number): Promise<BudgetEntry[]> {
    this.budgets = this.budgets.map((b) => (b.category === category ? { ...b, limit } : b))
    const overrides = readJSON<LimitOverrides>(BUDGET_STORAGE_KEY, {})
    overrides[category] = limit
    writeJSON(BUDGET_STORAGE_KEY, overrides)
    return tick(this.budgets.map((b) => ({ ...b })))
  }
}
