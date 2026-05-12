import { createSelector } from '@reduxjs/toolkit';

import { selectAllStudents } from './studentsSlice';

export const selectStudentsStatus = (state) =>
  state.students.status;

export const selectStudentsError = (state) =>
  state.students.error;

export const selectAverageGpa = createSelector(
  selectAllStudents,
  (students) => {
    if (!students.length) return '0.00';
    const total = students.reduce(
      (sum, s) => sum + Number(s.gpa),
      0
    );
    return (total / students.length).toFixed(2);
  }
);

export const selectHighAchievers = createSelector(
  selectAllStudents,
  (students) =>
    students.filter((s) => Number(s.gpa) >= 3.5)
);

export const selectHighAchieversCount = createSelector(
  selectHighAchievers,
  (highAchievers) => highAchievers.length
);
