import type {
  AssetClassInput,
  CashFlowRow,
  PlannerInputs,
  PlannerResult,
} from '@/types'

/**
 * Sequence of Returns Risk (SRR) projection engine.
 *
 * Pure, framework-agnostic. Given a set of planner inputs it returns the full
 * year-by-year ("age by age") cash-flow grid plus two compounded portfolio
 * tracks — one using each asset's expected return, one that "stresses" the
 * first N years with lower/negative returns before reverting to expected.
 * The compounding difference between the two is The Gap: the real rupee cost
 * of retiring (or starting) into a bad market sequence.
 */

/**
 * Default asset planner rows. The percentages are illustrative long-run,
 * India-centric assumptions — every value is overridden from the UI.
 * `icon` holds a lucide icon name string, mirroring `CategorySummary.icon`.
 */
export const DEFAULT_ASSETS: AssetClassInput[] = [
  { id: 'stocks',       label: 'Equity / Stocks',      icon: 'TrendingUp',  expectedReturn: 12, stressedReturn: -8, currentAmount: 800000, annualContribution: 240000 },
  { id: 'gold',         label: 'Gold',                 icon: 'Sparkles',    expectedReturn: 8,  stressedReturn: 2,  currentAmount: 300000, annualContribution: 60000  },
  { id: 'international', label: 'International Markets', icon: 'Compass',     expectedReturn: 11, stressedReturn: -6, currentAmount: 200000, annualContribution: 60000  },
  { id: 'fd',           label: 'Fixed Deposits',       icon: 'Building',    expectedReturn: 7,  stressedReturn: 6,  currentAmount: 400000, annualContribution: 60000  },
  { id: 'bonds',        label: 'Bonds',                icon: 'ShieldCheck', expectedReturn: 8,  stressedReturn: 5,  currentAmount: 300000, annualContribution: 60000  },
]

export const DEFAULT_PLANNER_INPUTS: PlannerInputs = {
  annualIncome: 1800000,
  annualExpenses: 1080000,        // non-healthcare expenses, today's rupees
  healthcareFirstYear: 1236000,   // ₹12.36 L healthcare in the first projected year (real)
  generalInflation: 6,            // % CPI
  medicalInflationPremium: 3,     // % above CPI → healthcare grows 9% nominal, ~3% real
  ageStarted: 55,                 // first projected row lands at age 56 (the retirement-SRR scenario)
  planningUpToAge: 85,
  stressYears: 5,
  assets: DEFAULT_ASSETS,
}

/** Fresh, deep copy of the defaults — safe to feed into a mutable store. */
export function createDefaultInputs(): PlannerInputs {
  return structuredClone(DEFAULT_PLANNER_INPUTS)
}

/** Sum of starting corpus across all asset classes. */
function sumCurrentAmount(assets: AssetClassInput[]): number {
  return assets.reduce((s, a) => s + a.currentAmount, 0)
}

/** Sum of one year's contributions across all asset classes. */
function sumAnnualContribution(assets: AssetClassInput[]): number {
  return assets.reduce((s, a) => s + a.annualContribution, 0)
}

/**
 * Build the year-by-year projection.
 *
 * Growth model (applied identically to both tracks so The Gap is driven purely
 * by the return *sequence*): each year a balance grows by its return, then that
 * year's contribution is added at year end.
 *   next = balance * (1 + rate) + contribution
 *
 * Stress window: for timeline years `1..stressYears` the stressed track uses
 * each asset's `stressedReturn`; from year `stressYears + 1` onwards it reverts
 * to `expectedReturn`. The expected track always uses `expectedReturn`.
 */
export function computePlannerProjection(inputs: PlannerInputs): PlannerResult {
  const {
    annualIncome,
    annualExpenses,
    healthcareFirstYear,
    generalInflation,
    medicalInflationPremium,
    ageStarted,
    planningUpToAge,
    stressYears,
    assets,
  } = inputs

  const years = Math.max(0, Math.round(planningUpToAge - ageStarted))
  const annualContribution = sumAnnualContribution(assets)
  const startingCapital = sumCurrentAmount(assets)

  // Year-1 (real) surplus, used for the contribution-sustainability check.
  const annualSurplus = annualIncome - annualExpenses - healthcareFirstYear

  const g = generalInflation / 100
  const healthcareGrowth = (generalInflation + medicalInflationPremium) / 100  // 9% by default

  // Per-asset running balances for each scenario.
  const expectedBalances = assets.map(a => a.currentAmount)
  const stressedBalances = assets.map(a => a.currentAmount)

  const rows: CashFlowRow[] = []
  let totalContributed = 0

  for (let year = 1; year <= years; year++) {
    const age = ageStarted + year
    const isStressYear = year <= stressYears
    const exp = year - 1  // 0 in the first projected year, so year 1 nominal === real

    // Inflate the cash-flow lines (nominal). Healthcare carries the medical premium.
    const inflationFactor = Math.pow(1 + g, exp)
    const realFactor = 1 / inflationFactor
    const income = annualIncome * inflationFactor
    const otherExpenses = annualExpenses * inflationFactor
    const healthcare = healthcareFirstYear * Math.pow(1 + healthcareGrowth, exp)
    const expenses = otherExpenses + healthcare

    assets.forEach((asset, i) => {
      const expectedRate = asset.expectedReturn / 100
      const stressedRate = (isStressYear ? asset.stressedReturn : asset.expectedReturn) / 100
      expectedBalances[i] = expectedBalances[i] * (1 + expectedRate) + asset.annualContribution
      stressedBalances[i] = stressedBalances[i] * (1 + stressedRate) + asset.annualContribution
    })

    const expectedPortfolio = expectedBalances.reduce((s, v) => s + v, 0)
    const stressedPortfolio = stressedBalances.reduce((s, v) => s + v, 0)
    totalContributed += annualContribution

    rows.push({
      age,
      year,
      income,
      otherExpenses,
      healthcare,
      expenses,
      netCashFlow: income - expenses,
      contributions: annualContribution,
      expectedPortfolio,
      stressedPortfolio,
      gap: expectedPortfolio - stressedPortfolio,
      isStressYear,
      realFactor,
    })
  }

  const finalExpected = rows.length ? rows[rows.length - 1].expectedPortfolio : startingCapital
  const finalStressed = rows.length ? rows[rows.length - 1].stressedPortfolio : startingCapital

  return {
    rows,
    finalExpected,
    finalStressed,
    finalGap: finalExpected - finalStressed,
    totalContributed,
    totalInvestedCapital: startingCapital + totalContributed,
    years,
    annualSurplus,
  }
}

/** Full rupee formatting, e.g. ₹12,40,000 (Indian grouping). */
export function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString('en-IN')}`
}

/** Compact rupee formatting for big numbers, e.g. ₹1.24 Cr / ₹45.00 L. */
export function formatINRCompact(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''
  if (abs >= 1e7) return `${sign}₹${(abs / 1e7).toFixed(2)} Cr`
  if (abs >= 1e5) return `${sign}₹${(abs / 1e5).toFixed(2)} L`
  return `${sign}₹${Math.round(abs).toLocaleString('en-IN')}`
}
