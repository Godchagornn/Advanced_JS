import { createSelector } from '@reduxjs/toolkit';

import { selectAllCourses } from './coursesSlice';

export const selectCoursesStatus = (state) =>
  state.courses.status;

export const selectCoursesError = (state) =>
  state.courses.error;

export const selectTotalCredits = createSelector(
  selectAllCourses,
  (courses) =>
    courses.reduce(
      (sum, course) => sum + Number(course.credits || 0),
      0
    )
);

export const makeSelectCoursesByDepartment =
  (department) =>
    createSelector(
      selectAllCourses,
      (courses) =>
        courses.filter((course) => course.dept === department)
    );
