import type { MonthlySnapshot, FinancialHealthScore, FinancialInsight } from '@/types'
import { computeHealthScore, generateInsights } from '@/features/analytics/utils/calculations'

export interface AnalyticsBundle {
  healthScore: FinancialHealthScore
  insights: FinancialInsight[]
}

/**
 * Use-case (service) layer: turns raw monthly snapshots into the analytics the
 * dashboard renders. Keeps the pure calculations decoupled from data access and
 * from React, so it stays unit-testable.
 */
export function buildAnalytics(current: MonthlySnapshot, previous: MonthlySnapshot): AnalyticsBundle {
  return {
    healthScore: computeHealthScore(current, previous),
    insights: generateInsights(current, previous),
  }
}
