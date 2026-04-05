import { AccountType, DateFilter, TransactionCategory, TransactionType, UserRole } from '../utils/constants';

export type { AccountType, DateFilter, TransactionCategory, TransactionType, UserRole };

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  account?: AccountType;
}

export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  thisMonthIncome: number;
  thisMonthExpenses: number;
}

export interface Filters {
  searchTerm: string;
  typeFilter: 'all' | TransactionType;
  categoryFilter: string;
  dateFilter: DateFilter;
}

export interface FinanceContextType {
  transactions: Transaction[];
  summaryData: SummaryData;
  currentRole: UserRole;
  filters: Filters;
  darkMode: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setCurrentRole: (role: UserRole) => void;
  setFilters: (filters: Partial<Filters>) => void;
  toggleDarkMode: () => void;
  exportTransactions: () => void;
}

export interface InsightCard {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
  emoji: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}