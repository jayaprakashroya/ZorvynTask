// Transaction categories
export const TRANSACTION_CATEGORIES = {
  // Income categories
  SALARY: 'Salary',
  FREELANCE: 'Freelance',
  INVESTMENT: 'Investment',

  // Expense categories
  FOOD: 'Food',
  TRANSPORT: 'Transport',
  BILLS: 'Bills',
  ENTERTAINMENT: 'Entertainment',
  SHOPPING: 'Shopping',
  HEALTH: 'Health',
  CASH: 'Cash',
} as const;

export type TransactionCategory = typeof TRANSACTION_CATEGORIES[keyof typeof TRANSACTION_CATEGORIES];

// Account types
export const ACCOUNT_TYPES = {
  CHECKING: 'Checking',
  SAVINGS: 'Savings',
  CREDIT_CARD: 'Credit Card',
} as const;

export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];

// Date filter options
export const DATE_FILTERS = {
  ALL: 'all',
  THIS_MONTH: 'thisMonth',
  LAST_3_MONTHS: 'last3Months',
} as const;

export type DateFilter = typeof DATE_FILTERS[keyof typeof DATE_FILTERS];

// Transaction types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];

// User roles
export const USER_ROLES = {
  ADMIN: 'Admin',
  VIEWER: 'Viewer',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

// Color schemes for charts
export const CHART_COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#F97316', // Orange
] as const;

// Animation classes
export const ANIMATIONS = {
  FADE_IN: 'animate-fade-in',
  SLIDE_UP: 'animate-slide-up',
  SCALE_IN: 'animate-scale-in',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  TRANSACTIONS: 'transactions',
  CURRENT_ROLE: 'currentRole',
  DARK_MODE: 'darkMode',
  USER_PREFERENCES: 'userPreferences',
} as const;