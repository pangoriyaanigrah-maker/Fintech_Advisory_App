import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { SIPResult, SIPStep } from '@/types'

function computeSIP(amount: number, tenure: number, rate: number): SIPResult {
  const r = rate / 100 / 12
  const n = tenure * 12

  const futureValue = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const totalInvested = amount * n
  const wealthGained = Math.max(0, futureValue - totalInvested)

  const steps: SIPStep[] = []
  const interval = Math.max(1, Math.round(tenure / 6))

  for (let yr = 1; yr <= tenure; yr += interval) {
    const yrMonths = yr * 12
    const colFutureValue = amount * ((Math.pow(1 + r, yrMonths) - 1) / r) * (1 + r)
    const colInvested = amount * yrMonths
    steps.push({ year: `Yr ${yr}`, invested: colInvested, total: colFutureValue })
  }

  // Ensure final year is included
  if (steps.length === 0 || steps[steps.length - 1].year !== `Yr ${tenure}`) {
    steps.push({ year: `Yr ${tenure}`, invested: totalInvested, total: futureValue })
  }

  return { futureValue, totalInvested, wealthGained, steps }
}

const DEFAULT_AMOUNT = 25000
const DEFAULT_TENURE = 15
const DEFAULT_RATE = 12

interface CalculatorStore {
  amount: number
  tenure: number
  rate: number
  result: SIPResult
  // actions
  setAmount: (v: number) => void
  setTenure: (v: number) => void
  setRate: (v: number) => void
  reset: () => void
}

const useCalculatorStore = create<CalculatorStore>()(
  immer((set) => ({
    amount: DEFAULT_AMOUNT,
    tenure: DEFAULT_TENURE,
    rate: DEFAULT_RATE,
    result: computeSIP(DEFAULT_AMOUNT, DEFAULT_TENURE, DEFAULT_RATE),

    setAmount: (v) =>
      set((state) => {
        state.amount = v
        state.result = computeSIP(v, state.tenure, state.rate)
      }),

    setTenure: (v) =>
      set((state) => {
        state.tenure = v
        state.result = computeSIP(state.amount, v, state.rate)
      }),

    setRate: (v) =>
      set((state) => {
        state.rate = v
        state.result = computeSIP(state.amount, state.tenure, v)
      }),

    reset: () =>
      set((state) => {
        state.amount = DEFAULT_AMOUNT
        state.tenure = DEFAULT_TENURE
        state.rate = DEFAULT_RATE
        state.result = computeSIP(DEFAULT_AMOUNT, DEFAULT_TENURE, DEFAULT_RATE)
      }),
  }))
)

export default useCalculatorStore

// Granular selector hooks
export const useCalculatorAmount = () => useCalculatorStore(s => s.amount)
export const useCalculatorTenure = () => useCalculatorStore(s => s.tenure)
export const useCalculatorRate = () => useCalculatorStore(s => s.rate)
export const useCalculatorResult = () => useCalculatorStore(s => s.result)
export const useSetAmount = () => useCalculatorStore(s => s.setAmount)
export const useSetTenure = () => useCalculatorStore(s => s.setTenure)
export const useSetRate = () => useCalculatorStore(s => s.setRate)
