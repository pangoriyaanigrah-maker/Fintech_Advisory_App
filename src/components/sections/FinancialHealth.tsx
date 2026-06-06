'use client'

import { useMemo } from 'react'
import { Container } from '@/components/layout/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Card } from '@/components/ui/card'
import { GlassCard } from '@/components/ui/glass-card'
import { TrendIndicator } from '@/components/analytics/trend-indicator'
import { IncomeExpenseChart } from '@/components/analytics/income-expense-chart'
import { SpendingCategoryChart } from '@/components/analytics/spending-category-chart'
import { FinancialScoreCard } from '@/components/analytics/financial-score-card'
import { BudgetProgressCard } from '@/components/analytics/budget-progress-card'
import { InsightCard } from '@/components/analytics/insight-card'
import { useCurrentSnapshot, usePreviousSnapshot } from '@/features/spending/hooks/use-spending'
import { useAnalytics } from '@/features/analytics/hooks/use-analytics'
import { useBudgets } from '@/features/budgeting/hooks/use-budgets'
import { computeBudgetProgress } from '@/features/budgeting/utils/budget-helpers'
import { getTotalEssential, getTotalNonEssential, getMonthOverMonthChange } from '@/features/analytics/utils/calculations'
import { DashboardSkeleton } from '@/components/ui/skeleton'

export default function FinancialHealth({ embedded = false }: { embedded?: boolean }) {
  const { data: currentSnapshot, isLoading: loadingCurrent } = useCurrentSnapshot()
  const { data: previousSnapshot, isLoading: loadingPrevious } = usePreviousSnapshot()
  const { data: analytics, isLoading: loadingAnalytics } = useAnalytics()
  const { data: budgets, isLoading: loadingBudgets } = useBudgets()

  const budgetProgress = useMemo(
    () => (budgets && currentSnapshot ? computeBudgetProgress(budgets, currentSnapshot) : []),
    [budgets, currentSnapshot]
  )

  if (
    loadingCurrent || loadingPrevious || loadingAnalytics || loadingBudgets ||
    !currentSnapshot || !previousSnapshot || !analytics || !budgets
  ) {
    return <DashboardSkeleton />
  }

  const essentialTotal = getTotalEssential(currentSnapshot)
  const nonEssentialTotal = getTotalNonEssential(currentSnapshot)
  const momChange = getMonthOverMonthChange(currentSnapshot, previousSnapshot)
  const { healthScore, insights } = analytics

  // Month-over-month chips only appear once there is real previous-month data.
  const hasPrev = previousSnapshot.income > 0 || previousSnapshot.totalExpenses > 0
  const incomeMoM = hasPrev && previousSnapshot.income > 0
    ? Math.round(((currentSnapshot.income - previousSnapshot.income) / previousSnapshot.income) * 100)
    : 0
  const expenseMoM = momChange
  const savingsMoM = hasPrev && previousSnapshot.savingsAmount !== 0
    ? Math.round(((currentSnapshot.savingsAmount - previousSnapshot.savingsAmount) / previousSnapshot.savingsAmount) * 100)
    : 0

  const content = (
    <div className="space-y-10">
      {/* Row 1 — 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Income */}
        <Card variant="default" padding="md">
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65 mb-2">Monthly Income</p>
          <p className="font-serif text-2xl font-extrabold text-primary mb-2">
            ₹{currentSnapshot.income.toLocaleString('en-IN')}
          </p>
          {hasPrev && <TrendIndicator value={incomeMoM} label="vs last month" size="sm" />}
        </Card>

        {/* Monthly Expenses */}
        <Card variant="default" padding="md">
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65 mb-2">Monthly Expenses</p>
          <p className="font-serif text-2xl font-extrabold text-primary mb-2">
            ₹{currentSnapshot.totalExpenses.toLocaleString('en-IN')}
          </p>
          {hasPrev && <TrendIndicator value={expenseMoM} label="vs last month" invertColors size="sm" />}
        </Card>

        {/* Net Savings */}
        <Card variant="default" padding="md">
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65 mb-2">Net Savings</p>
          <p className="font-serif text-2xl font-extrabold text-primary mb-2">
            ₹{currentSnapshot.savingsAmount.toLocaleString('en-IN')}
          </p>
          {hasPrev && <TrendIndicator value={savingsMoM} label="vs last month" size="sm" />}
        </Card>

        {/* Savings Rate */}
        <Card variant="default" padding="md">
          <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65 mb-2">Savings Rate</p>
          <p className="font-serif text-2xl font-extrabold text-primary mb-2">
            {currentSnapshot.savingsRate.toFixed(1)}%
          </p>
          <p className="text-[11px] font-bold text-on-surface/60 uppercase tracking-wider">Target: 30%</p>
        </Card>
      </div>

      {/* Row 2 — Charts + Score */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <GlassCard padding="lg">
            <IncomeExpenseChart current={currentSnapshot} momChange={hasPrev ? momChange : undefined} />
          </GlassCard>
        </div>
        <div className="lg:col-span-4">
          <GlassCard padding="lg">
            <SpendingCategoryChart
              snapshot={currentSnapshot}
              essentialTotal={essentialTotal}
              nonEssentialTotal={nonEssentialTotal}
            />
          </GlassCard>
        </div>
        <div className="lg:col-span-3">
          <GlassCard padding="lg">
            <FinancialScoreCard score={healthScore} />
          </GlassCard>
        </div>
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

      {/* Row 4 — Smart Insights */}
      <div>
        <h3 className="font-serif text-xl font-bold text-primary mb-5">Smart Insights</h3>
        {insights.length === 0 ? (
          <Card variant="default" padding="lg">
            <p className="text-sm text-on-surface/55 font-sans text-center py-2">
              Log your income and a few expenses on the{' '}
              <span className="font-bold text-primary">Budgeting</span> page to unlock personalised insights.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {insights.map(insight => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </div>
    </div>
  )

  if (embedded) {
    return content
  }

  return (
    <section id="financial-health" className="py-16 md:py-24 bg-surface grain-texture">
      <Container>
        <div className="mb-12">
          <SectionHeading
            eyebrow="PERSONAL FINANCE ANALYTICS"
            title="Your Financial Health Overview"
            description="Real-time insights into your spending patterns, budget adherence, and financial wellness score."
            align="center"
          />
        </div>
        {content}
      </Container>
    </section>
  )
}
