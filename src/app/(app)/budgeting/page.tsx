'use client'

import { useMemo } from 'react'
import DashboardShell from '@/components/layout/dashboard-shell'
import { Card } from '@/components/ui/card'
import { GlassCard } from '@/components/ui/glass-card'
import { TrendIndicator } from '@/components/analytics/trend-indicator'
import { SpendingCategoryChart } from '@/components/analytics/spending-category-chart'
import { IncomeExpenseChart } from '@/components/analytics/income-expense-chart'
import { BudgetProgressCard } from '@/components/analytics/budget-progress-card'
import { useCurrentSnapshot, usePreviousSnapshot, useEssentialTotal, useNonEssentialTotal, useMoMChange } from '@/stores/spending-store'
import { useBudgets } from '@/stores/budget-store'
import { computeBudgetProgress } from '@/features/budgeting/utils/budget-helpers'

export default function BudgetingPage() {
  const currentSnapshot = useCurrentSnapshot()
  const previousSnapshot = usePreviousSnapshot()
  const essentialTotal = useEssentialTotal()
  const nonEssentialTotal = useNonEssentialTotal()
  const momChange = useMoMChange()
  const budgets = useBudgets()

  const budgetProgress = useMemo(
    () => computeBudgetProgress(budgets, currentSnapshot),
    [budgets, currentSnapshot]
  )

  const essentialPct = currentSnapshot.income > 0
    ? Math.round((essentialTotal / currentSnapshot.income) * 100)
    : 0
  const nonEssentialPct = currentSnapshot.income > 0
    ? Math.round((nonEssentialTotal / currentSnapshot.income) * 100)
    : 0

  const prevEssentialTotal = previousSnapshot.categories
    .filter(c => c.type === 'essential')
    .reduce((sum, c) => sum + c.spent, 0)
  const prevNonEssentialTotal = previousSnapshot.categories
    .filter(c => c.type === 'non-essential')
    .reduce((sum, c) => sum + c.spent, 0)

  const essentialMoM = prevEssentialTotal > 0
    ? Math.round(((essentialTotal - prevEssentialTotal) / prevEssentialTotal) * 100)
    : 0
  const nonEssentialMoM = prevNonEssentialTotal > 0
    ? Math.round(((nonEssentialTotal - prevNonEssentialTotal) / prevNonEssentialTotal) * 100)
    : 0

  return (
    <DashboardShell pageTitle="Budgeting & Spending">
      <div className="space-y-10">

        {/* Row 1 — Essential + Lifestyle totals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card variant="default" padding="xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface/50 mb-3">Essential Spending</p>
            <p className="font-serif text-3xl font-extrabold text-primary mb-2">
              ₹{essentialTotal.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-on-surface/50 font-sans mb-3">{essentialPct}% of income</p>
            <TrendIndicator value={essentialMoM} label="vs May" invertColors size="sm" />
          </Card>

          <Card variant="default" padding="xl">
            <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface/50 mb-3">Lifestyle Spending</p>
            <p className="font-serif text-3xl font-extrabold text-primary mb-2">
              ₹{nonEssentialTotal.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-on-surface/50 font-sans mb-3">{nonEssentialPct}% of income</p>
            <TrendIndicator value={nonEssentialMoM} label="vs May" invertColors size="sm" />
          </Card>
        </div>

        {/* Row 2 — Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GlassCard padding="lg">
            <SpendingCategoryChart
              snapshot={currentSnapshot}
              essentialTotal={essentialTotal}
              nonEssentialTotal={nonEssentialTotal}
            />
          </GlassCard>
          <GlassCard padding="lg">
            <IncomeExpenseChart current={currentSnapshot} momChange={momChange} />
          </GlassCard>
        </div>

        {/* Row 3 — Budget Tracker */}
        <div>
          <h3 className="font-serif text-xl font-bold text-primary mb-5">Budget Tracker — June 2026</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {budgetProgress.map(bp => (
              <BudgetProgressCard key={bp.category} budget={bp} />
            ))}
          </div>
        </div>

        {/* Row 4 — Month-on-Month comparison */}
        <div>
          <h3 className="font-serif text-xl font-bold text-primary mb-5">Month-on-Month</h3>
          <Card variant="default" padding="xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface/40">Total Expenses</p>
                <p className="font-serif text-xl font-extrabold text-primary">
                  ₹{currentSnapshot.totalExpenses.toLocaleString('en-IN')}
                  <span className="font-sans text-xs text-on-surface/40 font-normal ml-2">June</span>
                </p>
                <p className="text-xs text-on-surface/50 font-sans">
                  vs ₹{previousSnapshot.totalExpenses.toLocaleString('en-IN')} in May
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface/40">Month-on-Month Change</p>
                <TrendIndicator value={momChange} label="vs May" invertColors size="md" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface/40">Savings Rate</p>
                <p className="font-serif text-xl font-extrabold text-primary">
                  {currentSnapshot.savingsRate.toFixed(1)}%
                </p>
                <p className="text-xs text-on-surface/50 font-sans">
                  Target: 30%
                </p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </DashboardShell>
  )
}
