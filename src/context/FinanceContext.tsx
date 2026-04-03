import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { mockTransactions } from '../data/mockData';
import { SummaryData, Transaction } from '../types';

type Role = 'Viewer' | 'Admin';

interface Filters {
  searchTerm: string;
  typeFilter: 'all' | 'income' | 'expense';
  categoryFilter: string;
  dateFilter: 'all' | 'thisMonth' | 'last3Months';
}

interface FinanceContextType {
  transactions: Transaction[];
  summaryData: SummaryData;
  currentRole: Role;
  filters: Filters;
  darkMode: boolean;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setCurrentRole: (role: Role) => void;
  setFilters: (filters: Partial<Filters>) => void;
  toggleDarkMode: () => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
};

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved).map((t: any) => ({ ...t, date: new Date(t.date) })) : mockTransactions;
  });

  const [currentRole, setCurrentRole] = useState<Role>(() => {
    const saved = localStorage.getItem('currentRole');
    return (saved as Role) || 'Admin';
  });

  const [filters, setFiltersState] = useState<Filters>({
    searchTerm: '',
    typeFilter: 'all',
    categoryFilter: 'all',
    dateFilter: 'all',
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Calculate summary data
  const calculateSummary = (txns: Transaction[]): SummaryData => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const totalIncome = txns
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = Math.abs(txns
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0));

    const thisMonthIncome = txns
      .filter(t => t.type === 'income' && t.date.getMonth() === thisMonth && t.date.getFullYear() === thisYear)
      .reduce((sum, t) => sum + t.amount, 0);

    const thisMonthExpenses = Math.abs(txns
      .filter(t => t.type === 'expense' && t.date.getMonth() === thisMonth && t.date.getFullYear() === thisYear)
      .reduce((sum, t) => sum + t.amount, 0));

    const totalBalance = totalIncome - totalExpenses;

    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      thisMonthIncome,
      thisMonthExpenses,
    };
  };

  const currentSummaryData = calculateSummary(transactions);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('currentRole', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const updateTransaction = (id: string, updatedFields: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => t.id === id ? { ...t, ...updatedFields } : t)
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const setFilters = (newFilters: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const value: FinanceContextType = {
    transactions,
    summaryData: currentSummaryData,
    currentRole,
    filters,
    darkMode,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setCurrentRole,
    setFilters,
    toggleDarkMode,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};