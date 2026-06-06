'use client'

import { useMemo } from 'react'
import type { PlannerInputs } from '@/types'
import {
  usePlannerInputs,
  useSetGeneralInflation,
  useSetMedicalInflationPremium,
  useSetAgeStarted,
  useSetPlanningUpToAge,
  useSetStressYears,
  useUpdateAsset,
  useResetPlanner,
} from '@/stores/planner-store'
import { useCurrentSnapshot } from '@/features/spending/hooks/use-spending'
import { computePlannerProjection } from '@/features/planner/utils/projection'

/**
 * Planner state with Income / Expenses / Healthcare LIVE-LINKED to the user's
 * Budgeting data (single source of truth): the current monthly snapshot ×12,
 * with healthcare split into its own line. Those three are read-only here; all
 * other assumptions (assets, ages, inflation, stress window) come from the
 * editable planner store. The projection re-runs whenever either side changes.
 *
 * Components may still import the granular selectors directly from
 * '@/stores/planner-store' for the editable fields.
 */
export function usePlanner() {
  const storeInputs = usePlannerInputs()
  const { data: snapshot } = useCurrentSnapshot()

  const setGeneralInflation = useSetGeneralInflation()
  const setMedicalInflationPremium = useSetMedicalInflationPremium()
  const setAgeStarted = useSetAgeStarted()
  const setPlanningUpToAge = useSetPlanningUpToAge()
  const setStressYears = useSetStressYears()
  const updateAsset = useUpdateAsset()
  const reset = useResetPlanner()

  // Annual figures derived from the current month (×12). Until the snapshot has
  // loaded, fall back to the store defaults so the planner still renders.
  const linked = useMemo(() => {
    if (!snapshot) {
      return {
        annualIncome: storeInputs.annualIncome,
        annualExpenses: storeInputs.annualExpenses,
        healthcareFirstYear: storeInputs.healthcareFirstYear,
        linkedFromBudget: false,
      }
    }
    const healthcareMonthly =
      snapshot.categories.find((c) => c.category === 'healthcare')?.spent ?? 0
    return {
      annualIncome: Math.round(snapshot.income * 12),
      annualExpenses: Math.round((snapshot.totalExpenses - healthcareMonthly) * 12),
      healthcareFirstYear: Math.round(healthcareMonthly * 12),
      linkedFromBudget: true,
    }
  }, [snapshot, storeInputs.annualIncome, storeInputs.annualExpenses, storeInputs.healthcareFirstYear])

  const inputs: PlannerInputs = useMemo(
    () => ({
      ...storeInputs,
      annualIncome: linked.annualIncome,
      annualExpenses: linked.annualExpenses,
      healthcareFirstYear: linked.healthcareFirstYear,
    }),
    [storeInputs, linked]
  )

  const result = useMemo(() => computePlannerProjection(inputs), [inputs])

  return {
    inputs,
    result,
    linkedFromBudget: linked.linkedFromBudget,
    setGeneralInflation,
    setMedicalInflationPremium,
    setAgeStarted,
    setPlanningUpToAge,
    setStressYears,
    updateAsset,
    reset,
  }
}
