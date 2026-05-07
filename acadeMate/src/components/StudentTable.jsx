import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteStudent,
  updateStudent,
} from "../features/students/studentsSlice";

import { selectAllStudents } from "../features/students/selectors";

import EditModal from "./EditModal";

function StudentTable() {
  const dispatch = useDispatch();

  const students = useSelector(selectAllStudents);

  const [editing, setEditing] = useState(null);

  function handleDelete(id) {
    if (window.confirm("Delete this student?")) {
      dispatch(deleteStudent(id));
    }
  }

  function handleEditSave(updatedData) {
    dispatch(
      updateStudent({
        ...updatedData,
        gpa: parseFloat(updatedData.gpa) || 0,
      })
    );

    setEditing(null);
  }

  return (
    <>
      <table className="student-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr
              key={student.id}
              className={
                student.gpa >= 3.5 ? "high-gpa" : ""
              }
            >
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.studentId}</td>
              <td>{student.major}</td>

              <td className="gpa-cell">
                {student.gpa.toFixed(2)}
              </td>

              <td>
  <div className="action-group">
    <button
      className="btn-edit"
      onClick={() => setEditing(student)}
    >
      Edit
    </button>

    <button
      className="btn-delete"
      onClick={() => handleDelete(student.id)}
    >
      Delete
    </button>
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <EditModal
          student={editing}
          onSave={handleEditSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </>
  );
}

export default StudentTable;