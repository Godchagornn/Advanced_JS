import { useExpenses } from '../context/ExpenseContext';

function ExpenseSummary() {
  const { expenses, totalAmount, categories } = useExpenses();

  const byCategory = categories.reduce((acc, cat) => {
    const total = expenses
      .filter(e => e.category === cat)
      .reduce((s, e) => s + e.amount, 0);

    if (total > 0) acc[cat] = total;
    return acc;
  }, {});

  return (
    <div className="summary">
  <h3>Total: ${totalAmount.toFixed(2)}</h3>
  <div className="summary-meta">
    {expenses.length} transactions
  </div>

  {Object.entries(byCategory).map(([cat, amt]) => (
    <div className="summary-row" key={cat}>
      <span className="cat-label">{cat}</span>
      <span className="cat-amount">${amt.toFixed(2)}</span>
    </div>
  ))}
</div>
  );
}

export default ExpenseSummary;