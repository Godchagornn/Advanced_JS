import { createSelector } from '@reduxjs/toolkit';
import { studentApi } from './studentApi';

const selectStudentsResult = studentApi.endpoints.getStudents.select();

const selectStudentsData = createSelector(
  selectStudentsResult,
  (result) => result.data ?? []
);

export const selectStudentCount = createSelector(
  selectStudentsData,
  (students) => students.length
);

export const selectAverageGpa = createSelector(
  selectStudentsData,
  (students) => {
    if (students.length === 0) return '0.00';
    const total = students.reduce((sum, s) => sum + Number(s.gpa), 0);
    return (total / students.length).toFixed(2);
  }
);

export const selectHighAchievers = createSelector(
  selectStudentsData,
  (students) => students.filter((s) => Number(s.gpa) >= 3.5)
);

export const selectHighAchieversCount = createSelector(
  selectHighAchievers,
  (highAchievers) => highAchievers.length
);
