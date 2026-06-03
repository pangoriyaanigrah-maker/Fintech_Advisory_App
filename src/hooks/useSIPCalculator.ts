'use client';

import { useMemo, useState } from 'react';
import type { SIPResult, SIPStep } from '@/types';

function computeSIP(amount: number, tenure: number, rate: number): SIPResult {
  const r = rate / 100 / 12;
  const n = tenure * 12;

  const futureValue = amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const totalInvested = amount * n;
  const wealthGained = Math.max(0, futureValue - totalInvested);

  const steps: SIPStep[] = [];
  const interval = Math.max(1, Math.round(tenure / 6));

  for (let yr = 1; yr <= tenure; yr += interval) {
    const yrMonths = yr * 12;
    const colFutureValue = amount * ((Math.pow(1 + r, yrMonths) - 1) / r) * (1 + r);
    const colInvested = amount * yrMonths;
    steps.push({ year: `Yr ${yr}`, invested: colInvested, total: colFutureValue });
  }

  // Ensure final year is included
  if (steps.length === 0 || steps[steps.length - 1].year !== `Yr ${tenure}`) {
    steps.push({ year: `Yr ${tenure}`, invested: totalInvested, total: futureValue });
  }

  return { futureValue, totalInvested, wealthGained, steps };
}

export function useSIPCalculator() {
  const [amount, setAmount] = useState(25000);
  const [tenure, setTenure] = useState(15);
  const [rate, setRate] = useState(12);

  const result = useMemo<SIPResult>(
    () => computeSIP(amount, tenure, rate),
    [amount, tenure, rate]
  );

  return {
    amount,
    tenure,
    rate,
    setAmount,
    setTenure,
    setRate,
    result,
  };
}
