import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../features/students/studentsSlice";

function StudentTable() {
  const students = useSelector((state) => state.students.list);
  const dispatch = useDispatch();

  if (!students || students.length === 0) {
    return <p>No students yet</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Student ID</th>
          <th>Major</th>
          <th>GPA</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students.map((student, index) => (
          <tr key={student.id}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>{student.studentId}</td>
            <td>{student.major}</td>
            <td>{student.gpa.toFixed(2)}</td>

            <td>
              <button onClick={() => dispatch(deleteStudent(student.id))}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;