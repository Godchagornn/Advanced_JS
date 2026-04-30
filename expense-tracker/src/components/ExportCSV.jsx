import { useExpenses } from '../context/ExpenseContext';
import styles from './ExportCSV.module.css';

function ExportCSV() {
  const { expenses } = useExpenses();

  function downloadCSV() {
    const header = ['Name', 'Amount', 'Category', 'Date'];
    const rows = expenses.map(e => [e.name, e.amount, e.category, e.date]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
  }

  return (
    <button className={styles.btn} onClick={downloadCSV}>
      Export CSV
    </button>
  );
}

export default ExportCSV;