'use client'

import DashboardShell from '@/components/layout/dashboard-shell'
import Goals from '@/components/sections/Goals'
import SIPCalculator from '@/components/sections/SIPCalculator'

export default function GoalsPage() {
  return (
    <DashboardShell pageTitle="Goals & Wealth Planning">
      <div className="space-y-16">
        <Goals embedded />
        <SIPCalculator embedded />
      </div>
    </DashboardShell>
  )
}
