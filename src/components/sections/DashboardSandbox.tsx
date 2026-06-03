'use client';

import { Receipt, ShieldAlert, Sparkles } from 'lucide-react';
import { useDashboardSandbox } from '@/hooks/useDashboardSandbox';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';

export default function DashboardSandbox() {
  const { spendingTotal, wellnessScore, logs, simulateSpending, resetSpending } =
    useDashboardSandbox();

  const driftPercent = (((spendingTotal - 42300) / 42300) * 100 + 5).toFixed(1);
  const isExcellent = wellnessScore >= 85;

  return (
    <section
      className="py-16 md:py-24 bg-surface text-on-surface text-center"
      id="portfolio_demo"
    >
      <Container className="space-y-12">

        <SectionHeading
          eyebrow="TACO EXPERIENCE"
          title="Financial Zen in Every Pixel"
          description="A dashboard designed not just for complex audits, but for ultimate peace of mind. Play with interactive sandboxes to experience tactile controls and responsive immunity scores."
          align="center"
          className="max-w-3xl mx-auto"
        />

        <div className="relative bg-primary-container rounded-[2rem] p-4 sm:p-8 lg:p-14 overflow-hidden shadow-2xl border border-primary/20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-tertiary/10 rounded-full blur-[90px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />

          <div className="relative max-w-[850px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Dashboard mockup image */}
            <div className="lg:col-span-8">
              <img
                className="w-full h-auto rounded-2xl shadow-inner border border-white/15 opacity-95 hover:opacity-100 transition-opacity duration-300"
                alt="Aarya beautiful glassmorphic dashboard design"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0qRpdB0iYgOhbKBtShAbfmJ9gvHk_YXQbn31eBJTGuG_k7aCABWmVEOQI2Th_ySAZYM7ycRu_vu6hOpeTVWGP6NQpFd6p3GMQF2ZuxQ9ye0teeLG9--6PPW_RHS-M9BztOekgEKO7g7heXNJAKoM5c-hn8Wo--5ys_avmTysN7E4EfpIenzAXUv1TVrvWOAMDP3I_OTZmyw4TDqprgkLqa20lub1xQ3A4qIyjyyLzSnHPSHViokwRiJIEUCb7uSLyCoRfxqMwSNjz"
              />
            </div>

            {/* Interactive gauges */}
            <div className="lg:col-span-4 space-y-6 flex flex-col justify-center">

              {/* Simulated Expense */}
              <GlassCard padding="md" rounded="xl" className="text-left w-full mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-sans text-xs font-bold text-[#003527]/70 uppercase tracking-widest">
                    Simulated Expense
                  </p>
                  <div className="w-2.5 h-2.5 rounded-full bg-error animate-pulse" />
                </div>
                <p className="font-sans text-3xl font-extrabold text-primary tracking-tight">
                  ₹{spendingTotal.toLocaleString('en-IN')}
                </p>
                <div className="mt-2.5 flex items-center gap-1.5 text-error text-xs font-bold bg-error/5 border border-error/10 px-2 py-1 rounded-lg w-max">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{driftPercent}% higher than cumulative May</span>
                </div>
              </GlassCard>

              {/* Financial Immunity Index */}
              <GlassCard padding="md" rounded="xl" className="text-left w-full mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-sans text-xs font-bold text-[#003527]/70 uppercase tracking-widest">
                    Financial Immunity index
                  </p>
                  <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase">
                    Stable
                  </span>
                </div>
                <div className="flex items-end gap-2.5">
                  <p className="font-sans text-4xl font-extrabold text-primary tracking-tight">
                    {wellnessScore}
                  </p>
                  <p className="font-sans text-xs text-on-surface/50 font-bold mb-1">/ 100</p>
                </div>

                <div className="w-full h-2.5 bg-surface-highest/60 rounded-full mt-3.5 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${wellnessScore}%` }}
                  />
                </div>

                <div
                  className={`mt-2 text-[10px] font-bold ${
                    isExcellent ? 'text-primary' : 'text-amber-700'
                  }`}
                >
                  {isExcellent
                    ? '✓ Excellent Financial Immunity Safeguard'
                    : '⚠️ Moderate Budget Drift Detected'}
                </div>
              </GlassCard>

            </div>
          </div>
        </div>

        {/* Sandbox action buttons */}
        <div className="max-w-2xl mx-auto p-6 bg-surface-low rounded-2xl border border-[#cca72f]/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="text-left space-y-1 sm:max-w-md">
            <h4 className="font-serif text-lg font-bold text-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-tertiary" />
              Interactive Play Console
            </h4>
            <p className="text-xs text-on-surface/70">
              Trigger a mock ₹1,500 lifestyle transaction to watch how our spend filters and
              strategic health index adjust live in browser memory.
            </p>
          </div>
          <div className="flex gap-2.5 shrink-0">
            <Button
              onClick={simulateSpending}
              variant="primary"
              size="sm"
              className="px-5 py-3"
            >
              Spend ₹1,500
            </Button>
            <Button
              onClick={resetSpending}
              variant="secondary"
              size="sm"
              className="px-4 py-3"
            >
              Reset Sandbox
            </Button>
          </div>
        </div>

        {/* Alert log */}
        {logs.length > 0 && (
          <div className="max-w-2xl mx-auto space-y-2 mt-4 text-left">
            {logs.map((log) => (
              <div
                key={log.id}
                className="px-4 py-3 bg-tertiary-container/10 border-l-4 border-tertiary-container rounded-r-lg text-xs font-semibold text-primary flex items-start gap-2.5 animate-pulse"
              >
                <Receipt className="w-4 h-4 text-tertiary shrink-0 mt-0.5" />
                <span>
                  Simulated Lifestyle Expense: Deducted ₹1,500 under &ldquo;General&rdquo;. Smart Alert
                  recorded in Aura Memory log. Adjusted Wellness Immunity score to {log.score}/100.
                </span>
              </div>
            ))}
          </div>
        )}

      </Container>
    </section>
  );
}
