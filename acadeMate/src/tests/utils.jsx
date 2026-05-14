import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { studentApi } from '../features/students/studentApi';
import { courseApi } from '../features/courses/courseApi';
import gradesReducer from '../features/grades/gradesSlice';

export function renderWithProviders(ui, { preloadedState = {} } = {}) {
  const store = configureStore({
    reducer: {
      [studentApi.reducerPath]: studentApi.reducer,
      [courseApi.reducerPath]: courseApi.reducer,
      grades: gradesReducer,
    },
    middleware: (gDM) =>
      gDM()
        .concat(studentApi.middleware)
        .concat(courseApi.middleware),
    preloadedState,
  });

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper }) };
}
