'use client'

/** Coerce an <input> value to a finite number (empty / NaN -> 0). */
function toNumber(value: string): number {
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : 0
}

interface NumberFieldProps {
  label: string
  value: number
  onChange: (v: number) => void
  prefix?: string
  suffix?: string
  step?: number
  min?: number
}

/**
 * Labelled numeric input with optional ₹ / % adornments, styled to the design
 * system. Shared by the planner and the tax calculator (previously duplicated).
 */
export function NumberField({ label, value, onChange, prefix, suffix, step = 1, min }: NumberFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold text-primary uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/60 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ''}
          step={step}
          min={min}
          onChange={(e) => onChange(toNumber(e.target.value))}
          className={[
            'font-sans text-sm bg-surface-low border border-primary/10 rounded-xl py-3 text-on-surface w-full',
            'focus:outline-none focus:border-tertiary-container/70 transition-colors duration-150',
            prefix ? 'pl-7' : 'pl-4',
            suffix ? 'pr-9' : 'pr-4',
          ].join(' ')}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface/60 text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}
