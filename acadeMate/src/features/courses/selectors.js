import { createSelector } from '@reduxjs/toolkit';
import { courseApi } from './courseApi';

const selectCoursesResult = courseApi.endpoints.getCourses.select();

const selectCoursesData = createSelector(
  selectCoursesResult,
  (result) => result.data ?? []
);

export const selectCourseCount = createSelector(
  selectCoursesData,
  (courses) => courses.length
);

export const selectTotalCredits = createSelector(
  selectCoursesData,
  (courses) =>
    courses.reduce((sum, course) => sum + Number(course.credits || 0), 0)
);

export const makeSelectCoursesByDepartment = (department) =>
  createSelector(selectCoursesData, (courses) =>
    courses.filter((course) => course.dept === department)
  );
