import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../features/students/studentsSlice";

function StudentTable({ onEdit }) {
  const students = useSelector((state) => state.students.list);
  const dispatch = useDispatch();

  if (!students || students.length === 0) {
    return <p className="ac-empty">No students yet</p>;
  }

  return (
    <div className="table-wrap">
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
            <tr key={student.id} className="ac-new-row">
              <td className="td-num">{index + 1}</td>
              <td className="td-name">{student.name}</td>
              <td className="td-sub">{student.studentId}</td>
              <td className="td-sub">{student.major}</td>

              <td>
                <span
                  className={`gpa-pill ${
                    student.gpa >= 3.5
                      ? "gpa-high"
                      : student.gpa >= 2.5
                      ? "gpa-mid"
                      : "gpa-low"
                  }`}
                >
                  {student.gpa.toFixed(2)}
                </span>
              </td>

              <td>
                <div className="action-group">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => dispatch(deleteStudent(student.id))}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;