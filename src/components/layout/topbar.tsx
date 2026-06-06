'use client'

import Link from 'next/link'
import { Bell, Menu } from 'lucide-react'
import { useToggleSidebar } from '@/stores/ui-store'

interface TopbarProps {
  pageTitle: string
}

export default function Topbar({ pageTitle }: TopbarProps) {
  const toggleSidebar = useToggleSidebar()

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-primary/5 flex items-center justify-between px-4 h-16">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-surface-low text-primary"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-primary">Aarya</span>
          </Link>
        </div>

        {/* Right: notification bell + avatar placeholder */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-surface-low text-on-surface/60 relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-tertiary-container" />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center">
            <span className="text-[11px] font-bold text-primary">AN</span>
          </div>
        </div>
      </header>

      {/* Desktop page header — rendered inside main content area */}
      <div className="hidden lg:flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-bold text-on-surface/60 uppercase tracking-widest mb-1">June 2026</p>
          <h1 className="font-serif text-2xl font-bold text-primary">{pageTitle}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-surface-low text-on-surface/60 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-tertiary-container" />
          </button>
          <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">AN</span>
          </div>
        </div>
      </div>
    </>
  )
}
