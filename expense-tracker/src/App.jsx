import { Routes, Route, Link } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import Budget from './components/Budget';
import ExportCSV from './components/ExportCSV';
import ExpenseChart from './components/ExpenseChart';
import './App.css';

function Dashboard() {
  return (
    <>
      <AddExpenseForm />
      <ExpenseList />
    </>
  );
}

function ChartPage() {
  return (
    <>
      <div className="chart-header">
        <ExportCSV />
      </div>

      <div className="chart-card">
        <ExpenseChart />
      </div>
    </>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <div className="app">
        <h1>Expense Tracker</h1>

        <div style={{ marginBottom: 20 }}>
          <Link className="tab" to="/">Dashboard</Link>
          <Link className="tab" to="/chart">Chart</Link>
        </div>

        <div className="main-layout">
          <aside>
            <Budget />
            <ExpenseSummary />
          </aside>

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;