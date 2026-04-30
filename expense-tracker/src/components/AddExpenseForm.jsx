import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

function AddExpenseForm() {
  const { addExpense, categories } = useExpenses();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return setError('Enter name');
    if (!amount || parseFloat(amount) <= 0)
      return setError('Enter amount');

    addExpense(name.trim(), amount, category, date);

    setName('');
    setAmount('');
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      {error && <p className="form-error">{error}</p>}

      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Expense name"
      />

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount"
      />

      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <button type="submit">+ Add</button>
    </form>
  );
}

export default AddExpenseForm;