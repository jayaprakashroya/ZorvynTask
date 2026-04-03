import Layout from './components/layout/Layout'
import { FinanceProvider } from './context/FinanceContext'

function App() {
  return (
    <FinanceProvider>
      <Layout />
    </FinanceProvider>
  )
}

export default App