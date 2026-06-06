'use client'

import { useEffect, useCallback, useRef, type ReactNode } from 'react'
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
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    // Focus trap: keep Tab focus cycling within the dialog.
    if (e.key === 'Tab' && panelRef.current) {
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return
    // Remember what was focused so we can restore it on close.
    previouslyFocused.current = document.activeElement as HTMLElement | null
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    // Move focus into the dialog after it mounts.
    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 0)
    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen, handleKeyDown])

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
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            aria-label={title ? undefined : 'Dialog'}
            tabIndex={-1}
            className={cn(
              'relative w-full bg-surface-lowest rounded-[2.5rem] shadow-2xl border border-primary/5 max-h-[90vh] overflow-y-auto text-left focus:outline-none',
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
                {title && <h2 id="modal-title" className="font-serif text-2xl font-extrabold text-primary">{title}</h2>}
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
