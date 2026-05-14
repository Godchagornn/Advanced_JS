import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { studentApi } from '../features/students/studentApi';
import { courseApi } from '../features/courses/courseApi';
import gradesReducer from '../features/grades/gradesSlice';
import loggerMiddleware from './middleware/logger';

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    grades: gradesReducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(studentApi.middleware)
      .concat(courseApi.middleware)
      .concat(loggerMiddleware),
});

setupListeners(store.dispatch);

export default store;
