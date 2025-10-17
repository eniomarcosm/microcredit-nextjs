
import { DollarSign, CreditCard, Activity, PiggyBank, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export type IconType = typeof DollarSign | typeof CreditCard | typeof Activity | typeof PiggyBank;
export type TrendIconType = typeof TrendingUp | typeof ArrowUpRight | typeof ArrowDownRight;

export interface StatsData {
  totalPortfolio: number;
  totalPortfolioTrend: number;
  activeLoans: number;
  loansDisbursedThisMonth: number;
  overdueLoans: number;
  overduePercentage: number;
  recoveryRate: number;
  recoveryTrend: number;
}

export interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: IconType;
  valueColor?: string;
  trendIcon: TrendIconType;
  trendColor: string;
}

// --- Tipos para LoanCharts ---

// Cores para os gráficos de status (mantidas no types.ts pois são globais para o contexto do dashboard)
export const COLORS = {
  active: "#10b981", // green-500
  paid: "#3b82f6", // blue-500
  overdue: "#ef4444", // red-500
  pending: "#f59e0b", // amber-500
  defaulted: "#6b7280", // gray-500
};

export interface LoanTypeData {
  type: string;
  count: number;
  value: number;
}
export interface LoanStatusData {
  status: keyof typeof COLORS;
  value: number;
  label: string;
}
export interface MonthlyDisbursementData {
  month: string;
  amount: number;
  loans: number;
}

export interface LoanChartsProps {
  loanTypeData: LoanTypeData[];
  loanStatusData: LoanStatusData[];
  monthlyDisbursement: MonthlyDisbursementData[];
  loading: boolean;
}

// --- Tipos para TopBranchesList ---

export interface BranchData {
  branch: string;
  loans: number;
  amount: number;
}

export interface TopBranchesListProps {
  data: BranchData[];
  loading: boolean;
}


import { Loan } from "@/lib/dummyData";

export interface RecentLoanEntry extends Loan {
    clientName: string; // Adicionado para a exibição na tabela
}

export interface RecentLoansTableProps {
  recentLoans: RecentLoanEntry[];
  loading: boolean;
  onRefresh: () => void;
}