'use client'
import { AlertTriangle, CheckCircle2, Info, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { FinancialInsight } from '@/types'

const severityConfig = {
  warning: { icon: AlertTriangle, bg: 'bg-tertiary-container/15 border-tertiary-container/30', text: 'text-tertiary', iconColor: 'text-tertiary' },
  success: { icon: CheckCircle2, bg: 'bg-primary/5 border-primary/15', text: 'text-primary', iconColor: 'text-primary' },
  info:    { icon: Info, bg: 'bg-surface-highest border-surface-highest', text: 'text-on-surface/70', iconColor: 'text-on-surface/65' },
  tip:     { icon: Lightbulb, bg: 'bg-tertiary-container/10 border-tertiary-container/20', text: 'text-tertiary', iconColor: 'text-tertiary-container' },
} as const

interface InsightCardProps {
  insight: FinancialInsight
  compact?: boolean
}

export function InsightCard({ insight, compact = false }: InsightCardProps) {
  const config = severityConfig[insight.severity]
  const Icon = config.icon

  return (
    <div className={cn('flex items-start gap-3 rounded-2xl border p-4', config.bg, compact && 'p-3')}>
      <Icon className={cn('shrink-0 mt-0.5', config.iconColor, compact ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
      <p className={cn('font-sans leading-relaxed', config.text, compact ? 'text-[11px]' : 'text-xs font-medium')}>
        {insight.message}
      </p>
    </div>
  )
}
