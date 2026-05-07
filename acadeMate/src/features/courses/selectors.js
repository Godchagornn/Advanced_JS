export const selectAllCourses = (state) =>
  state.courses.list;

export const selectCourseCount = (state) =>
  state.courses.list.length;

export const selectCourseById = (id) => (state) =>
  state.courses.list.find(
    (course) => course.id === id
  );

export const selectCoursesByDepartment =
  (department) => (state) =>
    state.courses.list.filter(
      (course) => course.dept === department
    );

export const selectTotalCredits = (state) =>
  state.courses.list.reduce(
    (sum, course) =>
      sum + (course.credits || 0),
    0
  );