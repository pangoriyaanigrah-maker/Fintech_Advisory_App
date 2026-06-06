import { QueryClient } from '@tanstack/react-query'

/**
 * Creates a QueryClient with sensible fintech defaults. While the repository
 * layer is mock, data is "fresh" for a short window to avoid redundant
 * refetches; tune staleTime/gcTime when the Supabase-backed repos land.
 */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  })
}
