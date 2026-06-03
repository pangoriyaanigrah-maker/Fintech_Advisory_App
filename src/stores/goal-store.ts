import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { GoalId, GoalData } from '@/types'
import { goalsDictionary } from '@/lib/data/goals'

interface GoalState {
  id: GoalId
  data: GoalData
  optimizationCoefficient: number  // 5-100, tracks slider value
  dynamicSaved: string             // recalculated based on coefficient
}

interface GoalStore {
  goals: Record<GoalId, GoalState>
  // actions
  setOptimizationCoefficient: (id: GoalId, val: number) => void
  lockAllocation: (id: GoalId) => void
}

function buildInitialGoals(): Record<GoalId, GoalState> {
  const entries = Object.entries(goalsDictionary) as [GoalId, GoalData][]
  const result = {} as Record<GoalId, GoalState>
  for (const [id, data] of entries) {
    result[id] = {
      id,
      data,
      optimizationCoefficient: data.progress,
      dynamicSaved: data.saved,
    }
  }
  return result
}

const useGoalStore = create<GoalStore>()(
  immer((set) => ({
    goals: buildInitialGoals(),

    setOptimizationCoefficient: (id, val) =>
      set((state) => {
        state.goals[id].optimizationCoefficient = val
        const targetNum =
          id === 'home' ? 1.5 : id === 'academy' ? 0.75 : 4.2
        const unit = id === 'academy' ? 'Lakhs' : 'Crores'
        state.goals[id].dynamicSaved = `₹${(targetNum * val / 100).toFixed(2)} ${unit}`
      }),

    // Placeholder for future API call
    lockAllocation: (_id) => {
      // no-op
    },
  }))
)

export default useGoalStore

// Granular selector hooks
export const useGoal = (id: GoalId) => useGoalStore(s => s.goals[id])
export const useSetOptimizationCoefficient = () => useGoalStore(s => s.setOptimizationCoefficient)
export const useLockAllocation = () => useGoalStore(s => s.lockAllocation)
