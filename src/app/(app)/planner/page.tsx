'use client'

import DashboardShell from '@/components/layout/dashboard-shell'
import FinancialPlanner from '@/components/sections/FinancialPlanner'
import UsCapitalGainsCalculator from '@/components/sections/UsCapitalGainsCalculator'

export default function PlannerPage() {
  return (
    <DashboardShell pageTitle="Sequence of Returns Risk Planner">
      <div className="space-y-16">
        <FinancialPlanner embedded />
        <UsCapitalGainsCalculator />
      </div>
    </DashboardShell>
  )
}
