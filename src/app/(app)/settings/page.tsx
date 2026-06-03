'use client'

import DashboardShell from '@/components/layout/dashboard-shell'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  return (
    <DashboardShell pageTitle="Settings">
      <div className="space-y-6 max-w-3xl">

        {/* 1. Profile */}
        <Card variant="default" padding="xl">
          <h3 className="font-serif text-lg font-bold text-primary mb-4">Profile</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center shrink-0">
                <span className="font-serif text-xl font-bold text-primary">AN</span>
              </div>
              <div>
                <p className="font-bold text-primary font-sans">Ananya Sharma</p>
                <p className="text-xs text-on-surface/50 font-sans">ananya@example.com</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-primary/5">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface/40">Monthly Income</p>
                <p className="font-bold text-primary">₹85,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface/40">Risk Profile</p>
                <p className="font-bold text-primary">Moderate</p>
              </div>
            </div>
            <div className="pt-2">
              <span className="text-xs text-on-surface/40 font-sans italic">Profile editing coming soon with account setup.</span>
            </div>
          </div>
        </Card>

        {/* 2. Notifications */}
        <Card variant="default" padding="xl">
          <h3 className="font-serif text-lg font-bold text-primary mb-4">Notifications</h3>
          <div className="space-y-4">
            {[
              { label: 'Budget alerts', desc: 'Get notified when you exceed a budget category' },
              { label: 'Weekly summary', desc: 'Receive a weekly financial health digest' },
              { label: 'SIP reminders', desc: 'Monthly reminders before SIP deduction dates' },
              { label: 'Market insights', desc: 'Curated AI insights on Indian markets' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-primary/5 last:border-0">
                <div>
                  <p className="font-sans text-sm font-semibold text-primary">{item.label}</p>
                  <p className="text-xs text-on-surface/50 font-sans mt-0.5">{item.desc}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface/40 bg-surface-low border border-primary/5 px-3 py-1 rounded-full shrink-0 ml-4">
                  Soon
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* 3. Linked Accounts */}
        <Card variant="default" padding="xl">
          <h3 className="font-serif text-lg font-bold text-primary mb-4">Linked Accounts</h3>
          <p className="text-sm text-on-surface/60 font-sans mb-4">
            Connect your bank accounts and investment portfolios for real-time analytics.
          </p>
          <div className="border-2 border-dashed border-primary/10 rounded-2xl p-8 text-center space-y-3">
            <p className="font-sans text-sm text-on-surface/40 font-medium">No accounts connected yet</p>
            <p className="font-sans text-xs text-on-surface/30">Connect your first account to unlock live data</p>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" disabled>
              Coming with bank integrations
            </Button>
          </div>
        </Card>

        {/* 4. App Preferences */}
        <Card variant="default" padding="xl">
          <h3 className="font-serif text-lg font-bold text-primary mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-primary/5">
              <div>
                <p className="font-sans text-sm font-semibold text-primary">Currency</p>
                <p className="text-xs text-on-surface/50 font-sans mt-0.5">Display currency for all values</p>
              </div>
              <span className="font-bold text-primary text-sm">INR ₹</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-primary/5">
              <div>
                <p className="font-sans text-sm font-semibold text-primary">Language</p>
                <p className="text-xs text-on-surface/50 font-sans mt-0.5">Interface display language</p>
              </div>
              <span className="font-bold text-primary text-sm">English</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-sans text-sm font-semibold text-primary">Theme</p>
                <p className="text-xs text-on-surface/50 font-sans mt-0.5">Dark mode coming soon</p>
              </div>
              <span className="font-bold text-primary text-sm">Light</span>
            </div>
          </div>
        </Card>

      </div>
    </DashboardShell>
  )
}
