import type { MonthlySnapshot, FinancialHealthScore, FinancialInsight, HealthScoreBreakdown } from '@/types'
import { computeBudgetProgress, DEFAULT_BUDGETS } from '@/features/budgeting/utils/budget-helpers'

export function getTotalEssential(snapshot: MonthlySnapshot): number {
  return snapshot.categories.filter(c => c.type === 'essential').reduce((s, c) => s + c.spent, 0)
}

export function getTotalNonEssential(snapshot: MonthlySnapshot): number {
  return snapshot.categories.filter(c => c.type === 'non-essential').reduce((s, c) => s + c.spent, 0)
}

export function getMonthOverMonthChange(current: MonthlySnapshot, previous: MonthlySnapshot): number {
  return Math.round(((current.totalExpenses - previous.totalExpenses) / previous.totalExpenses) * 100)
}

export function computeHealthScore(current: MonthlySnapshot, previous: MonthlySnapshot): FinancialHealthScore {
  const budgetProgress = computeBudgetProgress(DEFAULT_BUDGETS, current)
  const overBudgetCount = budgetProgress.filter(b => b.isOverBudget).length
  const essentialRatio = getTotalEssential(current) / current.income
  const momChange = getMonthOverMonthChange(current, previous)

  const savingsEfficiency = current.savingsRate >= 30 ? 10 : current.savingsRate >= 20 ? 8 : current.savingsRate >= 10 ? 6 : 4
  const budgetAdherence = overBudgetCount === 0 ? 10 : overBudgetCount === 1 ? 7 : overBudgetCount <= 3 ? 5 : 3
  const expenseRatio = essentialRatio <= 0.5 ? 10 : essentialRatio <= 0.6 ? 8 : essentialRatio <= 0.7 ? 6 : 4
  const monthlyTrend = momChange <= 0 ? 10 : momChange <= 5 ? 8 : momChange <= 10 ? 6 : 4

  const breakdown: HealthScoreBreakdown = { savingsEfficiency, budgetAdherence, expenseRatio, monthlyTrend }
  const overall = Math.round(((savingsEfficiency + budgetAdherence + expenseRatio + monthlyTrend) / 40) * 100)
  const label: FinancialHealthScore['label'] = overall >= 85 ? 'Excellent' : overall >= 70 ? 'Good' : overall >= 55 ? 'Fair' : 'Needs Attention'

  return { overall, label, breakdown }
}

export function generateInsights(current: MonthlySnapshot, previous: MonthlySnapshot): FinancialInsight[] {
  const insights: FinancialInsight[] = []

  const diningNow = current.categories.find(c => c.category === 'dining')?.spent ?? 0
  const diningPrev = previous.categories.find(c => c.category === 'dining')?.spent ?? 0
  if (diningNow > diningPrev) {
    const pct = Math.round(((diningNow - diningPrev) / diningPrev) * 100)
    insights.push({ id: 'dining-up', message: `Dining out increased ₹${(diningNow - diningPrev).toLocaleString('en-IN')} (+${pct}%) compared to last month`, severity: 'warning', category: 'dining' })
  }

  if (current.savingsRate >= 20) {
    insights.push({ id: 'savings-good', message: `Your savings rate of ${current.savingsRate.toFixed(1)}% is above the recommended 20% threshold`, severity: 'success' })
  }

  const budgetProgress = computeBudgetProgress(DEFAULT_BUDGETS, current)
  budgetProgress.filter(b => b.isOverBudget).forEach(b => {
    insights.push({ id: `over-${b.category}`, message: `${b.label} budget exceeded by ₹${Math.abs(b.remaining).toLocaleString('en-IN')} this month`, severity: 'warning', category: b.category })
  })

  const momChange = getMonthOverMonthChange(current, previous)
  if (momChange > 10) {
    insights.push({ id: 'spending-up', message: `Overall spending rose ${momChange}% vs last month — review your non-essentials`, severity: 'tip' })
  } else if (momChange < 0) {
    insights.push({ id: 'spending-down', message: `Spending dropped ${Math.abs(momChange)}% vs last month — great financial discipline!`, severity: 'success' })
  }

  const essentialPct = Math.round((getTotalEssential(current) / current.income) * 100)
  if (essentialPct <= 55) {
    insights.push({ id: 'essential-good', message: `Essential spending is only ${essentialPct}% of income — strong financial foundation`, severity: 'success' })
  }

  return insights.slice(0, 5)
}
