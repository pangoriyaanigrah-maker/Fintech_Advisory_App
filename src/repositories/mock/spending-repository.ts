import type { MonthlySnapshot, NewTransaction, Transaction } from '@/types'
import type { SpendingRepository } from '@/repositories/types'
import { juneSnapshot, maySnapshot } from '@/features/spending/data/mock-data'
import { readJSON, writeJSON } from '@/lib/utils/storage'

/** Resolve on the next microtask so the async contract matches a real backend. */
const tick = <T>(value: T): Promise<T> => Promise.resolve(value)

/** localStorage key for the persisted current-month transactions. */
const TXN_STORAGE_KEY = 'aarya_transactions_v1'

/** Re-derive the totals that hang off income + the per-category spend lines. */
function recomputeTotals(snapshot: MonthlySnapshot): MonthlySnapshot {
  const totalExpenses = snapshot.categories.reduce((sum, c) => sum + c.spent, 0)
  const savingsAmount = snapshot.income - totalExpenses
  const savingsRate = snapshot.income > 0 ? (savingsAmount / snapshot.income) * 100 : 0
  return { ...snapshot, totalExpenses, savingsAmount, savingsRate }
}

const newId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `txn_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`

export class MockSpendingRepository implements SpendingRepository {
  // The seeded baseline (June demo data) is held immutable; the live current
  // month is always derived as baseline + the logged transactions, so deleting
  // a transaction simply re-derives. May stays fixed as the previous month.
  private readonly baseSnapshot: MonthlySnapshot = structuredClone(juneSnapshot)
  // Rehydrated from localStorage so logged transactions survive a refresh.
  private transactions: Transaction[] = (() => {
    const stored = readJSON<Transaction[]>(TXN_STORAGE_KEY, [])
    return Array.isArray(stored) ? stored : []
  })()

  private persist(): void {
    writeJSON(TXN_STORAGE_KEY, this.transactions)
  }

  /** baseline + every logged transaction → the live current-month snapshot. */
  private derive(): MonthlySnapshot {
    const snap = structuredClone(this.baseSnapshot)
    for (const t of this.transactions) {
      if (t.type === 'income') {
        snap.income += t.amount
      } else if (t.category) {
        const cat = snap.categories.find((c) => c.category === t.category)
        if (cat) cat.spent += t.amount
      }
    }
    return recomputeTotals(snap)
  }

  getMonthlyHistory(): Promise<MonthlySnapshot[]> {
    return tick([structuredClone(maySnapshot), this.derive()])
  }
  getCurrentSnapshot(): Promise<MonthlySnapshot> {
    return tick(this.derive())
  }
  getPreviousSnapshot(): Promise<MonthlySnapshot> {
    return tick(structuredClone(maySnapshot))
  }
  getTransactions(): Promise<Transaction[]> {
    return tick(this.transactions.map((t) => ({ ...t })))
  }
  addTransaction(input: NewTransaction): Promise<MonthlySnapshot> {
    const txn: Transaction = { ...input, id: newId(), date: new Date().toISOString() }
    this.transactions = [txn, ...this.transactions] // newest first
    this.persist()
    return tick(this.derive())
  }
  deleteTransaction(id: string): Promise<MonthlySnapshot> {
    this.transactions = this.transactions.filter((t) => t.id !== id)
    this.persist()
    return tick(this.derive())
  }
}
