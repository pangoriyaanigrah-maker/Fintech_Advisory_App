import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { AssetClassId, AssetClassInput, PlannerInputs, PlannerResult } from '@/types'
import { computePlannerProjection, createDefaultInputs } from '@/features/planner/utils/projection'

interface PlannerStore {
  inputs: PlannerInputs
  result: PlannerResult
  // actions
  setIncome: (v: number) => void
  setExpenses: (v: number) => void
  setHealthcareFirstYear: (v: number) => void
  setGeneralInflation: (v: number) => void
  setMedicalInflationPremium: (v: number) => void
  setAgeStarted: (v: number) => void
  setPlanningUpToAge: (v: number) => void
  setStressYears: (v: number) => void
  updateAsset: (id: AssetClassId, patch: Partial<AssetClassInput>) => void
  reset: () => void
}

const initialInputs = createDefaultInputs()

const usePlannerStore = create<PlannerStore>()(
  immer((set) => ({
    inputs: initialInputs,
    result: computePlannerProjection(initialInputs),

    setIncome: (v) =>
      set((state) => {
        state.inputs.annualIncome = v
        state.result = computePlannerProjection(state.inputs)
      }),

    setExpenses: (v) =>
      set((state) => {
        state.inputs.annualExpenses = v
        state.result = computePlannerProjection(state.inputs)
      }),

    setHealthcareFirstYear: (v) =>
      set((state) => {
        state.inputs.healthcareFirstYear = v
        state.result = computePlannerProjection(state.inputs)
      }),

    setGeneralInflation: (v) =>
      set((state) => {
        state.inputs.generalInflation = v
        state.result = computePlannerProjection(state.inputs)
      }),

    setMedicalInflationPremium: (v) =>
      set((state) => {
        state.inputs.medicalInflationPremium = v
        state.result = computePlannerProjection(state.inputs)
      }),

    setAgeStarted: (v) =>
      set((state) => {
        state.inputs.ageStarted = v
        state.result = computePlannerProjection(state.inputs)
      }),

    setPlanningUpToAge: (v) =>
      set((state) => {
        state.inputs.planningUpToAge = v
        state.result = computePlannerProjection(state.inputs)
      }),

    setStressYears: (v) =>
      set((state) => {
        state.inputs.stressYears = v
        state.result = computePlannerProjection(state.inputs)
      }),

    updateAsset: (id, patch) =>
      set((state) => {
        const asset = state.inputs.assets.find((a) => a.id === id)
        if (asset) Object.assign(asset, patch)
        state.result = computePlannerProjection(state.inputs)
      }),

    reset: () =>
      set((state) => {
        state.inputs = createDefaultInputs()
        state.result = computePlannerProjection(state.inputs)
      }),
  }))
)

export default usePlannerStore

// Granular selector hooks
export const usePlannerInputs = () => usePlannerStore(s => s.inputs)
export const usePlannerAssets = () => usePlannerStore(s => s.inputs.assets)
export const usePlannerResult = () => usePlannerStore(s => s.result)
export const useSetIncome = () => usePlannerStore(s => s.setIncome)
export const useSetExpenses = () => usePlannerStore(s => s.setExpenses)
export const useSetHealthcareFirstYear = () => usePlannerStore(s => s.setHealthcareFirstYear)
export const useSetGeneralInflation = () => usePlannerStore(s => s.setGeneralInflation)
export const useSetMedicalInflationPremium = () => usePlannerStore(s => s.setMedicalInflationPremium)
export const useSetAgeStarted = () => usePlannerStore(s => s.setAgeStarted)
export const useSetPlanningUpToAge = () => usePlannerStore(s => s.setPlanningUpToAge)
export const useSetStressYears = () => usePlannerStore(s => s.setStressYears)
export const useUpdateAsset = () => usePlannerStore(s => s.updateAsset)
export const useResetPlanner = () => usePlannerStore(s => s.reset)
