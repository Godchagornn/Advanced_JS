export const selectAllGrades = (state) =>
  state.grades.list;

export const selectGradeCount = (state) =>
  state.grades.list.length;

export const selectGradeById = (id) => (state) =>
  state.grades.list.find((grade) => grade.id === id);

export const selectGradesByStudentId =
  (studentId) => (state) =>
    state.grades.list.filter(
      (grade) => grade.studentId === studentId
    );

export const selectGradesByCourseId =
  (courseId) => (state) =>
    state.grades.list.filter(
      (grade) => grade.courseId === courseId
    );

export const selectPassedGradesCount = (state) =>
  state.grades.list.filter(
    (grade) => grade.score >= 50
  ).length;

export const selectAverageScore = (state) => {
  const list = state.grades.list;

  if (list.length === 0) return "0.00";

  const total = list.reduce(
    (sum, grade) => sum + grade.score,
    0
  );

  return (total / list.length).toFixed(2);
};