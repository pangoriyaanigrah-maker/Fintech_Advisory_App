import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-bold uppercase tracking-wider rounded-full',
  {
    variants: {
      variant: {
        primary:   'bg-primary/5 text-primary border border-primary/10',
        tertiary:  'bg-tertiary-container/20 text-tertiary border border-tertiary-container/20',
        success:   'bg-primary/10 text-primary',
        error:     'bg-error/10 text-error border border-error/10',
        neutral:   'bg-surface-highest text-on-surface/60',
        dark:      'bg-primary/30 text-white/80',
      },
      size: {
        xs: 'text-[9px] px-2 py-0.5',
        sm: 'text-[10px] px-2.5 py-0.5',
        md: 'text-xs px-3 py-1',
      },
    },
    defaultVariants: { variant: 'primary', size: 'sm' },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}
