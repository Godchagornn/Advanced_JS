import { Routes, Route, NavLink } from 'react-router-dom';
import { ExpenseProvider } from './context/ExpenseContext';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import Budget from './components/Budget';
import ExportCSV from './components/ExportCSV';
import ExpenseChart from './components/ExpenseChart';
import styles from './App.module.css';

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
      <div className={styles.chartHeader}>
        <ExportCSV />
      </div>
      <div className={styles.chartCard}>
        <ExpenseChart />
      </div>
    </>
  );
}

function App() {
  return (
    <ExpenseProvider>
      <div className={styles.app}>
        
        <h1>Expense Tracker</h1>

        <div className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/chart"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            Chart
          </NavLink>
        </div>

        <div className={styles.layout}>
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