'use client'

import { useState, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { MotionConfig } from 'framer-motion'
import { makeQueryClient } from '@/lib/query-client'
import { ErrorBoundary } from '@/components/ui/error-boundary'

/**
 * Client-side app providers, mounted once from the root (server) layout:
 *  - React Query for server-state (fetch/cache/mutate via the repository layer)
 *  - MotionConfig reducedMotion="user" — globally respects the OS reduce-motion
 *    setting (the accessibility item deferred from M1)
 *  - ErrorBoundary so a render error degrades gracefully
 */
export function Providers({ children }: { children: ReactNode }) {
  // Lazily create one client per browser session (not recreated on re-render).
  const [queryClient] = useState(() => makeQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <ErrorBoundary>{children}</ErrorBoundary>
      </MotionConfig>
    </QueryClientProvider>
  )
}
