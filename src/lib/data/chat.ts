export const chatPresets: Record<string, string> = {
  'Am I inflation protected?':
    "Analyzing database metrics... Your active asset allocation is roughly 65% in equities (primary index mutual funds) and 15% in hedge gold. Historically, this allocation safely protects your long-term purchasing power against the projected 5.2% Indian CPI inflation rate with a positive buffer safety margin of +4.1%.",
  'Explain direct vs regular mutual funds':
    "Direct mutual funds skip distributor/middleman commissions entirely. Moving your existing mutual portfolio from 'Regular' paths to commission-free 'Direct' paths through our registered zero-drag ledger saves you up to 1.1% in annual expense fees—retaining an additional ₹2.8 Lakhs on average over a 15-year holding horizon.",
  'How to rebalance my ₹15k surplus?':
    "Moving your ₹15,000 monthly active surplus into your 'Home Ownership Fund' is highly calculated. It shortens your mortgage payout schedule by roughly 3.5 months, locks in reliable compound returns, and satisfies index metrics.",
  inflation:
    'Equities and index baskets consistently lock in returns beating long-term inflation. Gold allocations provide hedge safety during volatile asset resets.',
  direct:
    'By investing directly via Direct Mutual Funds, you bypass active agent commissions, allowing 100% of your money to build asset compounding value.',
}

export const PREDEFINED_QUESTIONS: string[] = [
  'Am I inflation protected?',
  'Direct vs regular funds',
  'How to rebalance surplus?',
]

export function resolveAnswer(text: string): string {
  const query = text.toLowerCase()

  if (chatPresets[text]) {
    return chatPresets[text]
  }

  // Predefined question chip mappings
  if (text === 'Direct vs regular funds') {
    return chatPresets['Explain direct vs regular mutual funds']
  }
  if (text === 'How to rebalance surplus?') {
    return chatPresets['How to rebalance my ₹15k surplus?']
  }

  // Keyword fallbacks
  if (query.includes('inflation') || query.includes('protect')) {
    return chatPresets['Am I inflation protected?']
  }
  if (query.includes('direct') || query.includes('regular')) {
    return chatPresets['Explain direct vs regular mutual funds']
  }
  if (query.includes('rebalance') || query.includes('surplus')) {
    return chatPresets['How to rebalance my ₹15k surplus?']
  }

  return 'Checking advisor structures... Your query has been mapped against index thresholds. Aura suggests sticking to Direct SIP allocations to keep portfolio drag close to zero.'
}
