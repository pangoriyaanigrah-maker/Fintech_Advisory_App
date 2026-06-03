'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'
import { Loader2 } from 'lucide-react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-sans font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none',
  {
    variants: {
      variant: {
        primary:   'bg-primary text-white hover:bg-primary-container shadow-xl shadow-primary/10 hover:shadow-primary/20',
        secondary: 'bg-surface-low text-primary border border-primary/15 hover:bg-surface-highest',
        ghost:     'text-primary hover:bg-primary/5',
        outline:   'border border-primary/20 text-primary hover:bg-surface-low',
        tertiary:  'bg-tertiary-container text-primary hover:bg-amber-400',
      },
      size: {
        sm: 'text-[10px] px-4 py-2 rounded-lg',
        md: 'text-xs px-5 py-2.5 rounded-xl',
        lg: 'text-sm px-8 py-4 rounded-xl',
      },
      fullWidth: { true: 'w-full text-center' },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, iconLeft, iconRight, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
