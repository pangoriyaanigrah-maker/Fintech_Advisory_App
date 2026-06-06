import type { Repositories } from '@/repositories/types'
import { MockSpendingRepository } from '@/repositories/mock/spending-repository'
import { MockBudgetRepository } from '@/repositories/mock/budget-repository'

let repositories: Repositories | null = null

/**
 * Singleton repository set — the single seam between the app and its data.
 *
 * Today this always returns the mock implementations. When Supabase is wired,
 * branch here on an env flag (e.g. `process.env.NEXT_PUBLIC_DATA_SOURCE`) to
 * return Supabase-backed repositories instead. Nothing else in the app changes.
 */
export function getRepositories(): Repositories {
  if (!repositories) {
    repositories = {
      spending: new MockSpendingRepository(),
      budgets: new MockBudgetRepository(),
    }
  }
  return repositories
}
