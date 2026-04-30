import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import styles from './AddExpenseForm.module.css';

function AddExpenseForm() {
  const { addExpense, categories } = useExpenses();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError('Please enter the expense name.');
    if (!amount || parseFloat(amount) <= 0) return setError('Please enter a valid amount.');

    addExpense(name, amount, category, date);
    setName('');
    setAmount('');
    setError('');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}

      <input
        className={styles.input}
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className={styles.input}
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        min="0"
      />
      <select
        className={styles.input}
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        {categories.map(c => <option key={c}>{c}</option>)}
      </select>
      <input
        className={styles.input}
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <button className={styles.btn} type="submit">+ Add</button>
    </form>
  );
}

export default AddExpenseForm;