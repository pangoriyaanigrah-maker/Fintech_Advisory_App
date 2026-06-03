import { cn } from '@/lib/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center' | 'right'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  spacing?: 'sm' | 'md' | 'lg'
}

const alignMap = { left: 'text-left', center: 'text-center', right: 'text-right' }
const spacingMap = { sm: 'space-y-2', md: 'space-y-4', lg: 'space-y-6' }

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  titleClassName,
  descriptionClassName,
  spacing = 'md',
}: SectionHeadingProps) {
  return (
    <div className={cn(alignMap[align], spacingMap[spacing], className)}>
      {eyebrow && (
        <span className="text-xs font-bold text-tertiary uppercase tracking-widest block">
          {eyebrow}
        </span>
      )}
      <h2 className={cn('font-serif text-3xl md:text-5xl text-primary font-bold leading-tight', titleClassName)}>
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'font-sans text-on-surface/70 text-base leading-relaxed',
            align === 'center' && 'max-w-2xl mx-auto',
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
