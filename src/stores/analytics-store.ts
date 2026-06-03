import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { FinancialHealthScore, FinancialInsight } from '@/types'
import { computeHealthScore, generateInsights } from '@/features/analytics/utils/calculations'
import { juneSnapshot, maySnapshot } from '@/features/spending/data/mock-data'

interface AnalyticsStore {
  healthScore: FinancialHealthScore
  insights: FinancialInsight[]
  // future: refreshAnalytics(current, previous) => void for API
  refreshAnalytics: () => void
}

const useAnalyticsStore = create<AnalyticsStore>()(
  immer((set) => ({
    healthScore: computeHealthScore(juneSnapshot, maySnapshot),
    insights: generateInsights(juneSnapshot, maySnapshot),
    refreshAnalytics: () =>
      set((state) => {
        // In future: call with live data from spending store
        state.healthScore = computeHealthScore(juneSnapshot, maySnapshot)
        state.insights = generateInsights(juneSnapshot, maySnapshot)
      }),
  }))
)

export default useAnalyticsStore

// Granular selectors
export const useHealthScore = () => useAnalyticsStore(s => s.healthScore)
export const useInsights = () => useAnalyticsStore(s => s.insights)
