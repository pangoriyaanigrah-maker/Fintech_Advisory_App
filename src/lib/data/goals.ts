import type { GoalData, GoalId } from '@/types';

export const goalsDictionary: Record<GoalId, GoalData> = {
  home: {
    title: 'Home Ownership Sanctuary Fund',
    engine: 'Aarya Personal Mortgage Strategist',
    target: '₹1.5 Crores',
    saved: '₹97.5 Lakhs',
    progress: 65,
    recommendation:
      'Increasing your monthly premium pledge contribution by ₹8,000 saves an estimated ₹4.8 Lakhs in future interest costs and reduces active debt tenure by 18 months.',
    icon: 'building',
  },
  academy: {
    title: 'Future Global Academy Basket',
    engine: 'Aarya Global Inflation-Free Edu Plan',
    target: '₹75 Lakhs',
    saved: '₹30 Lakhs',
    progress: 40,
    recommendation:
      'Allocating the current festival bonus directly into low-drag index mutual funds secures your educational targets against global inflation trends completely.',
    icon: 'landmark',
  },
  freedom: {
    title: 'Ultimate Financial Freedom Plan',
    engine: 'Zen Retirement Independent Builder',
    target: '₹4.2 Crores',
    saved: '₹92.4 Lakhs',
    progress: 22,
    recommendation:
      'Your current compounding mutual fund trajectories align perfectly with early retirement goals. Top up slightly with direct indexes for maximum safety margins.',
    icon: 'compass',
  },
};
