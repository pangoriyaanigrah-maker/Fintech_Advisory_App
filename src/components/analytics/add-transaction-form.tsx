'use client'

import { useState } from 'react'
import { Plus, Check } from 'lucide-react'
import type { CategorySummary, NewTransaction, TransactionCategory, TransactionType } from '@/types'
import { Button } from '@/components/ui/button'
import { useAddTransaction } from '@/features/spending/hooks/use-spending'

/** Income sources offered when logging an income transaction. */
const INCOME_SOURCES = ['Salary', 'Freelance', 'Business', 'Investments', 'Other'] as const

const fieldCls =
  'font-sans text-sm bg-surface-low border border-primary/10 rounded-xl py-3 text-on-surface w-full focus:outline-none focus:border-tertiary-container/70 transition-colors duration-150'

/**
 * Inline "log a transaction" control with an income / expense toggle and an
 * optional note. Adds money in (income) or out (expense, attributed to a
 * budget category); on success the spending cache updates and every dependent
 * view (metrics, charts, budget progress, health score & insights) recalculates.
 */
export function AddTransactionForm({ categories }: { categories: CategorySummary[] }) {
  const addTransaction = useAddTransaction()
  const firstCategory = categories[0]?.category ?? 'groceries'

  const [type, setType] = useState<TransactionType>('expense')
  const [selection, setSelection] = useState<string>(firstCategory)
  const [amount, setAmount] = useState<number | ''>('')
  const [note, setNote] = useState('')
  const [justAdded, setJustAdded] = useState(false)

  const isExpense = type === 'expense'
  const canSubmit = typeof amount === 'number' && amount > 0 && !!selection && !addTransaction.isPending

  const switchType = (next: TransactionType) => {
    setType(next)
    setSelection(next === 'expense' ? firstCategory : INCOME_SOURCES[0])
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    const label = isExpense
      ? categories.find((c) => c.category === selection)?.label ?? selection
      : selection

    const input: NewTransaction = {
      type,
      label,
      amount: amount as number,
      note: note.trim() || undefined,
      ...(isExpense ? { category: selection as TransactionCategory } : {}),
    }

    addTransaction.mutate(input, {
      onSuccess: () => {
        setAmount('')
        setNote('')
        setJustAdded(true)
        window.setTimeout(() => setJustAdded(false), 1800)
      },
    })
  }

  return (
    <form onSubmit={submit} className="p-5 bg-surface-lowest rounded-3xl border border-primary/5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-primary">Log a Transaction</h3>
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/60">
            Updates spending, budgets &amp; insights live
          </p>
        </div>
        <div className="flex items-center gap-3">
          {justAdded && (
            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-tertiary">
              <Check className="w-3.5 h-3.5" /> Added
            </span>
          )}
          {/* Income / Expense toggle */}
          <div className="flex bg-surface-low rounded-lg p-0.5 border border-primary/5">
            {(['expense', 'income'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => switchType(t)}
                className={[
                  'text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md transition-colors',
                  type === t ? 'bg-primary text-white' : 'text-on-surface/65 hover:text-primary',
                ].join(' ')}
              >
                {t === 'expense' ? 'Expense' : 'Income'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Category (expense) / Source (income) */}
        <div className="space-y-1.5">
          <label htmlFor="txn-selection" className="block text-[11px] font-bold text-primary uppercase tracking-wider">
            {isExpense ? 'Category' : 'Source'}
          </label>
          <select
            id="txn-selection"
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
            className={`${fieldCls} px-3`}
          >
            {isExpense
              ? categories.map((c) => (
                  <option key={c.category} value={c.category}>
                    {c.label}
                  </option>
                ))
              : INCOME_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
          </select>
        </div>

        {/* Amount */}
        <div className="space-y-1.5">
          <label htmlFor="txn-amount" className="block text-[11px] font-bold text-primary uppercase tracking-wider">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/60 text-sm pointer-events-none">₹</span>
            <input
              id="txn-amount"
              type="number"
              inputMode="decimal"
              min={0}
              step={100}
              placeholder="0"
              value={amount}
              onChange={(e) => {
                const v = parseFloat(e.target.value)
                setAmount(Number.isFinite(v) ? v : '')
              }}
              className={`${fieldCls} pl-7 pr-4`}
            />
          </div>
        </div>

        {/* Note (optional) */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="txn-note" className="block text-[11px] font-bold text-primary uppercase tracking-wider">
            Note <span className="text-on-surface/40 normal-case font-semibold">(optional)</span>
          </label>
          <input
            id="txn-note"
            type="text"
            maxLength={80}
            placeholder={isExpense ? 'e.g. Weekend groceries at the market' : 'e.g. June salary'}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`${fieldCls} px-4`}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          size="md"
          disabled={!canSubmit}
          loading={addTransaction.isPending}
          iconLeft={<Plus className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          {isExpense ? 'Add Expense' : 'Add Income'}
        </Button>
      </div>
    </form>
  )
}
