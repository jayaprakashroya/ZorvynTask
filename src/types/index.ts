export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  account?: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  thisMonthIncome: number;
  thisMonthExpenses: number;
}