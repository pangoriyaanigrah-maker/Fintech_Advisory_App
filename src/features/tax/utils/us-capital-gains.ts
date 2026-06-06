/**
 * US (foreign-listed) equity capital-gains tax for an Indian resident investor.
 *
 * Pure, framework-agnostic. Encodes the current Indian rules for gains on
 * foreign-listed shares (e.g. US stocks / international funds taxed as
 * unlisted/foreign equity):
 *
 *   • Short-Term Capital Gain (STCG) — holding period 24 months or less
 *       → taxed at the investor's normal income-tax SLAB rate (5% / 20% / 30% …).
 *   • Long-Term Capital Gain (LTCG)  — holding period MORE THAN 24 months
 *       → taxed at a flat 12.5% WITHOUT indexation (post-23 Jul 2024 rules).
 *
 * Notes / scope:
 *   - Amounts are assumed already in INR (convert FX before calling).
 *   - Surcharge and the 4% health & education cess are NOT applied here — this
 *     returns the base tax so the UI can show the headline rate transparently.
 *   - Capital LOSSES return zero tax (loss set-off / carry-forward is out of scope).
 */

export type GainTerm = 'short' | 'long'

/** Boundary: > 24 months is long-term for foreign-listed shares. */
export const LTCG_THRESHOLD_MONTHS = 24

/** Flat LTCG rate (%) without indexation for foreign-listed shares. */
export const LTCG_RATE_PERCENT = 12.5

export interface USCapitalGainsInput {
  /** Cost basis / amount invested, in INR. */
  purchaseAmount: number
  /** Sale proceeds, in INR. */
  saleAmount: number
  /** Holding period in months. */
  holdingMonths: number
  /** Investor's marginal income-tax slab rate (%) — used for STCG only. */
  marginalSlabRate: number
}

export interface USCapitalGainsResult {
  /** Realised gain (0 if the position is at a loss). */
  gain: number
  /** Whether the gain is short- or long-term. */
  term: GainTerm
  /** Tax rate (%) actually applied. */
  taxRatePercent: number
  /** Base tax due in INR (before surcharge/cess). */
  taxDue: number
  /** Sale proceeds net of the computed tax. */
  netProceeds: number
  /** Human-readable description of the rule applied. */
  rule: string
}

export function computeUSCapitalGainsTax(input: USCapitalGainsInput): USCapitalGainsResult {
  const gain = Math.max(0, input.saleAmount - input.purchaseAmount)
  const isLongTerm = input.holdingMonths > LTCG_THRESHOLD_MONTHS
  const term: GainTerm = isLongTerm ? 'long' : 'short'

  const taxRatePercent = isLongTerm ? LTCG_RATE_PERCENT : input.marginalSlabRate
  const taxDue = gain * (taxRatePercent / 100)

  const rule = isLongTerm
    ? `LTCG · held > ${LTCG_THRESHOLD_MONTHS} months · flat ${LTCG_RATE_PERCENT}% without indexation`
    : `STCG · held ≤ ${LTCG_THRESHOLD_MONTHS} months · taxed at ${input.marginalSlabRate}% slab rate`

  return {
    gain,
    term,
    taxRatePercent,
    taxDue,
    netProceeds: input.saleAmount - taxDue,
    rule,
  }
}
