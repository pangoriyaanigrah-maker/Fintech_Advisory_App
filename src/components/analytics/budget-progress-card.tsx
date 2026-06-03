'use client'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { BudgetProgress } from '@/types'
import { cn } from '@/lib/utils/cn'

interface BudgetProgressCardProps {
  budget: BudgetProgress
  className?: string
}

export function BudgetProgressCard({ budget, className }: BudgetProgressCardProps) {
  const pct = Math.min(budget.percentUsed, 100)
  const barColor = budget.isOverBudget ? 'bg-error' : pct >= 80 ? 'bg-tertiary-container' : 'bg-primary'
  const isWarning = !budget.isOverBudget && pct >= 80

  return (
    <div className={cn('p-4 bg-surface-lowest rounded-2xl border border-primary/5 space-y-3 hover:border-primary/10 transition-colors', className)}>
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
        {budget.isOverBudget && (
          <span className="text-[9px] font-bold text-error bg-error/10 border border-error/10 px-2 py-0.5 rounded-full uppercase tracking-wide">Over</span>
        )}
        {isWarning && (
          <span className="text-[9px] font-bold text-tertiary bg-tertiary-container/15 border border-tertiary-container/20 px-2 py-0.5 rounded-full uppercase tracking-wide">Near</span>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="h-1.5 bg-surface-highest rounded-full overflow-hidden">
          <div className={cn('h-full rounded-full transition-all duration-500', barColor)} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-[10px] font-bold">
          <span className={budget.isOverBudget ? 'text-error' : 'text-on-surface/60'}>
            ₹{budget.spent.toLocaleString('en-IN')} spent
          </span>
          <span className="text-on-surface/40">of ₹{budget.limit.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  )
}
