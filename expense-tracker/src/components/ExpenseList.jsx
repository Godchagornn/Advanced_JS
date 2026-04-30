import { useExpenses } from '../context/ExpenseContext';
import styles from './ExpenseList.module.css';

function ExpenseList() {
  const { filteredExpenses, deleteExpense, filter, setFilter, categories, categoryColors } = useExpenses();

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`${styles.tab} ${filter === cat ? styles.active : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredExpenses.map(exp => (
        <div key={exp.id} className={styles.item}>
          <div className={styles.left}>
            <span className={styles.color} style={{ background: categoryColors[exp.category] }} />
            <div>
              <div className={styles.name}>{exp.name}</div>
              <div className={styles.date}>{exp.date}</div>
            </div>
          </div>

          <div className={styles.amount}>${exp.amount.toFixed(2)}</div>

          <div className={styles.actions}>
            <button onClick={() => deleteExpense(exp.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;