import { useExpenses } from '../context/ExpenseContext';

const COLORS = {
  Food: '#ff9500',
  Transport: '#0077cc',
  Health: '#10b981',
  Shopping: '#ec4899',
  Entertainment: '#8b5cf6',
  Other: '#6b7280'
};

function ExpenseList() {
  const {
    filteredExpenses,
    deleteExpense,
    editExpense,
    filter,
    setFilter,
    categories
  } = useExpenses();

  return (
    <div>
      {['All', ...categories].map(cat => (
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`tab ${filter === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}

      {filteredExpenses.map(exp => (
        <div key={exp.id} className="expense-item">
          <div className="expense-left">
            <span
              className="expense-color"
              style={{ background: COLORS[exp.category] }}
            ></span>

            <div>
              <div className="expense-name">{exp.name}</div>
              <div className="expense-date">{exp.date}</div>
            </div>
          </div>

          <div className="expense-amount">
            ${exp.amount.toFixed(2)}
          </div>

          <button
            className="btn-edit"
            onClick={() => {
              const newName = prompt('Edit name', exp.name);
              const newAmount = prompt('Edit amount', exp.amount);

              if (!newName || !newAmount) return;

              editExpense({
                ...exp,
                name: newName,
                amount: parseFloat(newAmount)
              });
            }}
          >
            Edit
          </button>

          <button
            className="btn-delete"
            onClick={() => deleteExpense(exp.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;