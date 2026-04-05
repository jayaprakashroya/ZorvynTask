# Finance Dashboard

A modern, professional Finance Dashboard UI application built with React 18, TypeScript, and Tailwind CSS. This is a feature-rich personal finance management dashboard with role-based access control, dark mode support, and comprehensive financial analytics.

**Author:** Jaya Prakash Roya

**Status:** ✅ Production-Ready | Version 1.0.0

## 🎯 Key Features

### Core Dashboard
- **Summary Cards** - Total Balance, Income, Expenses, and Savings Rate with animated hover effects
- **Balance Trend Chart** - 6-month balance history visualization using Recharts
- **Spending Breakdown** - Interactive pie chart showing expense distribution by category
- **Recent Transactions** - Quick view of the latest 5 transactions

### Transactions Management
- **Full Transaction List** - Comprehensive table of all transactions with detailed information
- **Advanced Filtering** - Filter by type (Income/Expense), category, date range
- **Search Functionality** - Real-time search by transaction description
- **Sorting Options** - Sort by date (newest/oldest) or amount
- **Admin Actions** - Add, edit, and delete transactions (Admin role only)
- **Role-Based Visibility** - View-only mode for Viewer role

### Analytics & Insights
- **Smart Insights Cards** - Dynamic recommendations based on spending patterns
- **Monthly Comparison** - Income vs Expense bar chart
- **Category Analysis** - Highest spending category and biggest expense tracker
- **Savings Rate Tracking** - Month-over-month savings rate comparison
- **Recommendations Engine** - Contextual financial tips and alerts

### User Experience
- **Responsive Navigation** - Mobile-friendly collapsible sidebar
- **Dark Mode Support** - Toggle between light and dark themes with Tailwind CSS
- **Role Switching** - Switch between Admin and Viewer roles to simulate access control
- **Dark/Light Mode Toggle** - Persistent theme preference stored in localStorage
- **Professional UI/UX** - Clean design with smooth animations and hover effects

### Developer Features
- **Role-Based UI Simulation** - Admin role sees action buttons, Viewer role sees read-only UI
- **State Management** - React Context API for global state management
- **LocalStorage Persistence** - Transactions data and preferences persist across sessions
- **TypeScript Type Safety** - Full TypeScript support with strict mode enabled
- **Data Export** - CSV export functionality for transaction data
- **Modular Architecture** - Clean, scalable component structure

## 📁 Project Structure

```
finance-dashboard/
├── src/
│   ├── assets/          # Static assets (images, icons, etc.)
│   ├── components/
│   │   ├── common/      # Shared reusable components
│   │   ├── layout/
│   │   │   ├── Layout.tsx       # Main layout wrapper with page routing
│   │   │   ├── Header.tsx       # Top header with dark mode & role switcher
│   │   │   └── Sidebar.tsx      # Navigation sidebar (responsive)
│   │   ├── dashboard/   # Dashboard-specific components
│   │   ├── transactions/# Transaction-related components
│   │   └── insights/    # Analytics and insights components
│   ├── pages/
│   │   ├── Dashboard.tsx   # Dashboard overview with charts
│   │   ├── Transactions.tsx # Transaction list with filters
│   │   ├── Insights.tsx     # Analytics and smart insights
│   │   └── Settings.tsx     # App settings and data export
│   ├── context/
│   │   └── FinanceContext.tsx  # Global state management with useFinance hook
│   ├── data/
│   │   └── mockData.ts     # 25+ sample transactions with summary data
│   ├── hooks/           # Custom React hooks (expandable)
│   ├── types/
│   │   └── index.ts     # TypeScript interfaces & types
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global Tailwind styles
├── public/              # Public assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Dependencies & scripts
└── README.md            # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** version 16 or higher
- **npm** v7+ or **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jayaprakashroya/ZorvynTask.git
   cd finance-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to [http://localhost:5173](http://localhost:5173)
   - The app will automatically reload on file changes

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production (tsc + vite build)
npm run lint       # Run ESLint to check code quality
npm run preview    # Preview production build locally
```

## 🔧 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI library |
| **TypeScript** | 5.2.2 | Type safety |
| **Tailwind CSS** | 3.3.6 | Styling |
| **Vite** | 5.0.8 | Build tool & dev server |
| **Lucide React** | 0.344.0 | Icons (DollarSign, TrendingUp, etc.) |
| **Recharts** | 2.12.0 | Charts & visualizations |
| **ESLint** | 8.55.0 | Code linting |

## 📊 Pages & Components

### 1. **Dashboard Page** (`Dashboard.tsx`)
- **4 Summary Cards**: Total Balance, Income, Expenses, Savings Rate
- **Balance Trend Chart**: Line chart showing 6-month history
- **Spending Breakdown**: Pie chart by category
- **Recent Transactions**: Last 5 transactions table

### 2. **Transactions Page** (`Transactions.tsx`)
- Full transaction list (25+ items)
- **Filters**: Type (All/Income/Expense), Category, Date Range
- **Search**: Real-time description search
- **Sorting**: By date or amount (ascending/descending)
- **Admin Actions**: Edit/Delete buttons (Admin role only)
- **Empty State**: Graceful handling when no transactions match filters

### 3. **Insights Page** (`Insights.tsx`)
- **Insight Cards**: 
  - Highest spending category
  - Monthly comparison
  - Biggest expense
  - Savings rate change
- **Bar Chart**: Income vs Expense comparison
- **Smart Recommendations**: Contextual financial tips
- **Quick Stats**: Total transactions, average transaction, most active category

### 4. **Settings Page** (`Settings.tsx`)
- **CSV Export**: Download transactions as CSV
- **App Info**: Version, total transactions, last updated
- **Future Features**: Import functionality placeholder

## 🎭 Role-Based Access Control

### **Admin Role**
- View all dashboard data
- Add new transactions
- Edit existing transactions
- Delete transactions
- Access all features

### **Viewer Role**
- View-only access to all data
- Cannot add/edit/delete transactions
- Read-only transaction table
- Cannot modify data

**Switch Roles**: Use the role selector dropdown in the header (top-right)

## 🌙 Dark Mode

- Click the **Moon/Sun icon** in the header to toggle dark mode
- Preference is saved to localStorage
- Applies throughout the entire application using Tailwind's `dark:` prefix

## 💾 Data Persistence

All data is automatically saved to **localStorage**:
- `transactions` - Complete transaction list
- `currentRole` - Selected user role
- `darkMode` - Dark mode preference

Data persists across browser sessions.

## 📈 Sample Data

The dashboard includes **25 sample transactions** with:
- Realistic dates (October 2023)
- Multiple categories (Food, Transport, Salary, Bills, Entertainment, etc.)
- Mix of income and expense transactions
- Various amounts from $5.75 to $3200
- Associated accounts (Checking, Credit Card, Savings)

## 🔄 State Management

The app uses **React Context API** for global state management via `FinanceContext`:

```typescript
const { 
  transactions,      // All transactions
  summaryData,       // Calculated totals & summary
  currentRole,       // 'Admin' | 'Viewer'
  filters,           // Search, type, category, date filters
  darkMode,          // Dark mode enabled/disabled
  addTransaction,    // Add new transaction
  updateTransaction, // Update existing transaction
  deleteTransaction, // Delete transaction
  setCurrentRole,    // Switch role
  setFilters,        // Update filters
  toggleDarkMode,    // Toggle dark mode
} = useFinance();
```

**Custom Hook Usage:**
```typescript
import { useFinance } from '../context/FinanceContext';

function MyComponent() {
  const { transactions, currentRole } = useFinance();
  // Use context values
}
```

## 📝 TypeScript Types

Key types defined in `src/types/index.ts`:

```typescript
interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  account?: string;
}

interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  thisMonthIncome: number;
  thisMonthExpenses: number;
}
```

## 🎨 Design Features

- **Color Scheme**: Blue, green (income), red (expense), purple accents
- **Icons**: Lucide React icons throughout (DollarSign, TrendingUp, etc.)
- **Animations**: Smooth hover effects and transitions
- **Responsive**: Mobile-first design, breaks at lg (1024px)
- **Dark Mode**: Full Tailwind dark: variant support
- **Accessibility**: Semantic HTML, proper contrast ratios

## 🔐 Security & Best Practices

- ✅ StrictMode enabled for development
- ✅ No sensitive data in localStorage
- ✅ TypeScript strict mode enabled
- ✅ Unused variable detection enabled
- ✅ Proper error boundaries (recommended for enhancement)
- ✅ No hardcoded API keys or credentials

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

Generates optimized build in `dist/` directory.

### Recommended Hosting Platforms
- Vercel
- Netlify
- GitHub Pages
- AWS Amplify

## 📚 How to Extend

### Add a New Transaction Category
1. Edit `src/data/mockData.ts` and add to existing transactions
2. Categories update automatically in filters

### Add a New Page
1. Create file in `src/pages/YourPage.tsx`
2. Add case in `Layout.tsx` renderPage()
3. Add menu item to `Sidebar.tsx`

### Add a Custom Hook
1. Create file in `src/hooks/useYourHook.ts`
2. Export and use with `useFinance()` context

### Add New Charts
1. Install chart library: `npm install <chart-library>`
2. Import component in any page
3. Use `useFinance()` to access data

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Dark Mode Not Working
- Check if `dark` class is on `<html>` element
- Clear browser cache and localStorage

## 📋 Development Checklist

- [x] Project setup with Vite + React 18 + TypeScript
- [x] Tailwind CSS configuration
- [x] Component structure
- [x] Context API state management
- [x] Dashboard with charts
- [x] Transactions filtering & sorting
- [x] Insights/Analytics page
- [x] Dark mode support
- [x] Role-based UI
- [x] localStorage persistence
- [x] CSV export functionality
- [x] Responsive design
- [ ] Unit tests (can be added)
- [ ] E2E tests (can be added)
- [ ] Backend API integration (future)
- [ ] Authentication (future)

## 📖 Learning Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Recharts Documentation](https://recharts.org)
- [Lucide Icons](https://lucide.dev)

## 👤 Author

**Jaya Prakash Roya**
- GitHub: [@jayaprakashroya](https://github.com/jayaprakashroya)
- Project: [ZorvynTask](https://github.com/jayaprakashroya/ZorvynTask)

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

**Built with ❤️ for modern finance management**