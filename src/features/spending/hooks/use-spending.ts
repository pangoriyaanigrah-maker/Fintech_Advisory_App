'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { MonthlySnapshot, NewTransaction } from '@/types'
import { getRepositories } from '@/repositories'

const spending = getRepositories().spending

export const spendingKeys = {
  history: ['spending', 'history'] as const,
  current: ['spending', 'current'] as const,
  previous: ['spending', 'previous'] as const,
  transactions: ['spending', 'transactions'] as const,
}

export function useMonthlyHistory() {
  return useQuery({ queryKey: spendingKeys.history, queryFn: () => spending.getMonthlyHistory() })
}

export function useCurrentSnapshot() {
  return useQuery({ queryKey: spendingKeys.current, queryFn: () => spending.getCurrentSnapshot() })
}

export function usePreviousSnapshot() {
  return useQuery({ queryKey: spendingKeys.previous, queryFn: () => spending.getPreviousSnapshot() })
}

export function useTransactions() {
  return useQuery({ queryKey: spendingKeys.transactions, queryFn: () => spending.getTransactions() })
}

/**
 * After any write that changes the current month, push the returned snapshot
 * into the cache and refresh the transaction list, so every consumer (overview
 * metrics, charts, budget progress, health score & insights) updates from the
 * same source of truth without an extra fetch.
 */
function syncCaches(queryClient: ReturnType<typeof useQueryClient>, snapshot: MonthlySnapshot) {
  queryClient.setQueryData(spendingKeys.current, snapshot)
  queryClient.invalidateQueries({ queryKey: spendingKeys.transactions })
  queryClient.invalidateQueries({ queryKey: spendingKeys.history })
}

export function useAddTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NewTransaction) => spending.addTransaction(input),
    onSuccess: (snapshot) => syncCaches(queryClient, snapshot),
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => spending.deleteTransaction(id),
    onSuccess: (snapshot) => syncCaches(queryClient, snapshot),
  })
}
