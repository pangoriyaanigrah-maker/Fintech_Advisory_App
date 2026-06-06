'use client'

import { useMemo } from 'react'
import DashboardShell from '@/components/layout/dashboard-shell'
import { Card } from '@/components/ui/card'
import { GlassCard } from '@/components/ui/glass-card'
import { TrendIndicator } from '@/components/analytics/trend-indicator'
import { SpendingCategoryChart } from '@/components/analytics/spending-category-chart'
import { IncomeExpenseChart } from '@/components/analytics/income-expense-chart'
import { BudgetProgressCard } from '@/components/analytics/budget-progress-card'
import { AddTransactionForm } from '@/components/analytics/add-transaction-form'
import { RecentTransactions } from '@/components/analytics/recent-transactions'
import { useCurrentSnapshot, usePreviousSnapshot } from '@/features/spending/hooks/use-spending'
import { useBudgets } from '@/features/budgeting/hooks/use-budgets'
import { computeBudgetProgress } from '@/features/budgeting/utils/budget-helpers'
import { getTotalEssential, getTotalNonEssential, getMonthOverMonthChange } from '@/features/analytics/utils/calculations'
import { DashboardSkeleton } from '@/components/ui/skeleton'

export default function BudgetingPage() {
  const { data: currentSnapshot, isLoading: loadingCurrent } = useCurrentSnapshot()
  const { data: previousSnapshot, isLoading: loadingPrevious } = usePreviousSnapshot()
  const { data: budgets, isLoading: loadingBudgets } = useBudgets()

  const budgetProgress = useMemo(
    () => (budgets && currentSnapshot ? computeBudgetProgress(budgets, currentSnapshot) : []),
    [budgets, currentSnapshot]
  )

  if (
    loadingCurrent || loadingPrevious || loadingBudgets ||
    !currentSnapshot || !previousSnapshot || !budgets
  ) {
    return (
      <DashboardShell pageTitle="Budgeting & Spending">
        <DashboardSkeleton />
      </DashboardShell>
    )
  }

  const essentialTotal = getTotalEssential(currentSnapshot)
  const nonEssentialTotal = getTotalNonEssential(currentSnapshot)
  const momChange = getMonthOverMonthChange(currentSnapshot, previousSnapshot)

  // Only show month-over-month comparisons once there is real previous-month data.
  const hasPrev = previousSnapshot.income > 0 || previousSnapshot.totalExpenses > 0

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

        {/* Row 0 — Log a transaction */}
        <AddTransactionForm categories={currentSnapshot.categories} />

        {/* Row 1 — Essential + Lifestyle totals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card variant="default" padding="xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65 mb-3">Essential Spending</p>
            <p className="font-serif text-3xl font-extrabold text-primary mb-2">
              ₹{essentialTotal.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-on-surface/65 font-sans mb-3">{essentialPct}% of income</p>
            {hasPrev && <TrendIndicator value={essentialMoM} label="vs last month" invertColors size="sm" />}
          </Card>

          <Card variant="default" padding="xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65 mb-3">Lifestyle Spending</p>
            <p className="font-serif text-3xl font-extrabold text-primary mb-2">
              ₹{nonEssentialTotal.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-on-surface/65 font-sans mb-3">{nonEssentialPct}% of income</p>
            {hasPrev && <TrendIndicator value={nonEssentialMoM} label="vs last month" invertColors size="sm" />}
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
            <IncomeExpenseChart current={currentSnapshot} momChange={hasPrev ? momChange : undefined} />
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

        {/* Row 4 — Month-on-Month comparison (shown once a previous month exists) */}
        {hasPrev && (
        <div>
          <h3 className="font-serif text-xl font-bold text-primary mb-5">Month-on-Month</h3>
          <Card variant="default" padding="xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/60">Total Expenses</p>
                <p className="font-serif text-xl font-extrabold text-primary">
                  ₹{currentSnapshot.totalExpenses.toLocaleString('en-IN')}
                  <span className="font-sans text-xs text-on-surface/60 font-normal ml-2">{currentSnapshot.month}</span>
                </p>
                <p className="text-xs text-on-surface/65 font-sans">
                  vs ₹{previousSnapshot.totalExpenses.toLocaleString('en-IN')} in {previousSnapshot.month}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/60">Month-on-Month Change</p>
                <TrendIndicator value={momChange} label="vs last month" invertColors size="md" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/60">Savings Rate</p>
                <p className="font-serif text-xl font-extrabold text-primary">
                  {currentSnapshot.savingsRate.toFixed(1)}%
                </p>
                <p className="text-xs text-on-surface/65 font-sans">
                  Target: 30%
                </p>
              </div>
            </div>
          </Card>
        </div>
        )}

        {/* Row 5 — Recent Transactions */}
        <RecentTransactions />

      </div>
    </DashboardShell>
  )
}
