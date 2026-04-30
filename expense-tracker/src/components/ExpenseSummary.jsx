import { useExpenses } from '../context/ExpenseContext';
import styles from './ExpenseSummary.module.css';

function ExpenseSummary() {
  const { expenses, totalAmount, categories, categoryColors } = useExpenses();

  const byCategory = categories.reduce((acc, cat) => {
    const total = expenses
      .filter(e => e.category === cat)
      .reduce((s, e) => s + e.amount, 0);
    if (total > 0) acc[cat] = total;
    return acc;
  }, {});

  return (
    <div className={styles.card}>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <p>{expenses.length} transactions</p>

      {Object.entries(byCategory).map(([cat, amt]) => (
        <div className={styles.row} key={cat}>
          <span>
            <span style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: categoryColors[cat],
              flexShrink: 0,
            }} />
            {cat}
          </span>
          <span>${amt.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
}

export default ExpenseSummary;