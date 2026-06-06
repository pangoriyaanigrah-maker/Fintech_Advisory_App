'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, PieChart, Target, ShieldAlert, Sparkles, Settings } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useIsSidebarOpen, useCloseSidebar } from '@/stores/ui-store'

const navItems = [
  { href: '/dashboard',  label: 'Overview',   icon: LayoutDashboard },
  { href: '/budgeting',  label: 'Budgeting',  icon: PieChart },
  { href: '/goals',      label: 'Goals',      icon: Target },
  { href: '/planner',    label: 'SRR Planner', icon: ShieldAlert },
  { href: '/assistant',  label: 'Aura',       icon: Sparkles },
]

const bottomItems = [
  { href: '/settings',   label: 'Settings',   icon: Settings },
]

function SidebarLink({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150',
        isActive
          ? 'bg-white/10 text-white'
          : 'text-white/55 hover:bg-white/5 hover:text-white/90'
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {label}
    </Link>
  )
}

export default function Sidebar() {
  const isSidebarOpen = useIsSidebarOpen()
  const closeSidebar = useCloseSidebar()

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#002219] min-h-screen shrink-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold text-white tracking-tight">Aarya</span>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => <SidebarLink key={item.href} {...item} />)}
        </nav>

        {/* Bottom items */}
        <div className="px-3 pb-6 border-t border-white/5 pt-4 space-y-1">
          {bottomItems.map(item => <SidebarLink key={item.href} {...item} />)}
        </div>
      </aside>

      {/* Mobile sidebar drawer — overlays */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={closeSidebar}
          />
          <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#002219] z-50 flex flex-col lg:hidden">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/5">
              <Link href="/" className="flex items-center gap-2.5" onClick={closeSidebar}>
                <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="font-serif text-xl font-bold text-white tracking-tight">Aarya</span>
              </Link>
            </div>

            {/* Nav items */}
            <nav className="flex-1 px-3 py-4 space-y-1" onClick={closeSidebar}>
              {navItems.map(item => <SidebarLink key={item.href} {...item} />)}
            </nav>

            {/* Bottom items */}
            <div className="px-3 pb-6 border-t border-white/5 pt-4 space-y-1" onClick={closeSidebar}>
              {bottomItems.map(item => <SidebarLink key={item.href} {...item} />)}
            </div>
          </aside>
        </>
      )}
    </>
  )
}
