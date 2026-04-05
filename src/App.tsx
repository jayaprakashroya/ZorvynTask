import ErrorBoundary from './components/common/ErrorBoundary';
import Layout from './components/layout/Layout';
import { FinanceProvider } from './context/FinanceContext';

function App() {
  return (
    <ErrorBoundary>
      <FinanceProvider>
        <Layout />
      </FinanceProvider>
    </ErrorBoundary>
  );
}

export default App;