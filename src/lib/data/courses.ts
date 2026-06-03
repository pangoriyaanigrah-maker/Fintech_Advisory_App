import type { CourseData, CourseId } from '@/types';

export const courseSyllabusData: Record<CourseId, CourseData> = {
  mutual: {
    title: 'Mutual Funds 101',
    duration: '6 modules • 45 mins total',
    items: [
      'Compounding mechanics & tracking decentralized asset modules.',
      'Direct vs Regular mutual paths — avoiding middleman commissions.',
      'Selecting equity/debt/gold levels in high vs low volatility seasons.',
      'Registering automated investment mandates natively.',
      'Portfolio rebalancing heuristics for Indian indices.',
      'Tactical portfolio exit policies — shields accumulated wealth.',
    ],
  },
  estate: {
    title: 'Estate Planning Essential',
    duration: '4 modules • 30 mins total',
    items: [
      'The critical role of setting clear nominees in Indian savings.',
      'Drafting legally binding digital and paper Wills.',
      'Setting up private family trusts for generational security.',
      'Evaluating standard HUF rules (Hindu Undivided Family).',
    ],
  },
  insurance: {
    title: 'Insurance Mastery',
    duration: '5 modules • 1 hour total',
    items: [
      'De-tangling Term plans vs wealth-back policies (charge leaks).',
      'Evaluating co-payments and premium riders.',
      'Safeguarding children and maternal medical portfolios.',
      'Accidental & major critical illness structures.',
      'Evaluating claim settlement ratios — the safety metric.',
    ],
  },
};
