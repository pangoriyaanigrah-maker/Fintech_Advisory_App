'use client'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface TrendIndicatorProps {
  value: number          // positive = up, negative = down, 0 = flat
  label?: string
  size?: 'sm' | 'md'
  className?: string
  invertColors?: boolean // true = up is bad (for expenses)
}

export function TrendIndicator({ value, label, size = 'sm', className, invertColors = false }: TrendIndicatorProps) {
  const isUp = value > 0
  const isFlat = value === 0

  const goodColor = invertColors ? 'text-error' : 'text-primary'
  const badColor = invertColors ? 'text-primary' : 'text-error'

  const color = isFlat ? 'text-on-surface/65' : isUp ? (invertColors ? badColor : goodColor) : (invertColors ? goodColor : badColor)
  const bgColor = isFlat ? 'bg-surface-highest' : isUp ? (invertColors ? 'bg-error/10' : 'bg-primary/10') : (invertColors ? 'bg-primary/10' : 'bg-error/10')

  const textSize = size === 'sm' ? 'text-[11px]' : 'text-xs'
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  return (
    <span className={cn('inline-flex items-center gap-1 font-bold rounded-full px-2 py-0.5', textSize, color, bgColor, className)}>
      {isFlat ? <Minus className={iconSize} /> : isUp ? <TrendingUp className={iconSize} /> : <TrendingDown className={iconSize} />}
      {Math.abs(value)}%{label && ` ${label}`}
    </span>
  )
}
