import { Download, Settings as SettingsIcon, Upload } from 'lucide-react';
import React from 'react';
import { useFinance } from '../context/FinanceContext';

const Settings: React.FC = () => {
  const { transactions } = useFinance();

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Amount', 'Type', 'Category', 'Account'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        t.date.toISOString().split('T')[0],
        `"${t.description}"`,
        t.amount,
        t.type,
        t.category,
        t.account || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Data */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Download className="h-6 w-6 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Export Data</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Download your transaction data as a CSV file for backup or analysis.
          </p>
          <button
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <Download size={16} />
            Export to CSV
          </button>
        </div>

        {/* Import Data */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Upload className="h-6 w-6 text-green-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Import Data</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Import transaction data from a CSV file.
          </p>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 opacity-50 cursor-not-allowed"
            disabled
          >
            <Upload size={16} />
            Import CSV (Coming Soon)
          </button>
        </div>

        {/* App Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex items-center mb-4">
            <SettingsIcon className="h-6 w-6 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">App Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Version</p>
              <p className="font-semibold text-gray-900 dark:text-white">1.0.0</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
              <p className="font-semibold text-gray-900 dark:text-white">{transactions.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Last Updated</p>
              <p className="font-semibold text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;