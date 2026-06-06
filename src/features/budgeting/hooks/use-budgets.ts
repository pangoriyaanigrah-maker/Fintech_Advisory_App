'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { TransactionCategory } from '@/types'
import { getRepositories } from '@/repositories'

const budgets = getRepositories().budgets

export const budgetKeys = { all: ['budgets'] as const }

export function useBudgets() {
  return useQuery({ queryKey: budgetKeys.all, queryFn: () => budgets.getBudgets() })
}

/**
 * Mutation for editing a category budget. Writes through the repository and
 * updates the cache from the returned source of truth (so the UI is consistent
 * whether the backend is mock or Supabase).
 */
export function useUpdateBudget() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ category, limit }: { category: TransactionCategory; limit: number }) =>
      budgets.updateBudget(category, limit),
    onSuccess: (updated) => queryClient.setQueryData(budgetKeys.all, updated),
  })
}
