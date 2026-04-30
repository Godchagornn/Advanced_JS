import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo
} from 'react';

const ExpenseContext = createContext();

const CATEGORIES = ['Food','Transport','Entertainment','Shopping','Health','Other'];

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [...state.expenses, action.payload] };

    case 'LOAD':
      return { ...state, expenses: action.payload };

    case 'DELETE':
      return {
        ...state,
        expenses: state.expenses.filter(e => e.id !== action.payload)
      };

    case 'EDIT':
      return {
        ...state,
        expenses: state.expenses.map(e =>
          e.id === action.payload.id ? action.payload : e
        )
      };

    case 'FILTER':
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

const initialState = { expenses: [], filter: 'All' };

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // budget
  const [budget, setBudget] = useState(0);

  // load
  useEffect(() => {
    const s = localStorage.getItem('expenses');
    if (s) dispatch({ type: 'LOAD', payload: JSON.parse(s) });
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);

  const totalAmount = useMemo(() => {
  return state.expenses.reduce((sum, e) => sum + e.amount, 0);
}, [state.expenses]);

const percentUsed = useMemo(() => {
  return budget ? (totalAmount / budget) * 100 : 0;
}, [totalAmount, budget]);

const filteredExpenses = useMemo(() => {
  const filtered =
    state.filter === 'All'
      ? state.expenses
      : state.expenses.filter(e => e.category === state.filter);

  return [...filtered].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}, [state.expenses, state.filter]);

  function addExpense(name, amount, category, date) {
    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        category,
        date
      }
    });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function editExpense(updated) {
    dispatch({ type: 'EDIT', payload: updated });
  }

  function setFilter(cat) {
    dispatch({ type: 'FILTER', payload: cat });
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        filteredExpenses,
        totalAmount,
        filter: state.filter,
        categories: CATEGORIES,
        addExpense,
        deleteExpense,
        editExpense,
        setFilter,
        budget,
        setBudget,
        percentUsed
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}