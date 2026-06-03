'use client'

import DashboardShell from '@/components/layout/dashboard-shell'
import ChatInterface from '@/components/sections/ChatInterface'

export default function AssistantPage() {
  return (
    <DashboardShell pageTitle="Aura AI Assistant">
      <ChatInterface embedded />
    </DashboardShell>
  )
}
