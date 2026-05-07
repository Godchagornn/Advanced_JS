export const selectAllStudents = (
  state
) => state.students.list;

export const selectStudentsStatus = (
  state
) => state.students.status;

export const selectStudentsError = (
  state
) => state.students.error;

export const selectStudentCount = (
  state
) => state.students.list.length;

export const selectAverageGpa = (
  state
) => {
  const students = state.students.list;

  if (students.length === 0)
    return '0.00';

  const total = students.reduce(
    (sum, student) =>
      sum + Number(student.gpa),
    0
  );

  return (
    total / students.length
  ).toFixed(2);
};

export const selectHighAchieversCount = (
  state
) =>
  state.students.list.filter(
    (student) =>
      Number(student.gpa) >= 3.5
  ).length;