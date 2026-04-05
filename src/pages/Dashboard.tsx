import { DollarSign, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react';
import React, { useMemo } from 'react';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CardSkeleton, { ChartSkeleton } from '../components/common/Skeleton';
import { useFinance } from '../context/FinanceContext';
import { CHART_COLORS } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { summaryData, transactions } = useFinance();

  // Prepare data for balance trend chart (last 6 months)
  const balanceTrendData = useMemo(() => [
    { month: 'May', balance: 12500 },
    { month: 'Jun', balance: 13200 },
    { month: 'Jul', balance: 12800 },
    { month: 'Aug', balance: 14100 },
    { month: 'Sep', balance: 13800 },
    { month: 'Oct', balance: summaryData.totalBalance },
  ], [summaryData.totalBalance]);

  // Prepare data for spending breakdown
  const pieData = useMemo(() => {
    const categorySpending = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(categorySpending).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));
  }, [transactions]);

  const recentTransactions = useMemo(() =>
    transactions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5),
    [transactions]
  );

  const summaryCards = [
    {
      title: 'Total Balance',
      value: formatCurrency(summaryData.totalBalance),
      icon: DollarSign,
      color: 'bg-gradient-to-br from-sky-500 to-cyan-500',
      trend: summaryData.totalBalance >= 0 ? 'positive' : 'negative',
    },
    {
      title: 'Total Income',
      value: formatCurrency(summaryData.totalIncome),
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-emerald-500 to-teal-400',
      trend: 'positive',
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(summaryData.totalExpenses),
      icon: TrendingDown,
      color: 'bg-gradient-to-br from-red-500 to-orange-500',
      trend: 'negative',
    },
    {
      title: 'Savings Rate',
      value: summaryData.totalIncome > 0
        ? `${((summaryData.totalIncome - summaryData.totalExpenses) / summaryData.totalIncome * 100).toFixed(1)}%`
        : '0%',
      icon: PiggyBank,
      color: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
      trend: (summaryData.totalIncome - summaryData.totalExpenses) >= 0 ? 'positive' : 'negative',
    },
  ];

  if (!transactions.length) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/30 p-6 hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{card.title}</p>
                  <p className={`text-2xl font-bold ${
                    card.trend === 'positive' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-full shadow-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Trend */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/30 p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Balance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={balanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="month"
                className="text-gray-600 dark:text-gray-400"
              />
              <YAxis
                className="text-gray-600 dark:text-gray-400"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                formatter={(value: any) => [formatCurrency(value as number), 'Balance']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Breakdown */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/30 p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Spending Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [formatCurrency(value as number), 'Amount']}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/30 p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-950/80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.category}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;