export interface HeroDataPoint {
  month: string;
  balance: string;
  growth: string;
  cx: number;
  cy: number;
}

export interface AdvisorScenario {
  quote: string;
  projection: string;
  alert1: string;
  alert2: string;
}

export type AdvisorTab = 'surplus' | 'tax' | 'subs';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'aura';
  text: string;
}

export interface GoalData {
  title: string;
  engine: string;
  target: string;
  saved: string;
  progress: number;
  recommendation: string;
  icon: string;
}

export type GoalId = 'home' | 'academy' | 'freedom';

export interface CourseData {
  title: string;
  duration: string;
  items: string[];
}

export type CourseId = 'mutual' | 'estate' | 'insurance';

export interface SIPResult {
  futureValue: number;
  totalInvested: number;
  wealthGained: number;
  steps: SIPStep[];
}

export interface SIPStep {
  year: string;
  invested: number;
  total: number;
}
