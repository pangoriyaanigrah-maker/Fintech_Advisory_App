import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

interface BaseInputProps {
  label?: string
  error?: string
  helperText?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  fullWidth?: boolean
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {
  as?: 'input'
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {
  as: 'textarea'
  rows?: number
}

type Props = InputProps | TextareaProps

const inputBase = 'font-sans text-sm bg-white/5 border border-primary/15 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-tertiary-container/70 transition-colors duration-150 w-full'
const inputError = 'border-error focus:border-error'
const inputLight = 'bg-surface-low border-primary/10 text-on-surface placeholder:text-on-surface/40'

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ label, error, helperText, iconLeft, iconRight, fullWidth, className, ...props }, ref) => {
    const isTextarea = (props as TextareaProps).as === 'textarea'
    const inputCls = cn(inputBase, inputLight, error && inputError, iconLeft && 'pl-10', iconRight && 'pr-10', className)

    return (
      <div className={cn('space-y-1.5', fullWidth && 'w-full')}>
        {label && (
          <label className="block text-xs font-bold text-primary uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/40 pointer-events-none">
              {iconLeft}
            </span>
          )}
          {isTextarea ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={inputCls}
              rows={(props as TextareaProps).rows ?? 3}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={inputCls}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          {iconRight && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/40 pointer-events-none">
              {iconRight}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-error font-semibold">{error}</p>}
        {!error && helperText && <p className="text-xs text-on-surface/50">{helperText}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
