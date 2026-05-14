import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAllGrades,
  selectGradeCount,
  addGrade,
  updateGrade,
  deleteGrade,
} from '../features/grades/gradesSlice';

import { useGetStudentsQuery } from '../features/students/studentApi';
import { useGetCoursesQuery } from '../features/courses/courseApi';

import EditModal from '../components/EditModal';

const EMPTY_FORM = { studentId: '', courseId: '', grade: '', semester: '' };

function GradesPage() {
  const dispatch = useDispatch();

  const grades = useSelector(selectAllGrades);
  const gradeCount = useSelector(selectGradeCount);

  const { data: students = [] } = useGetStudentsQuery();
  const { data: courses = [] } = useGetCoursesQuery();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.studentId || !form.courseId) return;

    dispatch(
      addGrade({
        studentId: form.studentId,
        courseId: form.courseId,
        grade: form.grade,
        semester: form.semester,
      })
    );

    setForm(EMPTY_FORM);
  }

  function handleSaveEdit(updatedGrade) {
    dispatch(updateGrade(updatedGrade));
    setEditing(null);
  }

  return (
    <>
      {/* Summary */}
      <div className="gpa-summary">
        <div className="stat-card">
          <span className="stat-value">{gradeCount}</span>
          <span className="stat-label">Total Grades</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{grades.length}</span>
          <span className="stat-label">Grade Records</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="add-form glass">
        <h3>Add Grade</h3>

        <div className="form-row">
          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            className="select-input"
          >
            <option value="">Select Student</option>

            {students.map((s) => (
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

            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code}
              </option>
            ))}
          </select>

          <input
            name="grade"
            placeholder="Grade"
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
            + Add
          </button>
        </div>
      </form>

      {/* Table */}
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
              const student = students.find((s) => s.id === g.studentId);
              const course = courses.find((c) => c.id === g.courseId);

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
                        onClick={() => setEditing(g)}
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

      {/* Modal */}
      {editing && (
        <EditModal
          title="Edit Grade"
          initialData={editing}
          onSave={handleSaveEdit}
          onCancel={() => setEditing(null)}
          fields={[
            { name: 'studentId', label: 'Student ID' },
            { name: 'courseId', label: 'Course ID' },
            { name: 'grade', label: 'Grade' },
            { name: 'semester', label: 'Semester' },
          ]}
        />
      )}
    </>
  );
}

export default GradesPage;
