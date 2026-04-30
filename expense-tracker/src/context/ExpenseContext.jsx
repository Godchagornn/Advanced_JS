import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo
} from 'react';

const ExpenseContext = createContext();

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'];

export const CATEGORY_COLORS = {
  Food:          '#FF9500',
  Transport:     '#0077CC',
  Entertainment: '#8B5CF6',
  Shopping:      '#EC4899',
  Health:        '#10B981',
  Other:         '#6B7280',
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'LOAD':
      return { ...state, expenses: action.payload };
    case 'DELETE':
      return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
    case 'EDIT':
      return { ...state, expenses: state.expenses.map(e => e.id === action.payload.id ? action.payload : e) };
    case 'FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

const initialState = { expenses: [], filter: 'All' };

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    const s = localStorage.getItem('expenses');
    if (s) dispatch({ type: 'LOAD', payload: JSON.parse(s) });
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);

  const totalAmount = useMemo(() =>
    state.expenses.reduce((sum, e) => sum + e.amount, 0),
    [state.expenses]
  );

  const percentUsed = useMemo(() =>
    budget ? (totalAmount / budget) * 100 : 0,
    [totalAmount, budget]
  );

  const filteredExpenses = useMemo(() => {
    const filtered = state.filter === 'All'
      ? state.expenses
      : state.expenses.filter(e => e.category === state.filter);
    return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [state.expenses, state.filter]);

  function addExpense(name, amount, category, date) {
    dispatch({ type: 'ADD', payload: { id: Date.now(), name, amount: parseFloat(amount), category, date } });
  }

  function deleteExpense(id) { dispatch({ type: 'DELETE', payload: id }); }
  function editExpense(updated) { dispatch({ type: 'EDIT', payload: updated }); }
  function setFilter(cat) { dispatch({ type: 'FILTER', payload: cat }); }

  return (
    <ExpenseContext.Provider value={{
      expenses: state.expenses,
      filteredExpenses,
      totalAmount,
      filter: state.filter,
      categories: CATEGORIES,
      categoryColors: CATEGORY_COLORS,
      addExpense,
      deleteExpense,
      editExpense,
      setFilter,
      budget,
      setBudget,
      percentUsed,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}