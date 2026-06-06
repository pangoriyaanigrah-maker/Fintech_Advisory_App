'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  AlertTriangle,
  Sparkles,
  Compass,
  Building,
  RefreshCw,
  Lock,
  Link2,
  CalendarClock,
  LineChart,
  Coins,
} from 'lucide-react';
import type { AssetClassId } from '@/types';
import { usePlanner } from '@/hooks/usePlanner';
import { formatINR, formatINRCompact } from '@/features/planner/utils/projection';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { NumberField } from '@/components/ui/number-field';
import { AnimatedWrapper } from '@/components/motion/animated-wrapper';

/** lucide icon component per asset class (icon names are stored as strings). */
const ASSET_ICONS: Record<AssetClassId, React.ElementType> = {
  stocks: TrendingUp,
  gold: Sparkles,
  international: Compass,
  fd: Building,
  bonds: ShieldCheck,
};

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

/** Consistent numbered header for each input section. */
function StepHeader({
  step,
  icon,
  title,
  subtitle,
  action,
}: {
  step: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/5 pb-5">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-bold text-tertiary uppercase tracking-[0.18em] mb-0.5">
            Step {step}
          </p>
          <h4 className="font-serif text-lg font-bold text-primary leading-tight">{title}</h4>
          <p className="text-[11px] text-on-surface/55 font-semibold">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

/** Small uppercase label that groups a cluster of fields within a section. */
function FieldGroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-bold text-on-surface/45 uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

/** Headline stat tile for the results band. */
function StatTile({
  label,
  value,
  tone,
  icon,
  note,
}: {
  label: string;
  value: string;
  tone: 'primary' | 'tertiary' | 'error';
  icon: ReactNode;
  note?: string;
}) {
  const valueTone =
    tone === 'tertiary' ? 'text-tertiary' : tone === 'error' ? 'text-error' : 'text-primary';
  return (
    <div className="p-5 bg-surface-lowest rounded-2xl border border-primary/5 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-2 text-on-surface/60">
        <span className={valueTone}>{icon}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className={`font-serif text-2xl md:text-3xl font-extrabold mt-2 tracking-tight ${valueTone}`}>
        {value}
      </p>
      {note && <p className="text-[11px] text-on-surface/65 font-semibold mt-1">{note}</p>}
    </div>
  );
}

/** Read-only figure tile sourced (locked) from the user's Budgeting data. */
function SyncedTile({ label, value, freqLabel }: { label: string; value: number; freqLabel: string }) {
  return (
    <div className="p-4 rounded-2xl bg-surface-low/40 border border-dashed border-primary/15">
      <div className="flex items-center gap-1.5 text-on-surface/55 mb-2">
        <Lock className="w-3 h-3 shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{label}</span>
      </div>
      <p className="font-serif text-xl md:text-2xl font-extrabold text-primary tracking-tight">
        ₹{Math.round(value).toLocaleString('en-IN')}
        <span className="font-sans text-[11px] font-bold text-on-surface/45"> {freqLabel}</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

export default function FinancialPlanner({ embedded = false }: { embedded?: boolean }) {
  const {
    inputs,
    result,
    linkedFromBudget,
    setGeneralInflation,
    setMedicalInflationPremium,
    setAgeStarted,
    setPlanningUpToAge,
    setStressYears,
    updateAsset,
    reset,
  } = usePlanner();

  // Income / Expenses display frequency is a UI convenience; the store always
  // holds annual figures.
  const [freq, setFreq] = useState<'annual' | 'monthly'>('annual');
  const divisor = freq === 'monthly' ? 12 : 1;
  const freqLabel = freq === 'monthly' ? '/mo' : '/yr';

  // Cash-flow table view: nominal (inflated) rupees vs real (today's purchasing power).
  const [view, setView] = useState<'nominal' | 'real'>('nominal');
  const toView = (value: number, realFactor: number) =>
    view === 'real' ? value * realFactor : value;

  const { rows, finalExpected, finalStressed, finalGap, annualSurplus, years } = result;

  const contributionsTotal = useMemo(
    () => inputs.assets.reduce((s, a) => s + a.annualContribution, 0),
    [inputs.assets]
  );
  const overContributing = contributionsTotal > annualSurplus;
  const gapPct = finalExpected > 0 ? Math.round((finalGap / finalExpected) * 100) : 0;

  const realRate =
    (((1 + (inputs.generalInflation + inputs.medicalInflationPremium) / 100) /
      (1 + inputs.generalInflation / 100) -
      1) *
      100).toFixed(1);

  /* -------- SVG comparison chart (expected vs stressed, gap shaded) -------- */
  const chart = useMemo(() => {
    if (rows.length < 2) return null;

    const padL = 50;
    const padR = 14;
    const padT = 18;
    const padB = 28;
    const W = 520;
    const H = 230;
    const w = W - padL - padR;
    const h = H - padT - padB;
    const maxVal = Math.max(finalExpected, 1);

    const xAt = (i: number) => padL + (i / (rows.length - 1)) * w;
    const yAt = (v: number) => padT + h - (v / maxVal) * h;

    const expectedPts = rows.map((r, i) => `${xAt(i)},${yAt(r.expectedPortfolio)}`);
    const stressedPts = rows.map((r, i) => `${xAt(i)},${yAt(r.stressedPortfolio)}`);

    const expectedPath = `M ${expectedPts.join(' L ')}`;
    const stressedPath = `M ${stressedPts.join(' L ')}`;

    // Shade The Gap: down the expected curve, back up the stressed curve.
    const gapBand = `M ${expectedPts.join(' L ')} L ${[...stressedPts].reverse().join(' L ')} Z`;

    // ~6 evenly spaced age ticks along the x-axis.
    const tickCount = Math.min(6, rows.length);
    const stepSize = (rows.length - 1) / (tickCount - 1);
    const axisAges = Array.from({ length: tickCount }, (_, k) => {
      const i = Math.round(k * stepSize);
      return { x: xAt(i), y: padT + h + 18, label: `${rows[i].age}` };
    });

    return { expectedPath, stressedPath, gapBand, axisAges, W, H };
  }, [rows, finalExpected]);

  /* Annual / Monthly toggle (lives in the Income & Expenses header). */
  const freqToggle = (
    <div className="flex bg-surface-low rounded-lg p-0.5 border border-primary/5">
      {(['annual', 'monthly'] as const).map((f) => (
        <button
          key={f}
          onClick={() => setFreq(f)}
          className={[
            'text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-colors',
            freq === f ? 'bg-primary text-white' : 'text-on-surface/65 hover:text-primary',
          ].join(' ')}
        >
          {f === 'annual' ? 'Yearly' : 'Monthly'}
        </button>
      ))}
    </div>
  );

  const innerContent = (
    <>
      <SectionHeading
        eyebrow="ADVANCED WEALTH PLANNING"
        title="Sequence of Returns Risk Planner"
        description="Map every rupee in and out, age by age — then stress-test the early years to see the exact compounding cost of a bad market sequence."
        align="center"
        className="mb-12 md:mb-16"
      />

      <div className="space-y-10 md:space-y-12">

        {/* ===================== STEP 01 — INCOME & EXPENSES ===================== */}
        <GlassCard padding="lg" rounded="2xl" className="space-y-6">
          <StepHeader
            step="01"
            icon={<ArrowUpRight className="w-5 h-5" />}
            title="Income & Expenses"
            subtitle={linkedFromBudget ? 'Synced from your Budgeting' : 'What comes in vs. what goes out'}
            action={freqToggle}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <SyncedTile label="Total Income" value={inputs.annualIncome / divisor} freqLabel={freqLabel} />
            <SyncedTile label="Expenses (excl. healthcare)" value={inputs.annualExpenses / divisor} freqLabel={freqLabel} />
            <SyncedTile label="Healthcare — first year" value={inputs.healthcareFirstYear / divisor} freqLabel={freqLabel} />

            {/* Investable surplus — the computed highlight */}
            <div className="p-4 rounded-2xl border border-primary/10 bg-gradient-to-br from-tertiary-container/20 to-transparent">
              <div className="flex items-center gap-1.5 text-on-surface/55 mb-2">
                {annualSurplus >= 0 ? (
                  <TrendingUp className="w-3.5 h-3.5 text-tertiary shrink-0" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-error shrink-0" />
                )}
                <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">Investable Surplus</span>
              </div>
              <p className={`font-serif text-xl md:text-2xl font-extrabold tracking-tight ${annualSurplus >= 0 ? 'text-primary' : 'text-error'}`}>
                {formatINR(annualSurplus / divisor)}
                <span className="font-sans text-[11px] font-bold text-on-surface/45"> {freqLabel}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {linkedFromBudget && (
              <p className="flex items-start gap-1.5 text-[11px] text-on-surface/60">
                <Link2 className="w-3.5 h-3.5 text-tertiary shrink-0 mt-px" />
                <span>
                  Pulled from your{' '}
                  <Link
                    href="/budgeting"
                    className="font-bold text-primary underline underline-offset-2 hover:text-tertiary"
                  >
                    Budgeting
                  </Link>{' '}
                  data (monthly × 12). Log a transaction there and this re-projects automatically.
                </span>
              </p>
            )}
            <p className="text-[11px] text-on-surface/55">
              Healthcare grows {inputs.generalInflation + inputs.medicalInflationPremium}% nominal
              ({inputs.generalInflation}% inflation + {inputs.medicalInflationPremium}% medical), ~{realRate}% in real terms.
            </p>
          </div>
        </GlassCard>

        {/* ===================== STEP 02 — PLAN SETUP ===================== */}
        <GlassCard padding="lg" rounded="2xl" className="space-y-6">
          <StepHeader
            step="02"
            icon={<CalendarClock className="w-5 h-5" />}
            title="Plan Horizon & Inflation"
            subtitle="Your timeline and economic assumptions"
            action={
              <Button variant="ghost" size="sm" onClick={reset} iconLeft={<RefreshCw className="w-3.5 h-3.5" />}>
                Reset
              </Button>
            }
          />

          <div>
            <FieldGroupLabel>Timeline</FieldGroupLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <NumberField label="Age Started" suffix="yrs" min={0} value={inputs.ageStarted} onChange={setAgeStarted} />
              <NumberField label="Planning Up To Age" suffix="yrs" min={0} value={inputs.planningUpToAge} onChange={setPlanningUpToAge} />
              <NumberField label="Stress Window" suffix="yrs" min={0} value={inputs.stressYears} onChange={setStressYears} />
            </div>
          </div>

          <div>
            <FieldGroupLabel>Inflation</FieldGroupLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <NumberField label="General Inflation" suffix="%" step={0.5} min={0} value={inputs.generalInflation} onChange={setGeneralInflation} />
              <NumberField label="Medical Premium (above CPI)" suffix="%" step={0.5} min={0} value={inputs.medicalInflationPremium} onChange={setMedicalInflationPremium} />
            </div>
          </div>
        </GlassCard>

        {/* ===================== STEP 03 — YOUR ASSETS ===================== */}
        <GlassCard padding="lg" rounded="2xl" className="space-y-6">
          <StepHeader
            step="03"
            icon={<Coins className="w-5 h-5" />}
            title="Your Assets"
            subtitle="Returns, corpus & contributions per asset class"
          />

          <div className="space-y-3">
            <div className="hidden md:grid grid-cols-12 gap-4 px-2 text-[11px] font-bold text-on-surface/50 uppercase tracking-widest">
              <span className="col-span-3">Asset Class</span>
              <span className="col-span-2">Exp. Return</span>
              <span className="col-span-2">Stress (Yr 1–{inputs.stressYears})</span>
              <span className="col-span-3">Current Amount</span>
              <span className="col-span-2">Contribution /yr</span>
            </div>

            {inputs.assets.map((asset) => {
              const Icon = ASSET_ICONS[asset.id];
              return (
                <div
                  key={asset.id}
                  className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 items-end p-4 rounded-2xl bg-surface-low/50 border border-primary/5 hover:border-primary/10 transition-colors"
                >
                  <div className="col-span-2 md:col-span-3 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-sans text-sm font-bold text-primary leading-tight">
                      {asset.label}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <NumberField label="Exp %" suffix="%" step={0.5} value={asset.expectedReturn} onChange={(v) => updateAsset(asset.id, { expectedReturn: v })} />
                  </div>
                  <div className="md:col-span-2">
                    <NumberField label="Stress %" suffix="%" step={0.5} value={asset.stressedReturn} onChange={(v) => updateAsset(asset.id, { stressedReturn: v })} />
                  </div>
                  <div className="md:col-span-3">
                    <NumberField label="Current ₹" prefix="₹" step={10000} min={0} value={asset.currentAmount} onChange={(v) => updateAsset(asset.id, { currentAmount: v })} />
                  </div>
                  <div className="md:col-span-2">
                    <NumberField label="Contrib ₹" prefix="₹" step={5000} min={0} value={asset.annualContribution} onChange={(v) => updateAsset(asset.id, { annualContribution: v })} />
                  </div>
                </div>
              );
            })}
          </div>

          {overContributing && (
            <div className="flex items-start gap-2 text-xs text-error font-semibold bg-error/5 border border-error/15 rounded-xl p-3.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Annual contributions ({formatINR(contributionsTotal)}) exceed your investable surplus
                ({formatINR(annualSurplus)}). Lower contributions or increase income to stay sustainable.
              </span>
            </div>
          )}
        </GlassCard>

        {/* ===================== RESULTS ===================== */}
        {years <= 0 ? (
          <GlassCard padding="xl" rounded="2xl" className="text-center">
            <AlertTriangle className="w-6 h-6 text-tertiary mx-auto mb-2" />
            <p className="font-sans text-sm text-on-surface/70">
              Set <span className="font-bold text-primary">Planning Up To Age</span> higher than{' '}
              <span className="font-bold text-primary">Age Started</span> to project a timeline.
            </p>
          </GlassCard>
        ) : (
          <>
            {/* Outcome stat tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <StatTile
                label="Expected Portfolio"
                value={formatINRCompact(finalExpected)}
                tone="tertiary"
                icon={<TrendingUp className="w-4 h-4" />}
                note={`At age ${inputs.planningUpToAge}, standard returns`}
              />
              <StatTile
                label="Stressed Portfolio"
                value={formatINRCompact(finalStressed)}
                tone="primary"
                icon={<ShieldAlert className="w-4 h-4" />}
                note={`Bad first ${inputs.stressYears} years, then recovery`}
              />
              <StatTile
                label="The Gap"
                value={formatINRCompact(finalGap)}
                tone="error"
                icon={<TrendingDown className="w-4 h-4" />}
                note={`${gapPct}% of expected wealth lost to sequence`}
              />
            </div>

            {/* Trajectory chart */}
            <GlassCard padding="lg" rounded="2xl" className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/5 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary leading-tight">
                      Expected vs. Stressed Trajectory
                    </h4>
                    <p className="text-[11px] text-on-surface/55 font-semibold">
                      Portfolio value, age by age
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-tertiary">
                    <span className="w-3 h-0.5 bg-tertiary-container rounded-full" /> Expected
                  </span>
                  <span className="flex items-center gap-1.5 text-primary">
                    <span className="w-3 h-0.5 bg-primary rounded-full" /> Stressed
                  </span>
                  <span className="flex items-center gap-1.5 text-error">
                    <span className="w-3 h-2 bg-error/15 border border-error/30 rounded-sm" /> Gap
                  </span>
                </div>
              </div>

              <div className="h-[280px] w-full">
                {chart && (
                  <svg
                    viewBox={`0 0 ${chart.W} ${chart.H}`}
                    className="w-full h-full overflow-visible"
                    role="img"
                    aria-label={`Portfolio trajectory by age ${inputs.planningUpToAge}: expected ${formatINRCompact(finalExpected)} versus stressed ${formatINRCompact(finalStressed)}, a gap of ${formatINRCompact(finalGap)}`}
                  >
                    <defs>
                      <linearGradient id="plannerGapGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b3261e" stopOpacity="0.18" />
                        <stop offset="95%" stopColor="#b3261e" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* helper gridlines */}
                    {[0.25, 0.5, 0.75].map((f) => {
                      const y = 18 + (chart.H - 18 - 28) * f;
                      return (
                        <line
                          key={f}
                          x1="50"
                          y1={y}
                          x2={chart.W - 14}
                          y2={y}
                          stroke="rgba(0,53,39,0.05)"
                          strokeDasharray="2 2"
                        />
                      );
                    })}

                    {/* The Gap band */}
                    <path d={chart.gapBand} fill="url(#plannerGapGrad)" />

                    {/* Expected line (gold) */}
                    <path
                      d={chart.expectedPath}
                      fill="none"
                      stroke="#cca72f"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Stressed line (dark, dashed) */}
                    <path
                      d={chart.stressedPath}
                      fill="none"
                      stroke="#003527"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 3"
                    />

                    {/* age axis */}
                    {chart.axisAges.map((pt) => (
                      <text
                        key={pt.label}
                        x={pt.x}
                        y={pt.y}
                        fontFamily="Hanken Grotesk"
                        fontSize="9"
                        fontWeight="bolder"
                        fill="#003527"
                        textAnchor="middle"
                      >
                        Age {pt.label}
                      </text>
                    ))}
                  </svg>
                )}
              </div>
            </GlassCard>

            {/* Year-by-year cash flow */}
            <GlassCard padding="lg" rounded="2xl" className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/5 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary leading-tight">Year-by-Year Cash Flow</h4>
                    <p className="text-[11px] text-on-surface/55 font-semibold">
                      Every rupee in &amp; out · {years} years · highlighted = stress window
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex bg-surface-low rounded-lg p-0.5 border border-primary/5">
                    {(['nominal', 'real'] as const).map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setView(v)}
                        className={[
                          'text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md transition-colors',
                          view === v ? 'bg-primary text-white' : 'text-on-surface/65 hover:text-primary',
                        ].join(' ')}
                      >
                        {v === 'nominal' ? 'Nominal' : "Real (today's ₹)"}
                      </button>
                    ))}
                  </div>
                  <span className="hidden sm:inline text-[11px] text-on-surface/65 font-semibold">
                    ₹ compact (L = Lakh, Cr = Crore)
                  </span>
                </div>
              </div>

              <div className="max-h-[460px] overflow-auto custom-scrollbar rounded-xl border border-primary/5">
                <table className="w-full text-right text-xs">
                  <thead className="sticky top-0 z-10 bg-surface-highest/95 backdrop-blur-sm">
                    <tr className="text-[11px] uppercase tracking-wider text-on-surface/60">
                      <th className="px-3 py-2.5 text-left font-bold">Age</th>
                      <th className="px-3 py-2.5 font-bold">Income</th>
                      <th className="px-3 py-2.5 font-bold">Expenses</th>
                      <th className="px-3 py-2.5 font-bold">└ Healthcare</th>
                      <th className="px-3 py-2.5 font-bold">Net</th>
                      <th className="px-3 py-2.5 font-bold">Contrib.</th>
                      <th className="px-3 py-2.5 font-bold text-tertiary">Expected</th>
                      <th className="px-3 py-2.5 font-bold text-primary">Stressed</th>
                      <th className="px-3 py-2.5 font-bold text-error">Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr
                        key={r.age}
                        className={[
                          'border-t border-primary/5 transition-colors',
                          r.isStressYear ? 'bg-error/[0.04]' : 'hover:bg-surface-low/60',
                        ].join(' ')}
                      >
                        <td className="px-3 py-2 text-left font-bold text-primary">
                          <span className="inline-flex items-center gap-1.5">
                            {r.age}
                            {r.isStressYear && <ShieldAlert className="w-3 h-3 text-error/70" />}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-on-surface/70">{formatINRCompact(toView(r.income, r.realFactor))}</td>
                        <td className="px-3 py-2 text-on-surface/70">{formatINRCompact(toView(r.expenses, r.realFactor))}</td>
                        <td className="px-3 py-2 text-on-surface/60">{formatINRCompact(toView(r.healthcare, r.realFactor))}</td>
                        <td className={`px-3 py-2 font-semibold ${r.netCashFlow >= 0 ? 'text-on-surface/80' : 'text-error'}`}>
                          {formatINRCompact(toView(r.netCashFlow, r.realFactor))}
                        </td>
                        <td className="px-3 py-2 text-on-surface/70">{formatINRCompact(toView(r.contributions, r.realFactor))}</td>
                        <td className="px-3 py-2 font-bold text-tertiary">{formatINRCompact(toView(r.expectedPortfolio, r.realFactor))}</td>
                        <td className="px-3 py-2 font-bold text-primary">{formatINRCompact(toView(r.stressedPortfolio, r.realFactor))}</td>
                        <td className="px-3 py-2 font-bold text-error">{formatINRCompact(toView(r.gap, r.realFactor))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </>
        )}
      </div>
    </>
  );

  if (embedded) {
    return <AnimatedWrapper>{innerContent}</AnimatedWrapper>;
  }

  return (
    <section className="py-16 md:py-24 bg-surface-low overflow-hidden grain-texture" id="planner">
      <Container>{innerContent}</Container>
    </section>
  );
}
