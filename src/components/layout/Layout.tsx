import React, { useState } from 'react';
import Dashboard from '../../pages/Dashboard';
import Insights from '../../pages/Insights';
import Settings from '../../pages/Settings';
import Transactions from '../../pages/Transactions';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'insights':
        return <Insights />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <div className="flex flex-1 flex-col lg:pl-0">
          <Header />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;