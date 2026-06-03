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

// Financial Analytics
export type TransactionCategory =
  | 'rent' | 'groceries' | 'insurance' | 'utilities' | 'emi'
  | 'healthcare' | 'dining' | 'shopping' | 'entertainment'
  | 'subscriptions' | 'travel' | 'personal_care' | 'education' | 'transport'

export type SpendingType = 'essential' | 'non-essential'

export type InsightSeverity = 'info' | 'warning' | 'success' | 'tip'

export interface CategorySummary {
  category: TransactionCategory
  label: string
  spent: number
  type: SpendingType
  icon: string            // lucide icon name string
}

export interface MonthlySnapshot {
  month: string           // e.g. 'June 2026'
  income: number
  totalExpenses: number
  categories: CategorySummary[]
  savingsAmount: number
  savingsRate: number     // 0-100 percentage
}

export interface BudgetEntry {
  category: TransactionCategory
  label: string
  limit: number
  type: SpendingType
  icon: string
}

export interface BudgetProgress extends BudgetEntry {
  spent: number
  remaining: number
  percentUsed: number
  isOverBudget: boolean
}

export interface FinancialInsight {
  id: string
  message: string
  severity: InsightSeverity
  category?: TransactionCategory
}

export interface HealthScoreBreakdown {
  savingsEfficiency: number   // 0-10
  budgetAdherence: number     // 0-10
  expenseRatio: number        // 0-10
  monthlyTrend: number        // 0-10
}

export interface FinancialHealthScore {
  overall: number             // 0-100
  label: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention'
  breakdown: HealthScoreBreakdown
}
