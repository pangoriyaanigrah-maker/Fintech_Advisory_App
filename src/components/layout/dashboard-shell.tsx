'use client'

import { type ReactNode } from 'react'
import Sidebar from '@/components/layout/sidebar'
import Topbar from '@/components/layout/topbar'

interface DashboardShellProps {
  children: ReactNode
  pageTitle: string
}

export default function DashboardShell({ children, pageTitle }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar pageTitle={pageTitle} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
