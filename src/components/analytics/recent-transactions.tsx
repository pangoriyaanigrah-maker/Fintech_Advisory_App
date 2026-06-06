'use client'

import { ArrowDownLeft, ArrowUpRight, Trash2, Receipt } from 'lucide-react'
import type { Transaction } from '@/types'
import { cn } from '@/lib/utils/cn'
import { useTransactions, useDeleteTransaction } from '@/features/spending/hooks/use-spending'

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) +
    ', ' + d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
}

function TransactionRow({ txn, onDelete, deleting }: {
  txn: Transaction
  onDelete: (id: string) => void
  deleting: boolean
}) {
  const isIncome = txn.type === 'income'
  return (
    <li className="flex items-center gap-3 py-3 group">
      <div className={cn(
        'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
        isIncome ? 'bg-tertiary-container/15 text-tertiary' : 'bg-primary/5 text-primary'
      )}>
        {isIncome ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-sans text-sm font-bold text-primary truncate">
          {txn.label}
          {txn.note && <span className="font-normal text-on-surface/55"> · {txn.note}</span>}
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-on-surface/45">
          {formatDate(txn.date)}
        </p>
      </div>

      <span className={cn(
        'font-sans text-sm font-extrabold tabular-nums shrink-0',
        isIncome ? 'text-tertiary' : 'text-on-surface/80'
      )}>
        {isIncome ? '+' : '−'}₹{txn.amount.toLocaleString('en-IN')}
      </span>

      <button
        type="button"
        onClick={() => onDelete(txn.id)}
        disabled={deleting}
        aria-label={`Delete ${txn.label} transaction`}
        className="text-on-surface/30 hover:text-error transition-colors shrink-0 disabled:opacity-40"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </li>
  )
}

/**
 * Recent activity for the current month with per-row delete. Reads its own data
 * (React Query dedupes by key) so it can be dropped onto any dashboard page.
 */
export function RecentTransactions() {
  const { data: transactions, isLoading } = useTransactions()
  const deleteTransaction = useDeleteTransaction()

  const onDelete = (id: string) => deleteTransaction.mutate(id)

  return (
    <div>
      <h3 className="font-serif text-xl font-bold text-primary mb-5">Recent Transactions</h3>
      <div className="p-5 bg-surface-lowest rounded-3xl border border-primary/5 shadow-sm">
        {isLoading ? (
          <p className="text-sm text-on-surface/50 font-sans py-6 text-center">Loading…</p>
        ) : !transactions || transactions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <div className="w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/50">
              <Receipt className="w-5 h-5" />
            </div>
            <p className="font-sans text-sm font-bold text-primary">No transactions yet</p>
            <p className="text-xs text-on-surface/55 max-w-xs">
              Use “Log a Transaction” above to record income or spending — it updates your
              totals, budgets and insights instantly.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-primary/5">
            {transactions.map((txn) => (
              <TransactionRow
                key={txn.id}
                txn={txn}
                onDelete={onDelete}
                deleting={deleteTransaction.isPending}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
