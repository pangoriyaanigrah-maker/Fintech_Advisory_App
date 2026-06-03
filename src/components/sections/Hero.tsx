'use client';

import { useState } from 'react';
import { Heart, ShieldCheck, TrendingUp } from 'lucide-react';
import { heroGrowthData } from '@/lib/data/hero';
import { Container } from '@/components/layout/container';
import { GlassCard } from '@/components/ui/glass-card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState(5);

  const point = heroGrowthData[hoveredIndex];

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const xCoord = e.clientX - rect.left;
    const svgWidth = rect.width;
    const index = Math.min(5, Math.max(0, Math.round((xCoord / svgWidth) * 5)));
    setHoveredIndex(index);
  }

  function handleMouseLeave() {
    setHoveredIndex(5);
  }

  return (
    <section
      className="relative min-h-[85vh] flex items-center overflow-hidden grain-texture hero-gradient py-12 md:py-20"
      id="portfolio"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2564')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/60 to-surface" />
      </div>

      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Hero Copy */}
        <div className="lg:col-span-6 space-y-7 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full border border-primary/10">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse" />
            <span className="font-sans text-xs font-semibold text-primary uppercase tracking-widest">
              Interactive Prototype Export
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary leading-[1.1] tracking-tight">
            Financial clarity for <br />
            <span className="relative">
              modern Indian women
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-tertiary-container/20 rounded-full" />
            </span>
            .
          </h1>

          <p className="font-sans text-base text-on-surface/80 max-w-xl leading-relaxed">
            Empower your future with an AI companion that speaks your language. Move from
            traditional banking to holistic wealth zen and automated growth, custom-architected for
            your goals.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#wellness"
              className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
            >
              Join the Circle
            </a>
            <a
              href="#advisor"
              className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
            >
              Explore Features
            </a>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-on-surface/60 border-t border-primary/5 max-w-md w-full">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>SEBI Compliant Guidance</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-tertiary" />
              <span>Tailored Indian Lifestyles</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Chart Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative z-10">
            <GlassCard padding="lg" rounded="2xl">

              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-serif text-2xl font-semibold text-primary block">
                    Wealth Growth
                  </span>
                  <span className="text-xs text-on-surface/60 font-medium mt-1 inline-block">
                    Interactive Portfolio Sandbox
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="primary" size="sm">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                    {point.growth}
                  </Badge>
                  <span className="text-[9px] text-[#735c00] bg-tertiary-container/10 border border-tertiary-container/20 px-2 py-0.5 rounded-full font-bold">
                    6-MONTH PORTFOLIO Run
                  </span>
                </div>
              </div>

              {/* SVG Chart */}
              <div className="h-[210px] w-full rounded-2xl relative bg-gradient-to-b from-primary/5 via-transparent to-transparent p-1 border border-primary/5 overflow-hidden">
                <svg
                  viewBox="0 0 500 200"
                  className="w-full h-full overflow-visible"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <defs>
                    <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003527" stopOpacity="0.3" />
                      <stop offset="95%" stopColor="#003527" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <line x1="10" y1="40" x2="490" y2="40" stroke="rgba(0,53,39,0.05)" strokeDasharray="2 3" strokeWidth="1" />
                  <line x1="10" y1="90" x2="490" y2="90" stroke="rgba(0,53,39,0.05)" strokeDasharray="2 3" strokeWidth="1" />
                  <line x1="10" y1="140" x2="490" y2="140" stroke="rgba(0,53,39,0.05)" strokeDasharray="2 3" strokeWidth="1" />

                  {/* Filled area */}
                  <path
                    d="M 10,180 L 10,120 L 106,105 L 202,85 L 298,70 L 394,40 L 490,20 L 490,180 Z"
                    fill="url(#heroGradient)"
                  />

                  {/* Chart line */}
                  <path
                    d="M 10,120 L 106,105 L 202,85 L 298,70 L 394,40 L 490,20"
                    fill="none"
                    stroke="#003527"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Track point */}
                  <circle
                    cx={point.cx}
                    cy={point.cy}
                    r="6"
                    fill="#cca72f"
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-150"
                  />

                  {/* Track line */}
                  <line
                    x1={point.cx}
                    y1="0"
                    x2={point.cx}
                    y2="185"
                    stroke="rgba(115,92,0,0.3)"
                    strokeDasharray="3 3"
                    className="transition-all duration-150"
                  />

                  {/* Month labels */}
                  <text x="10" y="195" fontFamily="Hanken Grotesk" fontSize="10" fontWeight="700" fill="#003527" textAnchor="middle">Jan</text>
                  <text x="106" y="195" fontFamily="Hanken Grotesk" fontSize="10" fontWeight="700" fill="#003527" textAnchor="middle">Feb</text>
                  <text x="202" y="195" fontFamily="Hanken Grotesk" fontSize="10" fontWeight="700" fill="#003527" textAnchor="middle">Mar</text>
                  <text x="298" y="195" fontFamily="Hanken Grotesk" fontSize="10" fontWeight="700" fill="#003527" textAnchor="middle">Apr</text>
                  <text x="394" y="195" fontFamily="Hanken Grotesk" fontSize="10" fontWeight="700" fill="#003527" textAnchor="middle">May</text>
                  <text x="490" y="195" fontFamily="Hanken Grotesk" fontSize="10" fontWeight="700" fill="#003527" textAnchor="middle">Jun</text>
                </svg>

                {/* Tooltip */}
                <div className="absolute top-4 left-6 bg-primary/95 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xl space-y-0.5 border border-primary/20 backdrop-blur-md pointer-events-none transition-opacity duration-200">
                  <span className="text-tertiary-container block">{point.month}</span>
                  <span className="block">{point.balance}</span>
                </div>
              </div>

              {/* Bottom Status Cards */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <div className="p-4 bg-surface-low rounded-2xl flex-1 border border-primary/5 text-left transition hover:bg-surface-highest duration-200">
                  <p className="text-xs text-on-surface/60 font-semibold tracking-wide">
                    Dynamic Net Asset Value
                  </p>
                  <p className="text-2xl font-bold text-primary mt-1 tracking-tight">
                    {point.balance}
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-2xl flex-1 border border-primary/10 text-left transition hover:bg-primary/[0.08] duration-200">
                  <p className="text-xs text-on-surface/60 font-semibold tracking-wide flex items-center justify-between">
                    Goal: Own Sanctuary
                    <span className="text-[10px] bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded-full font-bold">
                      65% Met
                    </span>
                  </p>
                  <div className="w-full bg-surface h-2 rounded-full mt-2.5 overflow-hidden">
                    <div className="bg-primary h-full w-[65%] rounded-full transition-all duration-500" />
                  </div>
                </div>
              </div>

            </GlassCard>
          </div>
        </div>

      </Container>
    </section>
  );
}
