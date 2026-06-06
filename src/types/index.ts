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

export type TransactionType = 'income' | 'expense'

/** A single logged money movement for the current month. */
export interface Transaction {
  id: string
  type: TransactionType
  category?: TransactionCategory  // expense attribution (drives budgets); omitted for income
  label: string                   // display label — expense category label or income source
  amount: number                  // always positive; `type` carries the sign
  note?: string
  date: string                    // ISO timestamp
}

/** Payload for creating a transaction (id + date are assigned by the data layer). */
export interface NewTransaction {
  type: TransactionType
  category?: TransactionCategory
  label: string
  amount: number
  note?: string
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

// Financial Planner — Sequence of Returns Risk (SRR)
export type AssetClassId = 'stocks' | 'gold' | 'international' | 'fd' | 'bonds'

export interface AssetClassInput {
  id: AssetClassId
  label: string
  icon: string                // lucide icon name string (mirrors CategorySummary.icon)
  expectedReturn: number      // expected annual return %, e.g. 12
  stressedReturn: number      // annual return % during the stress window (yrs 1..N), e.g. -8
  currentAmount: number       // starting corpus already invested in this asset (₹)
  annualContribution: number  // ongoing yearly contribution into this asset (₹)
}

export interface PlannerInputs {
  annualIncome: number          // total "what comes in" per year (₹), in today's rupees
  annualExpenses: number        // NON-healthcare "what goes out" per year (₹), today's rupees
  healthcareFirstYear: number   // healthcare spend in the FIRST projected year (₹, real / today's rupees)
  generalInflation: number      // general CPI inflation %, e.g. 6 — inflates income & other expenses
  medicalInflationPremium: number // extra % healthcare inflates ABOVE general inflation, e.g. 3 (=> 9% nominal)
  ageStarted: number            // current age / age when investing began
  planningUpToAge: number       // target age for the projection horizon, e.g. 85
  stressYears: number           // length of the SRR stress window (default 5)
  assets: AssetClassInput[]
}

export interface CashFlowRow {
  age: number
  year: number                // 1-indexed timeline year
  income: number              // rupees in (nominal — inflated at general inflation)
  otherExpenses: number       // non-healthcare expenses (nominal)
  healthcare: number          // healthcare spend (nominal — grows at general + medical premium)
  expenses: number            // total expenses out = otherExpenses + healthcare (nominal)
  netCashFlow: number         // income - expenses (nominal annual investable surplus)
  contributions: number       // total contributions into the portfolio this year
  expectedPortfolio: number   // end-of-year value under expected returns (nominal)
  stressedPortfolio: number   // end-of-year value under the stressed sequence (nominal)
  gap: number                 // expectedPortfolio - stressedPortfolio (The Gap, nominal)
  isStressYear: boolean       // true while inside the stress window
  realFactor: number          // multiply any nominal column by this to view it in real (today's) rupees
}

export interface PlannerResult {
  rows: CashFlowRow[]
  finalExpected: number        // ending value, expected track
  finalStressed: number        // ending value, stressed track
  finalGap: number             // finalExpected - finalStressed (cost of bad sequence)
  totalContributed: number     // sum of all contributions over the horizon
  totalInvestedCapital: number // starting corpus + total contributions
  years: number                // length of the projection horizon
  annualSurplus: number        // income - expenses
}
