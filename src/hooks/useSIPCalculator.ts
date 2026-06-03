'use client'

import {
  useCalculatorAmount,
  useCalculatorTenure,
  useCalculatorRate,
  useCalculatorResult,
  useSetAmount,
  useSetTenure,
  useSetRate,
} from '@/stores/calculator-store'

// Backward-compatible wrapper — keeps existing consumers working without changes
export function useSIPCalculator() {
  const amount = useCalculatorAmount()
  const tenure = useCalculatorTenure()
  const rate = useCalculatorRate()
  const result = useCalculatorResult()
  const setAmount = useSetAmount()
  const setTenure = useSetTenure()
  const setRate = useSetRate()

  return { amount, tenure, rate, setAmount, setTenure, setRate, result }
}
