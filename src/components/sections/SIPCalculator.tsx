'use client';

import { useMemo } from 'react';
import { Calculator, Sparkles } from 'lucide-react';
import { useSIPCalculator } from '@/hooks/useSIPCalculator';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';

export default function SIPCalculator({ embedded = false }: { embedded?: boolean }) {
  const { amount, tenure, rate, setAmount, setTenure, setRate, result } = useSIPCalculator();

  const { futureValue, totalInvested, wealthGained, steps } = result;

  const svgPaths = useMemo(() => {
    const paddingLeft = 45;
    const paddingRight = 10;
    const paddingTop = 15;
    const paddingBottom = 25;
    const svgWidth = 500;
    const svgHeight = 200;

    const width = svgWidth - paddingLeft - paddingRight;
    const height = svgHeight - paddingTop - paddingBottom;

    const maxVal = Math.max(futureValue, 500000);

    if (steps.length < 2) return null;

    const investedPoints: string[] = [];
    const wealthPoints: string[] = [];

    steps.forEach((s, idx) => {
      const x = paddingLeft + (idx / (steps.length - 1)) * width;
      const yInvest = paddingTop + height - (s.invested / maxVal) * height;
      const yWealth = paddingTop + height - (s.total / maxVal) * height;
      investedPoints.push(`${x},${yInvest}`);
      wealthPoints.push(`${x},${yWealth}`);
    });

    const wealthPath = `M ${wealthPoints.join(' L ')}`;
    const investedPath = `M ${investedPoints.join(' L ')}`;

    const baselineY = paddingTop + height;
    const wealthArea = `${wealthPath} L ${paddingLeft + width},${baselineY} L ${paddingLeft},${baselineY} Z`;
    const investedArea = `${investedPath} L ${paddingLeft + width},${baselineY} L ${paddingLeft},${baselineY} Z`;

    const axisYears = steps.map((s, idx) => {
      const x = paddingLeft + (idx / (steps.length - 1)) * width;
      const y = paddingTop + height + 18;
      return { x, y, label: s.year };
    });

    return { wealthPath, wealthArea, investedPath, investedArea, axisYears };
  }, [steps, futureValue]);

  function handleAnalyze() {
    const p = Math.round(amount).toLocaleString('en-IN');
    const total = `₹${Math.round(futureValue).toLocaleString('en-IN')}`;
    alert(
      `Aarya Investment projection confirms a structural wealth accumulation of ${total} over ${tenure} years, on a regular Direct monthly contribution pledge of ₹${p}. Compounding optimization complete!`
    );
  }

  const innerContent = (
    <>
      <SectionHeading
        eyebrow="PASSIVE WELLNESS TOOLS"
        title="Visualize Your Compound Growth Strategy"
        description="Control investment weights, rates, and time matrices to project active capital compounding gains directly."
        align="center"
        className="mb-12"
      />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: SVG chart + metrics */}
          <div className="lg:col-span-6 relative">
            <GlassCard padding="lg" rounded="3xl" className="space-y-6">

              <div className="flex justify-between items-center border-b border-primary/5 pb-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-primary">
                      Prosperity Flow Projection
                    </h4>
                    <p className="text-[9px] text-[#735c00] font-bold uppercase tracking-widest">
                      Active SIP Compounding Graph
                    </p>
                  </div>
                </div>
                <span className="text-xs text-[#003527]/80 font-bold bg-surface-low border border-primary/5 rounded-lg px-3 py-1.5">
                  Rate: {rate}% p.a.
                </span>
              </div>

              {/* SVG chart */}
              <div className="h-[230px] w-full relative">
                <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="wealthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#cca72f" stopOpacity="0.3" />
                      <stop offset="95%" stopColor="#cca72f" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003527" stopOpacity="0.25" />
                      <stop offset="95%" stopColor="#003527" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Helper lines */}
                  <line x1="40" y1="30" x2="490" y2="30" stroke="rgba(0,53,39,0.05)" strokeDasharray="2 2" />
                  <line x1="40" y1="90" x2="490" y2="90" stroke="rgba(0,53,39,0.05)" strokeDasharray="2 2" />
                  <line x1="40" y1="150" x2="490" y2="150" stroke="rgba(0,53,39,0.05)" strokeDasharray="2 2" />

                  {svgPaths && (
                    <>
                      <path d={svgPaths.wealthArea} fill="url(#wealthGrad)" />
                      <path
                        d={svgPaths.wealthPath}
                        fill="none"
                        stroke="#cca72f"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path d={svgPaths.investedArea} fill="url(#investedGrad)" />
                      <path
                        d={svgPaths.investedPath}
                        fill="none"
                        stroke="#003527"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="3 3"
                      />
                      <g>
                        {svgPaths.axisYears.map((pt) => (
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
                            {pt.label}
                          </text>
                        ))}
                      </g>
                    </>
                  )}
                </svg>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4 border-t border-primary/5 pt-4 text-left">
                <div>
                  <span className="text-[10px] text-on-surface/80 font-bold uppercase tracking-wider block">
                    Total Capital Invested
                  </span>
                  <p className="text-lg font-extrabold text-primary mt-1">
                    ₹{Math.round(totalInvested).toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface/80 font-bold uppercase tracking-wider block">
                    Est. Compound Interest Gained
                  </span>
                  <p className="text-lg font-extrabold text-tertiary mt-1">
                    ₹{Math.round(wealthGained).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

            </GlassCard>
          </div>

          {/* Right: sliders */}
          <div className="lg:col-span-6 space-y-7 text-left">

            {/* Monthly amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-sans text-sm font-bold text-primary flex items-center gap-1.5">
                  Monthly Pledge Investment
                </label>
                <span className="font-extrabold text-[#003527] text-lg">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface/50 font-bold uppercase tracking-widest">
                <span>₹5,000</span>
                <span>₹100,000</span>
                <span>₹200,000</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-sans text-sm font-bold text-primary">
                  Allocation Horizon
                </label>
                <span className="font-extrabold text-[#003527] text-lg">{tenure} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-[#cca72f]"
              />
              <div className="flex justify-between text-[10px] text-on-surface/50 font-bold uppercase tracking-widest">
                <span>1 Year</span>
                <span>20 Years</span>
                <span>40 Years</span>
              </div>
            </div>

            {/* Rate */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-sans text-sm font-bold text-[#003527]">
                  Expected Annual Return Yield
                </label>
                <span className="font-extrabold text-[#003527] text-lg">{rate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-1.5 bg-surface-highest rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-on-surface/50 font-bold uppercase tracking-widest">
                <span>5% (Debt)</span>
                <span>12% (Balanced)</span>
                <span>25% (Maximum)</span>
              </div>
            </div>

            {/* Projected value banner */}
            <div className="p-6 bg-surface-lowest rounded-3xl border border-primary/5 shadow-sm space-y-1 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-tertiary-container/5 rounded-full blur-xl pointer-events-none" />
              <p className="text-[10px] text-on-surface/60 font-bold uppercase tracking-wider block">
                Estimated Future Portfolio Value
              </p>
              <h3 className="font-serif text-3xl font-extrabold text-primary tracking-tight mt-1.5">
                ₹{Math.round(futureValue).toLocaleString('en-IN')}
              </h3>
              <p className="text-[9px] text-[#735c00] font-semibold tracking-wider uppercase flex items-center gap-1 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-tertiary-container" />
                Direct compounding advantage modeled dynamically.
              </p>
            </div>

            <Button
              onClick={handleAnalyze}
              variant="primary"
              size="lg"
              fullWidth
            >
              Analyze Trajectory
            </Button>

          </div>

        </div>
    </>
  );

  if (embedded) {
    return <div>{innerContent}</div>;
  }

  return (
    <section
      className="py-16 md:py-24 bg-surface-low overflow-hidden grain-texture"
      id="academy"
    >
      <Container>
        {innerContent}
      </Container>
    </section>
  );
}
