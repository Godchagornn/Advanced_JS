import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { useExpenses, CATEGORY_COLORS } from '../context/ExpenseContext';
import { useMemo } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function ExpenseChart() {
  const { expenses, categories } = useExpenses();

  const data = useMemo(() => ({
    labels: categories,
    datasets: [{
      data: categories.map(cat =>
        expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: categories.map(cat => CATEGORY_COLORS[cat]),
      borderRadius: 6,
      borderSkipped: false,
    }]
  }), [expenses, categories]);

  return <Bar data={data} options={{ plugins: { legend: { display: false } } }} />;
}

export default ExpenseChart;