'use client'
import type { MonthlySnapshot } from '@/types'
import { cn } from '@/lib/utils/cn'

interface SpendingCategoryChartProps {
  snapshot: MonthlySnapshot
  essentialTotal: number
  nonEssentialTotal: number
  className?: string
}

function DonutChart({ essential, nonEssential, total }: { essential: number; nonEssential: number; total: number }) {
  const r = 40
  const circ = 2 * Math.PI * r
  const essentialPct = total > 0 ? essential / total : 0
  const essentialArc = essentialPct * circ
  const nonEssentialArc = (total > 0 ? nonEssential / total : 0) * circ

  return (
    <svg viewBox="0 0 100 100" className="w-full max-w-[140px] mx-auto">
      {/* Empty track ring (always visible underneath) */}
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(0,53,39,0.06)" strokeWidth="12" />
      {/* Non-essential (gold) — drawn first (bottom) */}
      <circle cx="50" cy="50" r={r} fill="none" stroke="#cca72f" strokeWidth="12" strokeOpacity="0.9"
        strokeDasharray={`${nonEssentialArc} ${circ}`}
        strokeDashoffset={-essentialArc}
        transform="rotate(-90 50 50)"
      />
      {/* Essential (green) */}
      <circle cx="50" cy="50" r={r} fill="none" stroke="#003527" strokeWidth="12" strokeOpacity="0.9"
        strokeDasharray={`${essentialArc} ${circ}`}
        strokeDashoffset="0"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="46" textAnchor="middle" fontFamily="Bodoni Moda" fontSize="14" fontWeight="800" fill="#003527">
        {Math.round(essentialPct * 100)}%
      </text>
      <text x="50" y="57" textAnchor="middle" fontFamily="Hanken Grotesk" fontSize="6.5" fontWeight="700" fill="#003527" opacity="0.5">
        ESSENTIAL
      </text>
    </svg>
  )
}

export function SpendingCategoryChart({ snapshot, essentialTotal, nonEssentialTotal, className }: SpendingCategoryChartProps) {
  const total = essentialTotal + nonEssentialTotal
  const hasData = total > 0
  const essentialPct = hasData ? Math.round((essentialTotal / total) * 100) : 0
  const nonEssentialPct = hasData ? 100 - essentialPct : 0

  const topCategories = [...snapshot.categories].sort((a, b) => b.spent - a.spent).slice(0, 5)

  if (!hasData) {
    return (
      <div className={cn('space-y-5', className)}>
        <h4 className="font-serif text-base font-bold text-primary">Spending Breakdown</h4>
        <p className="text-sm text-on-surface/55 font-sans py-8 text-center">
          No spending logged yet — add an expense to see your breakdown.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-5', className)}>
      <h4 className="font-serif text-base font-bold text-primary">Spending Breakdown</h4>

      <div className="flex items-center gap-6">
        <DonutChart essential={essentialTotal} nonEssential={nonEssentialTotal} total={total} />
        <div className="space-y-3 flex-1">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs items-center">
              <span className="flex items-center gap-1.5 font-bold text-on-surface/70"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />Essential</span>
              <span className="font-extrabold text-primary">{essentialPct}%</span>
            </div>
            <div className="flex justify-between text-xs items-center">
              <span className="flex items-center gap-1.5 font-bold text-on-surface/70"><span className="w-2.5 h-2.5 rounded-full bg-tertiary-container inline-block" />Lifestyle</span>
              <span className="font-extrabold text-tertiary">{nonEssentialPct}%</span>
            </div>
          </div>
          <div className="h-2 bg-surface-highest rounded-full overflow-hidden flex">
            <div className="h-full bg-primary transition-all duration-700" style={{ width: `${essentialPct}%` }} />
            <div className="h-full bg-tertiary-container transition-all duration-700" style={{ width: `${nonEssentialPct}%` }} />
          </div>
          <p className="text-[11px] text-on-surface/65 font-bold uppercase tracking-wider">
            ₹{essentialTotal.toLocaleString('en-IN')} essential · ₹{nonEssentialTotal.toLocaleString('en-IN')} lifestyle
          </p>
        </div>
      </div>

      {/* Top 5 categories */}
      <div className="space-y-2.5 border-t border-primary/5 pt-4">
        {topCategories.map(cat => {
          const pct = Math.round((cat.spent / total) * 100)
          return (
            <div key={cat.category} className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-on-surface/60 w-20 truncate uppercase tracking-wide">{cat.label}</span>
              <div className="flex-1 h-1.5 bg-surface-highest rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-500', cat.type === 'essential' ? 'bg-primary' : 'bg-tertiary-container')}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-primary w-14 text-right">₹{(cat.spent / 1000).toFixed(1)}K</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
