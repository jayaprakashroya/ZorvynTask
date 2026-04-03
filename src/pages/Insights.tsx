import { DollarSign, Target, TrendingUp } from 'lucide-react';
import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useFinance } from '../context/FinanceContext';

const Insights: React.FC = () => {
  const { transactions, summaryData } = useFinance();

  // Calculate insights
  const insights = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const thisMonthTransactions = transactions.filter(t =>
      t.date.getMonth() === thisMonth && t.date.getFullYear() === thisYear
    );

    const lastMonthTransactions = transactions.filter(t => {
      const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
      const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
      return t.date.getMonth() === lastMonth && t.date.getFullYear() === lastMonthYear;
    });

    // Highest spending category this month
    const categorySpending = thisMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);

    const highestCategory = Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)[0];

    // Monthly comparison
    const thisMonthIncome = thisMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const thisMonthExpenses = Math.abs(thisMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0));

    const lastMonthIncome = lastMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = Math.abs(lastMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0));

    // Biggest expense
    const biggestExpense = thisMonthTransactions
      .filter(t => t.type === 'expense')
      .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))[0];

    // Savings rate improvement
    const thisMonthSavingsRate = thisMonthIncome > 0 ? ((thisMonthIncome - thisMonthExpenses) / thisMonthIncome) * 100 : 0;
    const lastMonthSavingsRate = lastMonthIncome > 0 ? ((lastMonthIncome - lastMonthExpenses) / lastMonthIncome) * 100 : 0;
    const savingsImprovement = thisMonthSavingsRate - lastMonthSavingsRate;

    return {
      highestCategory,
      monthlyComparison: {
        thisMonth: { income: thisMonthIncome, expenses: thisMonthExpenses },
        lastMonth: { income: lastMonthIncome, expenses: lastMonthExpenses },
      },
      biggestExpense,
      savingsImprovement,
    };
  }, [transactions]);

  const monthlyComparisonData = [
    {
      month: 'Last Month',
      income: insights.monthlyComparison.lastMonth.income,
      expenses: insights.monthlyComparison.lastMonth.expenses,
    },
    {
      month: 'This Month',
      income: insights.monthlyComparison.thisMonth.income,
      expenses: insights.monthlyComparison.thisMonth.expenses,
    },
  ];

  const insightCards = [
    {
      title: 'Highest Spending Category',
      value: insights.highestCategory ? `${insights.highestCategory[0]}: $${insights.highestCategory[1].toFixed(2)}` : 'No expenses this month',
      icon: DollarSign,
      color: 'bg-red-500',
      emoji: '💸',
    },
    {
      title: 'Monthly Comparison',
      value: insights.monthlyComparison.thisMonth.expenses > insights.monthlyComparison.lastMonth.expenses
        ? `Expenses up ${(insights.monthlyComparison.thisMonth.expenses / insights.monthlyComparison.lastMonth.expenses * 100 - 100).toFixed(1)}%`
        : 'Expenses down',
      icon: TrendingUp,
      color: 'bg-blue-500',
      emoji: '📊',
    },
    {
      title: 'Biggest Expense',
      value: insights.biggestExpense ? `${insights.biggestExpense.description}: $${Math.abs(insights.biggestExpense.amount).toFixed(2)}` : 'No expenses',
      icon: Target,
      color: 'bg-orange-500',
      emoji: '🎯',
    },
    {
      title: 'Savings Rate',
      value: insights.savingsImprovement > 0
        ? `Improved by ${insights.savingsImprovement.toFixed(1)}%`
        : insights.savingsImprovement < 0
        ? `Decreased by ${Math.abs(insights.savingsImprovement).toFixed(1)}%`
        : 'No change',
      icon: TrendingUp,
      color: 'bg-green-500',
      emoji: '💰',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Insights & Analytics</h2>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insightCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-full`}>
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-2xl">{card.emoji}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{card.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Monthly Comparison Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Income vs Expenses Comparison</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: any) => [`$${value}`, '']} />
            <Bar dataKey="income" fill="#10B981" name="Income" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Transactions</span>
              <span className="font-semibold text-gray-900 dark:text-white">{transactions.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Average Transaction</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${(transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0) / transactions.length).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Most Active Category</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {Object.entries(transactions.reduce((acc, t) => {
                  acc[t.category] = (acc[t.category] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommendations</h3>
          <div className="space-y-3">
            {insights.highestCategory && insights.highestCategory[1] > 500 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Consider reducing spending in {insights.highestCategory[0]} - it's your highest expense category.
                </p>
              </div>
            )}
            {insights.savingsImprovement < 0 && (
              <div className="p-3 bg-red-50 dark:bg-red-900 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">
                  Your savings rate decreased. Try to cut back on non-essential expenses.
                </p>
              </div>
            )}
            {summaryData.totalBalance < 1000 && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your balance is getting low. Consider building an emergency fund.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;