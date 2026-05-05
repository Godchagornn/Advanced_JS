import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addGrade,
  deleteGrade,
  updateGrade
} from "../features/grades/gradesSlice";

function GradesPage() {
  const students = useSelector(state => state.students.list);
  const courses = useSelector(state => state.courses.list);
  const grades = useSelector(state => state.grades.list);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    studentId: "",
    courseId: "",
    grade: "",
    semester: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.studentId || !form.courseId) return;

    const payload = {
      studentId: Number(form.studentId),
      courseId: Number(form.courseId),
      grade: form.grade,
      semester: form.semester
    };

    if (editing) {
      dispatch(updateGrade({ ...payload, id: editing.id }));
      setEditing(null);
    } else {
      dispatch(addGrade(payload));
    }

    setForm({
      studentId: "",
      courseId: "",
      grade: "",
      semester: ""
    });
  }

  function handleEdit(g) {
    setEditing(g);
    setForm({
      studentId: g.studentId,
      courseId: g.courseId,
      grade: g.grade,
      semester: g.semester
    });
  }

  function handleCancel() {
    setEditing(null);
    setForm({
      studentId: "",
      courseId: "",
      grade: "",
      semester: ""
    });
  }

  return (
    <>
      {/* FORM */}
      <form onSubmit={handleSubmit} className="add-form glass">
        <h3>{editing ? "Edit Grade" : "Add Grade"}</h3>

        <div className="form-row">
          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            className="select-input"
          >
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            className="select-input"
          >
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.code}
              </option>
            ))}
          </select>

          <input
            name="grade"
            placeholder="Grade (A,B,C)"
            value={form.grade}
            onChange={handleChange}
          />

          <input
            name="semester"
            placeholder="Semester"
            value={form.semester}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary">
            {editing ? "Save" : "+ Add"}
          </button>

          {editing && (
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE */}
      <div className="table-wrap glass">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Semester</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {grades.map((g, i) => {
              const student = students.find(s => s.id === g.studentId);
              const course = courses.find(c => c.id === g.courseId);

              return (
                <tr key={g.id}>
                  <td className="td-num">{i + 1}</td>
                  <td className="td-name">{student?.name}</td>
                  <td className="td-sub">{course?.code}</td>
                  <td>{g.grade}</td>
                  <td>{g.semester}</td>

                  <td>
                    <div className="action-group">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(g)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => dispatch(deleteGrade(g.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GradesPage;