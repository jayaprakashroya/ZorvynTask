import { SummaryData, Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date('2023-10-01'),
    description: 'Grocery shopping',
    amount: -85.50,
    type: 'expense',
    category: 'Food',
    account: 'Checking',
  },
  {
    id: '2',
    date: new Date('2023-10-01'),
    description: 'Monthly Salary',
    amount: 3200.00,
    type: 'income',
    category: 'Salary',
    account: 'Checking',
  },
  {
    id: '3',
    date: new Date('2023-10-02'),
    description: 'Coffee at Starbucks',
    amount: -5.75,
    type: 'expense',
    category: 'Food',
    account: 'Credit Card',
  },
  {
    id: '4',
    date: new Date('2023-10-03'),
    description: 'Gas Station',
    amount: -45.20,
    type: 'expense',
    category: 'Transport',
    account: 'Credit Card',
  },
  {
    id: '5',
    date: new Date('2023-10-04'),
    description: 'Freelance Project',
    amount: 500.00,
    type: 'income',
    category: 'Freelance',
    account: 'Checking',
  },
  {
    id: '6',
    date: new Date('2023-10-05'),
    description: 'Electricity Bill',
    amount: -120.00,
    type: 'expense',
    category: 'Bills',
    account: 'Checking',
  },
  {
    id: '7',
    date: new Date('2023-10-06'),
    description: 'Movie Tickets',
    amount: -28.00,
    type: 'expense',
    category: 'Entertainment',
    account: 'Credit Card',
  },
  {
    id: '8',
    date: new Date('2023-10-07'),
    description: 'Online Shopping',
    amount: -156.99,
    type: 'expense',
    category: 'Shopping',
    account: 'Credit Card',
  },
  {
    id: '9',
    date: new Date('2023-10-08'),
    description: 'Gym Membership',
    amount: -49.99,
    type: 'expense',
    category: 'Health',
    account: 'Checking',
  },
  {
    id: '10',
    date: new Date('2023-10-09'),
    description: 'Uber Ride',
    amount: -18.50,
    type: 'expense',
    category: 'Transport',
    account: 'Credit Card',
  },
  {
    id: '11',
    date: new Date('2023-10-10'),
    description: 'Dividend Payment',
    amount: 75.25,
    type: 'income',
    category: 'Investment',
    account: 'Savings',
  },
  {
    id: '12',
    date: new Date('2023-10-11'),
    description: 'Restaurant Dinner',
    amount: -67.80,
    type: 'expense',
    category: 'Food',
    account: 'Credit Card',
  },
  {
    id: '13',
    date: new Date('2023-10-12'),
    description: 'Phone Bill',
    amount: -55.00,
    type: 'expense',
    category: 'Bills',
    account: 'Checking',
  },
  {
    id: '14',
    date: new Date('2023-10-13'),
    description: 'Book Purchase',
    amount: -24.99,
    type: 'expense',
    category: 'Entertainment',
    account: 'Credit Card',
  },
  {
    id: '15',
    date: new Date('2023-10-14'),
    description: 'Car Insurance',
    amount: -89.00,
    type: 'expense',
    category: 'Transport',
    account: 'Checking',
  },
  {
    id: '16',
    date: new Date('2023-10-15'),
    description: 'Bonus Payment',
    amount: 800.00,
    type: 'income',
    category: 'Salary',
    account: 'Checking',
  },
  {
    id: '17',
    date: new Date('2023-10-16'),
    description: 'Pharmacy',
    amount: -32.45,
    type: 'expense',
    category: 'Health',
    account: 'Credit Card',
  },
  {
    id: '18',
    date: new Date('2023-10-17'),
    description: 'Concert Tickets',
    amount: -95.00,
    type: 'expense',
    category: 'Entertainment',
    account: 'Credit Card',
  },
  {
    id: '19',
    date: new Date('2023-10-18'),
    description: 'ATM Withdrawal',
    amount: -100.00,
    type: 'expense',
    category: 'Cash',
    account: 'Checking',
  },
  {
    id: '20',
    date: new Date('2023-10-19'),
    description: 'Investment Return',
    amount: 150.00,
    type: 'income',
    category: 'Investment',
    account: 'Savings',
  },
  {
    id: '21',
    date: new Date('2023-10-20'),
    description: 'Supermarket',
    amount: -112.30,
    type: 'expense',
    category: 'Food',
    account: 'Credit Card',
  },
  {
    id: '22',
    date: new Date('2023-10-21'),
    description: 'Internet Bill',
    amount: -65.00,
    type: 'expense',
    category: 'Bills',
    account: 'Checking',
  },
  {
    id: '23',
    date: new Date('2023-10-22'),
    description: 'Clothing Store',
    amount: -78.50,
    type: 'expense',
    category: 'Shopping',
    account: 'Credit Card',
  },
  {
    id: '24',
    date: new Date('2023-10-23'),
    description: 'Taxi Ride',
    amount: -22.00,
    type: 'expense',
    category: 'Transport',
    account: 'Credit Card',
  },
  {
    id: '25',
    date: new Date('2023-10-24'),
    description: 'Side Hustle',
    amount: 300.00,
    type: 'income',
    category: 'Freelance',
    account: 'Checking',
  },
];

// Calculate summary data
const calculateSummary = (transactions: Transaction[]): SummaryData => {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const thisMonthIncome = transactions
    .filter(t => t.type === 'income' && t.date.getMonth() === thisMonth && t.date.getFullYear() === thisYear)
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonthExpenses = Math.abs(transactions
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

export const summaryData: SummaryData = calculateSummary(mockTransactions);