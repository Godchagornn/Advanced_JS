import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { useExpenses } from '../context/ExpenseContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ExpenseChart() {
  const { expenses, categories } = useExpenses();

  const data = {
  labels: categories,
  datasets: [
    {
      label: 'Expenses',
      data: categories.map(cat =>
        expenses
          .filter(e => e.category === cat)
          .reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: [
        '#10b981',
        '#3b82f6',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#6b7280'
      ]
    }
  ]
};

  const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
};

  return (
    <Bar
      data={data}
      options={options}
      redraw={true} 
    />
  );
}

export default ExpenseChart;