'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView, type Variant } from 'framer-motion'
import { motionVariants } from '@/lib/constants/motion'
import { cn } from '@/lib/utils/cn'

type AnimationPreset = keyof typeof motionVariants

interface AnimatedWrapperProps {
  children: ReactNode
  preset?: AnimationPreset
  delay?: number
  className?: string
  once?: boolean
  threshold?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

interface SimpleVariant {
  hidden: Variant
  visible: Variant & { transition?: Record<string, unknown> }
}

export function AnimatedWrapper({
  children,
  preset = 'slideUp',
  delay = 0,
  className,
  once = true,
  threshold = 0.1,
  as: Tag = 'div',
}: AnimatedWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const variant = motionVariants[preset] as SimpleVariant

  const MotionTag = motion[Tag] as typeof motion.div

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: {
            ...(variant.visible as { transition?: Record<string, unknown> }).transition,
            delay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
