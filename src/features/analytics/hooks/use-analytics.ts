'use client'

import { useCurrentSnapshot, usePreviousSnapshot } from '@/features/spending/hooks/use-spending'
import { buildAnalytics, type AnalyticsBundle } from '@/services/analytics-service'

/**
 * Derives the health score + insights from the current/previous snapshots.
 * Reuses the spending queries (React Query dedupes by key), so there's no
 * extra fetch.
 */
export function useAnalytics(): { data: AnalyticsBundle | undefined; isLoading: boolean } {
  const current = useCurrentSnapshot()
  const previous = usePreviousSnapshot()

  const data =
    current.data && previous.data ? buildAnalytics(current.data, previous.data) : undefined

  return { data, isLoading: current.isLoading || previous.isLoading }
}
