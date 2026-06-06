'use client'
import type { MonthlySnapshot } from '@/types'
import { TrendIndicator } from './trend-indicator'
import { cn } from '@/lib/utils/cn'

interface IncomeExpenseChartProps {
  current: MonthlySnapshot
  momChange?: number   // omitted when there is no previous month to compare against
  className?: string
}

function MetricBar({ label, amount, max, color, percent }: { label: string; amount: number; max: number; color: string; percent?: string }) {
  const width = max > 0 ? Math.min((amount / max) * 100, 100) : 0
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-on-surface/70 uppercase tracking-wider text-[11px]">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-primary">₹{amount.toLocaleString('en-IN')}</span>
          {percent && <span className="text-[11px] font-bold text-on-surface/65">{percent}</span>}
        </div>
      </div>
      <div className="h-2.5 bg-surface-highest rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-700', color)}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export function IncomeExpenseChart({ current, momChange, className }: IncomeExpenseChartProps) {
  const savingsPercent = `${current.savingsRate.toFixed(1)}% saved`
  const expensePercent = current.income > 0
    ? `${Math.round((current.totalExpenses / current.income) * 100)}% of income`
    : undefined

  return (
    <div className={cn('space-y-5', className)}>
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-base font-bold text-primary">Income vs Expenses</h4>
        {typeof momChange === 'number' && (
          <TrendIndicator value={momChange} label="vs last month" invertColors size="sm" />
        )}
      </div>
      <div className="space-y-4">
        <MetricBar label="Monthly Income"   amount={current.income}         max={current.income} color="bg-primary" />
        <MetricBar label="Total Expenses"   amount={current.totalExpenses}  max={current.income} color="bg-tertiary-container" percent={expensePercent} />
        <MetricBar label="Net Savings"      amount={current.savingsAmount}  max={current.income} color="bg-primary/40" percent={savingsPercent} />
      </div>
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-primary/5">
        {[
          { label: 'Income', value: `₹${(current.income / 1000).toFixed(0)}K`, color: 'text-primary' },
          { label: 'Spent',  value: `₹${(current.totalExpenses / 1000).toFixed(0)}K`, color: 'text-tertiary' },
          { label: 'Saved',  value: `₹${(current.savingsAmount / 1000).toFixed(0)}K`, color: 'text-primary' },
        ].map(item => (
          <div key={item.label} className="text-center">
            <p className={cn('text-lg font-extrabold', item.color)}>{item.value}</p>
            <p className="text-[11px] font-bold text-on-surface/65 uppercase tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
