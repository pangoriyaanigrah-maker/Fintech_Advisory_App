import type { AdvisorScenario, AdvisorTab } from '@/types';

export const advisorScenarios: Record<AdvisorTab, AdvisorScenario> = {
  surplus: {
    quote:
      "Ananya, you have a surplus of ₹15,000 this month. I recommend moving this to your 'Milan Dream Home' fund to hit your target 3 months early.",
    projection:
      'Accelerates Home Ownership index milestone by 90 days with positive compound momentum.',
    alert1: 'Auto-allocation recommendation triggers zero charge transaction.',
    alert2: 'Saved ₹1,200 in wasteful subscription renewals this billing period.',
  },
  tax: {
    quote:
      'Ananya, you are ₹32,000 short of your Section 80C tax deduction limit. Depositing this in ELSS now saves ₹9,600 in taxes instantly.',
    projection:
      'Adds up to ₹48,000 in compound savings over 5 years via optimized tax baskets.',
    alert1: 'ELSS allocation recommended matches lowest expense ratio (0.18%).',
    alert2: 'Form 16 automatic pre-fill sync ready for submission.',
  },
  subs: {
    quote:
      "Ananya, I flagged 3 duplicate cloud storage plans billing you. Deactivating them instantly saves ₹19,800 annually, pushing your Wealth score to perfect.",
    projection:
      "Frees up fresh active cash flow immediately for your 'Future Academy' child plan.",
    alert1: 'Flagged duplicate storage plans and inactive audio platform memberships.',
    alert2: 'Reallocated capital boosts monthly structural savings rate by 4.2%.',
  },
};
