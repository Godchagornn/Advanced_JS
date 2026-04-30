import { useExpenses } from '../context/ExpenseContext';
import styles from './Budget.module.css';

function Budget() {
  const { budget, setBudget, percentUsed } = useExpenses();

  return (
    <div className={styles.card}>
      <h3>Budget</h3>

      <input
        className={styles.input}
        type="number"
        value={budget}
        onChange={e => setBudget(Number(e.target.value))}
      />

      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${percentUsed}%` }} />
      </div>

      <p>{percentUsed.toFixed(2)}%</p>
    </div>
  );
}

export default Budget;