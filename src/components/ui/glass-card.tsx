import { cn } from '@/lib/utils/cn'
import { type HTMLAttributes, forwardRef } from 'react'

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '3xl'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  rounded?: 'xl' | '2xl' | '3xl'
}

const blurMap = { sm: 'backdrop-blur-sm', md: 'backdrop-blur-md', lg: 'backdrop-blur-lg', xl: 'backdrop-blur-xl', '3xl': 'backdrop-blur-3xl' }
const paddingMap = { sm: 'p-4', md: 'p-5 md:p-6', lg: 'p-6 md:p-8', xl: 'p-8 md:p-10' }
const roundedMap = { xl: 'rounded-2xl', '2xl': 'rounded-[2rem]', '3xl': 'rounded-[2.5rem]' }

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, blur = '3xl', padding = 'lg', rounded = '2xl', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white/70 border border-white/50 shadow-2xl',
        blurMap[blur],
        paddingMap[padding],
        roundedMap[rounded],
        className
      )}
      {...props}
    />
  )
)
GlassCard.displayName = 'GlassCard'

export { GlassCard }
