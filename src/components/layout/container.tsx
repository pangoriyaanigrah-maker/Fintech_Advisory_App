import { cn } from '@/lib/utils/cn'
import { type HTMLAttributes, forwardRef } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'main'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeMap = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-6xl',
  xl:   'max-w-7xl',
  full: 'max-w-full',
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Tag = 'div', size = 'xl', ...props }, ref) => (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(sizeMap[size], 'mx-auto px-6 md:px-12 w-full', className)}
      {...props}
    />
  )
)
Container.displayName = 'Container'

export { Container }
