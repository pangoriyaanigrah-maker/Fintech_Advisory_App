'use client';

import { useMemo, useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import {
  computeUSCapitalGainsTax,
  LTCG_THRESHOLD_MONTHS,
} from '@/features/tax/utils/us-capital-gains';
import { formatINR } from '@/features/planner/utils/projection';
import { GlassCard } from '@/components/ui/glass-card';
import { NumberField } from '@/components/ui/number-field';
import { AnimatedWrapper } from '@/components/motion/animated-wrapper';

const SLAB_RATES = [5, 20, 30];

/**
 * US / foreign-listed equity capital-gains tax calculator for Indian residents.
 * STCG (≤ 24 months) → slab rate; LTCG (> 24 months) → flat 12.5% without indexation.
 */
export default function UsCapitalGainsCalculator() {
  const [purchaseAmount, setPurchaseAmount] = useState(500000);
  const [saleAmount, setSaleAmount] = useState(900000);
  const [holdingMonths, setHoldingMonths] = useState(30);
  const [marginalSlabRate, setMarginalSlabRate] = useState(30);

  const result = useMemo(
    () => computeUSCapitalGainsTax({ purchaseAmount, saleAmount, holdingMonths, marginalSlabRate }),
    [purchaseAmount, saleAmount, holdingMonths, marginalSlabRate]
  );

  const isLong = result.term === 'long';

  return (
    <AnimatedWrapper preset="slideUp">
    <GlassCard padding="lg" rounded="2xl" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-primary/5 pb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-serif text-lg font-bold text-primary">US Investment — Capital Gains Tax</h4>
          <p className="text-[11px] text-tertiary font-bold uppercase tracking-widest">
            Foreign-listed shares · Indian resident
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inputs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NumberField label="Amount Invested" prefix="₹" step={10000} min={0} value={purchaseAmount} onChange={setPurchaseAmount} />
            <NumberField label="Sale Value" prefix="₹" step={10000} min={0} value={saleAmount} onChange={setSaleAmount} />
            <NumberField label="Holding Period" suffix="mo" step={1} min={0} value={holdingMonths} onChange={setHoldingMonths} />
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-primary uppercase tracking-wider">
                Your Income-Tax Slab
              </label>
              <div className="flex bg-surface-low rounded-xl p-1 border border-primary/10">
                {SLAB_RATES.map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setMarginalSlabRate(rate)}
                    className={[
                      'flex-1 text-xs font-bold py-2 rounded-lg transition-colors',
                      marginalSlabRate === rate ? 'bg-primary text-white' : 'text-on-surface/65 hover:text-primary',
                    ].join(' ')}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="flex items-start gap-2 text-[11px] text-on-surface/55 leading-relaxed">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-tertiary" />
            Held more than {LTCG_THRESHOLD_MONTHS} months = LTCG at a flat 12.5% (no indexation).
            {' '}Held {LTCG_THRESHOLD_MONTHS} months or less = STCG at your slab rate. Surcharge &amp; 4% cess excluded.
          </p>
        </div>

        {/* Result */}
        <div className="lg:col-span-5">
          <div className="p-5 bg-surface-lowest rounded-2xl border border-primary/5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65">Gain</span>
              <span className="font-bold text-primary">{formatINR(result.gain)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65">Classification</span>
              <span
                className={[
                  'text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full',
                  isLong ? 'bg-primary/10 text-primary' : 'bg-tertiary-container/20 text-tertiary',
                ].join(' ')}
              >
                {isLong ? 'LTCG' : 'STCG'} · {result.taxRatePercent}%
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-primary/5 pt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65">Tax Due</span>
              <span className="font-serif text-2xl font-extrabold text-error">{formatINR(result.taxDue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface/65">Net Proceeds</span>
              <span className="font-bold text-primary">{formatINR(result.netProceeds)}</span>
            </div>
            <p className="text-[11px] text-on-surface/65 font-semibold pt-1">{result.rule}</p>
          </div>
        </div>
      </div>
    </GlassCard>
    </AnimatedWrapper>
  );
}
