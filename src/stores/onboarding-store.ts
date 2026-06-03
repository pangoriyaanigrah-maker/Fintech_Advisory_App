import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { GoalId } from '@/types'

type RiskProfile = 'conservative' | 'moderate' | 'aggressive'

interface OnboardingStore {
  step: number           // 0 = not started
  isComplete: boolean
  selectedGoals: GoalId[]
  riskProfile: RiskProfile | null
  monthlyIncome: number | null
  investmentPreferences: string[]
  // actions
  nextStep: () => void
  prevStep: () => void
  completeOnboarding: () => void
  resetOnboarding: () => void
  selectGoal: (id: GoalId) => void
  deselectGoal: (id: GoalId) => void
  setRiskProfile: (v: RiskProfile) => void
  setMonthlyIncome: (v: number) => void
}

const useOnboardingStore = create<OnboardingStore>()(
  persist(
    immer((set) => ({
      step: 0,
      isComplete: false,
      selectedGoals: [],
      riskProfile: null,
      monthlyIncome: null,
      investmentPreferences: [],

      nextStep: () =>
        set((state) => {
          state.step += 1
        }),

      prevStep: () =>
        set((state) => {
          if (state.step > 0) state.step -= 1
        }),

      completeOnboarding: () =>
        set((state) => {
          state.isComplete = true
        }),

      resetOnboarding: () =>
        set((state) => {
          state.step = 0
          state.isComplete = false
          state.selectedGoals = []
          state.riskProfile = null
          state.monthlyIncome = null
          state.investmentPreferences = []
        }),

      selectGoal: (id) =>
        set((state) => {
          if (!state.selectedGoals.includes(id)) {
            state.selectedGoals.push(id)
          }
        }),

      deselectGoal: (id) =>
        set((state) => {
          state.selectedGoals = state.selectedGoals.filter((g) => g !== id)
        }),

      setRiskProfile: (v) =>
        set((state) => {
          state.riskProfile = v
        }),

      setMonthlyIncome: (v) =>
        set((state) => {
          state.monthlyIncome = v
        }),
    })),
    {
      name: 'aarya-onboarding',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useOnboardingStore

// Granular selector hooks
export const useOnboardingStep = () => useOnboardingStore(s => s.step)
export const useOnboardingIsComplete = () => useOnboardingStore(s => s.isComplete)
export const useOnboardingGoals = () => useOnboardingStore(s => s.selectedGoals)
export const useNextStep = () => useOnboardingStore(s => s.nextStep)
export const usePrevStep = () => useOnboardingStore(s => s.prevStep)
export const useCompleteOnboarding = () => useOnboardingStore(s => s.completeOnboarding)
export const useResetOnboarding = () => useOnboardingStore(s => s.resetOnboarding)
export const useSelectGoal = () => useOnboardingStore(s => s.selectGoal)
export const useDeselectGoal = () => useOnboardingStore(s => s.deselectGoal)
export const useSetRiskProfile = () => useOnboardingStore(s => s.setRiskProfile)
export const useSetMonthlyIncome = () => useOnboardingStore(s => s.setMonthlyIncome)
