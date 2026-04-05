import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { mockTransactions } from '../data/mockData';
import { Filters, FinanceContextType, Transaction, UserRole } from '../types';
import { DATE_FILTERS, STORAGE_KEYS, USER_ROLES } from '../utils/constants';
import { calculateSummaryData, exportToCSV, generateId, validateTransaction } from '../utils/helpers';

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
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved).map((t: any) => ({ ...t, date: new Date(t.date) })) : mockTransactions;
    } catch (error) {
      console.error('Error loading transactions from localStorage:', error);
      return mockTransactions;
    }
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE);
      return (saved as UserRole) || USER_ROLES.ADMIN;
    } catch (error) {
      console.error('Error loading role from localStorage:', error);
      return USER_ROLES.ADMIN;
    }
  });

  const [filters, setFiltersState] = useState<Filters>({
    searchTerm: '',
    typeFilter: 'all',
    categoryFilter: 'all',
    dateFilter: DATE_FILTERS.ALL,
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      return saved ? JSON.parse(saved) : false;
    } catch (error) {
      console.error('Error loading dark mode from localStorage:', error);
      return false;
    }
  });

  // Memoized summary data calculation
  const summaryData = useMemo(() => calculateSummaryData(transactions), [transactions]);

  // Persist transactions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions to localStorage:', error);
    }
  }, [transactions]);

  // Persist role to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, currentRole);
    } catch (error) {
      console.error('Error saving role to localStorage:', error);
    }
  }, [currentRole]);

  // Handle dark mode
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode));
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error saving dark mode to localStorage:', error);
    }
  }, [darkMode]);

  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
    };

    const errors = validateTransaction(newTransaction);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }

    setTransactions(prev => [...prev, newTransaction]);
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev =>
      prev.map(t => {
        if (t.id === id) {
          const updatedTransaction = { ...t, ...updates };
          const errors = validateTransaction(updatedTransaction);
          if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.join(', ')}`);
          }
          return updatedTransaction;
        }
        return t;
      })
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const setFilters = useCallback((newFilters: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const exportTransactions = useCallback(() => {
    exportToCSV(transactions);
  }, [transactions]);

  const value: FinanceContextType = useMemo(() => ({
    transactions,
    summaryData,
    currentRole,
    filters,
    darkMode,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setCurrentRole,
    setFilters,
    toggleDarkMode,
    exportTransactions,
  }), [
    transactions,
    summaryData,
    currentRole,
    filters,
    darkMode,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setFilters,
    toggleDarkMode,
    exportTransactions,
  ]);

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};