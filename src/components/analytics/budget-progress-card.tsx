'use client'
import { useState } from 'react'
import { AlertTriangle, CheckCircle2, Pencil, Check, X } from 'lucide-react'
import type { BudgetProgress } from '@/types'
import { cn } from '@/lib/utils/cn'
import { useUpdateBudget } from '@/features/budgeting/hooks/use-budgets'

interface BudgetProgressCardProps {
  budget: BudgetProgress
  className?: string
  /** Allow editing the monthly limit inline (default true). */
  editable?: boolean
}

export function BudgetProgressCard({ budget, className, editable = true }: BudgetProgressCardProps) {
  const pct = Math.min(budget.percentUsed, 100)
  const barColor = budget.isOverBudget ? 'bg-error' : pct >= 80 ? 'bg-tertiary-container' : 'bg-primary'
  const isWarning = !budget.isOverBudget && pct >= 80

  const updateBudget = useUpdateBudget()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<number>(budget.limit)

  const startEdit = () => {
    setDraft(budget.limit)
    setEditing(true)
  }
  const cancel = () => setEditing(false)
  const save = () => {
    const limit = Math.max(0, Math.round(Number.isFinite(draft) ? draft : 0))
    if (limit !== budget.limit) updateBudget.mutate({ category: budget.category, limit })
    setEditing(false)
  }

  return (
    <div className={cn('p-4 bg-surface-lowest rounded-2xl border border-primary/5 space-y-3 hover:border-primary/10 transition-colors group', className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', budget.type === 'essential' ? 'bg-primary/5' : 'bg-tertiary-container/10')}>
            {budget.isOverBudget
              ? <AlertTriangle className="w-3.5 h-3.5 text-error" />
              : <CheckCircle2 className={cn('w-3.5 h-3.5', budget.type === 'essential' ? 'text-primary' : 'text-tertiary')} />
            }
          </div>
          <span className="font-sans text-xs font-bold text-primary">{budget.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {budget.isOverBudget && !editing && (
            <span className="text-[11px] font-bold text-error bg-error/10 border border-error/10 px-2 py-0.5 rounded-full uppercase tracking-wide">Over</span>
          )}
          {isWarning && !editing && (
            <span className="text-[11px] font-bold text-tertiary bg-tertiary-container/15 border border-tertiary-container/20 px-2 py-0.5 rounded-full uppercase tracking-wide">Near</span>
          )}
          {editable && !editing && (
            <button
              type="button"
              onClick={startEdit}
              aria-label={`Edit ${budget.label} budget`}
              className="text-on-surface/40 hover:text-primary transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-500', barColor)} style={{ width: `${pct}%` }} />
        </div>
        {editing ? (
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[11px] font-bold text-on-surface/60 whitespace-nowrap">
              ₹{budget.spent.toLocaleString('en-IN')} of
            </span>
            <div className="relative flex-1 min-w-0">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-on-surface/50 pointer-events-none">₹</span>
              <input
                type="number"
                autoFocus
                min={0}
                step={500}
                value={Number.isFinite(draft) ? draft : ''}
                onChange={(e) => setDraft(parseFloat(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') save()
                  if (e.key === 'Escape') cancel()
                }}
                className="w-full text-[11px] font-bold bg-surface-low border border-primary/15 rounded-lg pl-5 pr-2 py-1 text-on-surface focus:outline-none focus:border-tertiary-container/70"
              />
            </div>
            <button type="button" onClick={save} aria-label="Save budget" className="text-tertiary hover:text-primary transition-colors shrink-0">
              <Check className="w-4 h-4" />
            </button>
            <button type="button" onClick={cancel} aria-label="Cancel edit" className="text-on-surface/40 hover:text-error transition-colors shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-between text-[11px] font-bold">
            <span className={budget.isOverBudget ? 'text-error' : 'text-on-surface/60'}>
              ₹{budget.spent.toLocaleString('en-IN')} spent
            </span>
            {budget.limit > 0 ? (
              <span className="text-on-surface/60">of ₹{budget.limit.toLocaleString('en-IN')}</span>
            ) : editable ? (
              <button
                type="button"
                onClick={startEdit}
                className="text-tertiary hover:text-primary underline underline-offset-2 transition-colors"
              >
                Set limit
              </button>
            ) : (
              <span className="text-on-surface/40">No limit set</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
