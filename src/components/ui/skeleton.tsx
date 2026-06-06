import { cn } from '@/lib/utils/cn'

/** Generic shimmer block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-xl bg-surface-highest/70', className)} aria-hidden="true" />
}

/** Loading placeholder matching the dashboard's metric/chart/budget layout. */
export function DashboardSkeleton() {
  return (
    <div className="space-y-10" role="status" aria-label="Loading financial data">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Skeleton className="lg:col-span-5 h-64" />
        <Skeleton className="lg:col-span-4 h-64" />
        <Skeleton className="lg:col-span-3 h-64" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    </div>
  )
}
