import { DateFilter, SummaryData, Transaction, TransactionType } from '../types';
import { TRANSACTION_TYPES } from './constants';

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Format date for input fields
 */
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

/**
 * Get date range for filtering
 */
export const getDateRange = (filter: DateFilter): { start: Date; end: Date } | null => {
  const now = new Date();

  switch (filter) {
    case 'thisMonth':
      return {
        start: new Date(now.getFullYear(), now.getMonth(), 1),
        end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
      };
    case 'last3Months':
      return {
        start: new Date(now.getFullYear(), now.getMonth() - 3, 1),
        end: now,
      };
    default:
      return null;
  }
};

/**
 * Filter transactions by date range
 */
export const filterTransactionsByDate = (
  transactions: Transaction[],
  dateFilter: DateFilter
): Transaction[] => {
  const dateRange = getDateRange(dateFilter);
  if (!dateRange) return transactions;

  return transactions.filter(
    (transaction) =>
      transaction.date >= dateRange.start && transaction.date <= dateRange.end
  );
};

/**
 * Calculate summary data from transactions
 */
export const calculateSummaryData = (transactions: Transaction[]): SummaryData => {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const totalIncome = transactions
    .filter((t) => t.type === TRANSACTION_TYPES.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(
    transactions
      .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const thisMonthIncome = transactions
    .filter(
      (t) =>
        t.type === TRANSACTION_TYPES.INCOME &&
        t.date.getMonth() === thisMonth &&
        t.date.getFullYear() === thisYear
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonthExpenses = Math.abs(
    transactions
      .filter(
        (t) =>
          t.type === TRANSACTION_TYPES.EXPENSE &&
          t.date.getMonth() === thisMonth &&
          t.date.getFullYear() === thisYear
      )
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const totalBalance = totalIncome - totalExpenses;

  return {
    totalBalance,
    totalIncome,
    totalExpenses,
    thisMonthIncome,
    thisMonthExpenses,
  };
};

/**
 * Get category spending breakdown
 */
export const getCategoryBreakdown = (
  transactions: Transaction[],
  type: TransactionType = TRANSACTION_TYPES.EXPENSE
): Record<string, number> => {
  return transactions
    .filter((t) => t.type === type)
    .reduce((acc, t) => {
      const amount = type === TRANSACTION_TYPES.EXPENSE ? Math.abs(t.amount) : t.amount;
      acc[t.category] = (acc[t.category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);
};

/**
 * Get top spending categories
 */
export const getTopCategories = (
  transactions: Transaction[],
  limit: number = 5,
  type: TransactionType = TRANSACTION_TYPES.EXPENSE
): Array<{ category: string; amount: number }> => {
  const breakdown = getCategoryBreakdown(transactions, type);

  return Object.entries(breakdown)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: number;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Validate transaction data
 */
export const validateTransaction = (transaction: Partial<Transaction>): string[] => {
  const errors: string[] = [];

  if (!transaction.description?.trim()) {
    errors.push('Description is required');
  }

  if (!transaction.amount || transaction.amount === 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!transaction.category?.trim()) {
    errors.push('Category is required');
  }

  if (!transaction.type || !Object.values(TRANSACTION_TYPES).includes(transaction.type)) {
    errors.push('Valid transaction type is required');
  }

  if (!transaction.date) {
    errors.push('Date is required');
  }

  return errors;
};

/**
 * Export transactions to CSV
 */
export const exportToCSV = (transactions: Transaction[]): void => {
  const headers = ['Date', 'Description', 'Amount', 'Type', 'Category', 'Account'];
  const csvContent = [
    headers.join(','),
    ...transactions.map((t) => [
      formatDateForInput(t.date),
      `"${t.description.replace(/"/g, '""')}"`,
      t.amount,
      t.type,
      t.category,
      t.account || '',
    ].join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};