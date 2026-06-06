import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import { Container } from '@/components/layout/container';

export default function Footer() {
  return (
    <footer className="bg-[#002219] text-white border-t border-primary/20 py-16 text-left">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/5 pb-10">

        {/* Column Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">Aarya Wellness</span>
          </div>
          <p className="text-xs text-white/60 leading-relaxed">
            Bespoke digital financial sanctuary designed to align wealth objectives with secure, independent execution strategies for Indian families.
          </p>
        </div>

        {/* Quick links */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-widest text-tertiary-container">Sanctuary Sections</h5>
          <div className="flex flex-col space-y-2 text-xs text-white/75">
            <Link href="/#portfolio" className="hover:text-amber-300">Portfolio Hub</Link>
            <Link href="/dashboard" className="hover:text-amber-300">Financial Dashboard</Link>
            <Link href="/budgeting" className="hover:text-amber-300">Budgeting & Spending</Link>
            <Link href="/goals" className="hover:text-amber-300">Goals & Wealth Planning</Link>
            <Link href="/assistant" className="hover:text-amber-300">Aura AI Assistant</Link>
          </div>
        </div>

        {/* Secure attributes */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-widest text-white/50">SEBI Registration</h5>
          <div className="text-xs text-white/75 leading-relaxed space-y-2">
            <p className="font-semibold text-white">Advisory Shield ID: INA000947231</p>
            <p className="text-[11px] text-white/60">
              Strict secure separation of portfolios, keeping your assets securely registered directly in your legal pan holdings.
            </p>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-widest text-[#B0F0D6]">Active Newsletter Circle</h5>
          <p className="text-xs text-white/65 leading-relaxed">
            Enroll safely inside the weekly Indian Strategy Insights circle.
          </p>
          <NewsletterForm />
        </div>

      </Container>

      {/* Fine SEBI Compliance notes */}
      <Container className="pt-8 text-[11px] text-white/45 leading-relaxed text-center space-y-4">
        <p>
          Disclaimer: Interactive models, calculators, and simulated outputs displayed in this export are for prototype presentation purposes. Mutual fund and index investments are subject to market volatility. Read all scheme related documents carefully before investing. SEBI Registered Investment Advisor (Simulated Client-Trial Platform).
        </p>
        <p className="text-[10px]">&copy; 2026 Aarya Financial Wellness Inc. Developed as a self-contained premium prototype.</p>
      </Container>
    </footer>
  );
}
