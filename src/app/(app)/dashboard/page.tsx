'use client'

import DashboardShell from '@/components/layout/dashboard-shell'
import FinancialHealth from '@/components/sections/FinancialHealth'

export default function DashboardPage() {
  return (
    <DashboardShell pageTitle="Financial Overview">
      <FinancialHealth embedded />
    </DashboardShell>
  )
}
