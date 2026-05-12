import { configureStore } from '@reduxjs/toolkit';

import { studentApi } from '../features/students/studentApi';
import { courseApi } from '../features/courses/courseApi';
import gradesReducer from '../features/grades/gradesSlice';

export const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    grades: gradesReducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(studentApi.middleware)
      .concat(courseApi.middleware),
});

export default store;
