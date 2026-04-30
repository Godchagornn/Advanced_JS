import { useExpenses } from '../context/ExpenseContext';

function Budget() {
  const { budget, setBudget, percentUsed } = useExpenses();

  return (
    <div className="budget-card">
      <h3>Monthly Budget</h3>

      <input
        type="number"
        value={budget}
        onChange={e => setBudget(Number(e.target.value))}
      />

      <div className="budget-progress">
        <div
          className="budget-bar"
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      <p className="budget-label">
        {percentUsed.toFixed(2)}% used
      </p>
    </div>
  );
}

export default Budget;