import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'
import { type HTMLAttributes, forwardRef } from 'react'

const cardVariants = cva('transition-all duration-200', {
  variants: {
    variant: {
      default:  'bg-surface-lowest rounded-3xl border border-primary/5 shadow-sm',
      glass:    'bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl',
      elevated: 'bg-surface-lowest rounded-3xl border border-primary/5 shadow-xl hover:shadow-2xl',
      dark:     'bg-[#0A261D] rounded-3xl border border-white/5',
      gradient: 'bg-gradient-to-br from-primary/10 via-transparent to-tertiary/10 rounded-3xl border border-primary/10',
    },
    padding: {
      none: '',
      sm:   'p-4',
      md:   'p-5',
      lg:   'p-6',
      xl:   'p-8',
      '2xl':'p-10',
    },
    hoverable: { true: 'hover:scale-[1.01] cursor-pointer' },
  },
  defaultVariants: { variant: 'default', padding: 'lg' },
})

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, padding, hoverable }), className)} {...props} />
  )
)
Card.displayName = 'Card'

export { Card, cardVariants }
