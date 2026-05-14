import { createSelector } from '@reduxjs/toolkit';

import { selectAllGrades } from './gradesSlice';

export const selectPassedGradesCount = createSelector(
  selectAllGrades,
  (grades) => grades.filter((grade) => grade.score >= 50).length
);

export const selectAverageScore = createSelector(
  selectAllGrades,
  (grades) => {
    if (!grades.length) return '0.00';
    const total = grades.reduce((sum, grade) => sum + grade.score, 0);
    return (total / grades.length).toFixed(2);
  }
);

export const makeSelectGradesByStudentId = (studentId) =>
  createSelector(selectAllGrades, (grades) =>
    grades.filter((grade) => grade.studentId === studentId)
  );

export const makeSelectGradesByCourseId = (courseId) =>
  createSelector(selectAllGrades, (grades) =>
    grades.filter((grade) => grade.courseId === courseId)
  );
