'use client'

import { useEffect, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { motionVariants } from '@/lib/constants/motion'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showCloseButton?: boolean
}

const sizeMap = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-3xl' }

export function Modal({
  isOpen, onClose, children, title, description, size = 'lg', className, showCloseButton = true,
}: ModalProps) {
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={motionVariants.modalBackdrop}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            className={cn(
              'relative w-full bg-surface-lowest rounded-[2.5rem] shadow-2xl border border-primary/5 max-h-[90vh] overflow-y-auto text-left',
              sizeMap[size],
              className
            )}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={motionVariants.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-low text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {(title || description) && (
              <div className="px-6 sm:px-10 pt-8 pb-0">
                {title && <h2 className="font-serif text-2xl font-extrabold text-primary">{title}</h2>}
                {description && <p className="text-xs text-on-surface/50 italic font-bold mt-1">{description}</p>}
              </div>
            )}
            <div className="p-6 sm:p-10">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
