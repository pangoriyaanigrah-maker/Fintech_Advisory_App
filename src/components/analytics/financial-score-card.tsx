'use client'
import type { FinancialHealthScore } from '@/types'
import { cn } from '@/lib/utils/cn'

interface FinancialScoreCardProps {
  score: FinancialHealthScore
  className?: string
}

const labelBg: Record<FinancialHealthScore['label'], string> = {
  Excellent:        'bg-primary/10 text-primary',
  Good:             'bg-primary/5 text-primary',
  Fair:             'bg-tertiary-container/20 text-tertiary',
  'Needs Attention': 'bg-error/10 text-error',
}

function ScoreGauge({ score }: { score: number }) {
  return (
    <svg viewBox="0 0 120 68" className="w-full max-w-[160px] mx-auto" role="img" aria-label={`Financial health score ${score} out of 100`}>
      {/* Track */}
      <path
        d="M 10 60 A 50 50 0 0 1 110 60"
        fill="none"
        stroke="rgba(0,53,39,0.08)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {/* Fill */}
      <path
        d="M 10 60 A 50 50 0 0 1 110 60"
        fill="none"
        stroke={score >= 70 ? '#003527' : score >= 55 ? '#cca72f' : '#b3261e'}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * 157} 157`}
        className="transition-all duration-700"
      />
      {/* Score label */}
      <text x="60" y="56" textAnchor="middle" fontFamily="Bodoni Moda" fontSize="22" fontWeight="800" fill="#003527">{score}</text>
      <text x="60" y="67" textAnchor="middle" fontFamily="Hanken Grotesk" fontSize="7" fontWeight="700" fill="#003527" opacity="0.5">OUT OF 100</text>
    </svg>
  )
}

function SubScore({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] font-bold text-on-surface/60 uppercase tracking-wider">
        <span>{label}</span>
        <span className="text-primary">{value}/10</span>
      </div>
      <div className="h-1 bg-surface-highest rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${value * 10}%` }} />
      </div>
    </div>
  )
}

export function FinancialScoreCard({ score, className }: FinancialScoreCardProps) {
  return (
    <div className={cn('text-center space-y-4', className)}>
      <ScoreGauge score={score.overall} />
      <span className={cn('inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full', labelBg[score.label])}>
        {score.label}
      </span>
      <div className="space-y-2.5 text-left">
        <SubScore label="Savings Rate"     value={score.breakdown.savingsEfficiency} />
        <SubScore label="Budget Adherence" value={score.breakdown.budgetAdherence} />
        <SubScore label="Expense Ratio"    value={score.breakdown.expenseRatio} />
        <SubScore label="Monthly Trend"    value={score.breakdown.monthlyTrend} />
      </div>
    </div>
  )
}
