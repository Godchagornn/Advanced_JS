import { useState } from 'react';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  selectAllStudents,
} from '../features/students/studentsSlice';

import {
  selectStudentsStatus,
  selectStudentsError,
} from '../features/students/selectors';

import {
  fetchStudents,
  deleteStudentAsync,
  updateStudentAsync,
} from '../features/students/studentsThunks';

import EditModal from './EditModal';

function StudentTable() {
  const dispatch = useDispatch();

  const students = useSelector(
    selectAllStudents
  );

  const status = useSelector(
    selectStudentsStatus
  );

  const error = useSelector(
    selectStudentsError
  );

  // Modal State
  const [editingStudent, setEditingStudent] =
    useState(null);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await dispatch(
        deleteStudentAsync(id)
      ).unwrap();
    } catch (err) {
      alert(err);
    }
  };

  // OPEN MODAL
  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  // SAVE EDIT
  const handleSave = async (updated) => {
    try {
      await dispatch(
        updateStudentAsync({
          ...updated,
          gpa: parseFloat(updated.gpa),
        })
      ).unwrap();

      setEditingStudent(null);
    } catch (err) {
      alert(err);
    }
  };

  // LOADING
  if (status === 'loading') {
    return (
      <div className="loading-box">
        Loading students...
      </div>
    );
  }

  // ERROR
  if (status === 'failed') {
    return (
      <div className="error-banner">
        <p>Error: {error}</p>

        <button
          className="btn-primary"
          onClick={() =>
            dispatch(fetchStudents())
          }
        >
          Retry
        </button>
      </div>
    );
  }

  // WAIT
  if (status !== 'succeeded') {
    return null;
  }

  return (
    <>
      {/* TABLE */}
      <div className="table-wrap">
        <table>
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
            {students.map(
              (student, index) => (
                <tr key={student.id}>
                  <td className="td-num">
                    {index + 1}
                  </td>

                  <td className="td-name">
                    {student.name}
                  </td>

                  <td>
                    {student.studentId}
                  </td>

                  <td>
                    {student.major}
                  </td>

                  <td>
                    <span
                      className={`gpa-pill ${
                        student.gpa >= 3.5
                          ? 'gpa-high'
                          : student.gpa >= 2.5
                          ? 'gpa-mid'
                          : 'gpa-low'
                      }`}
                    >
                      {student.gpa}
                    </span>
                  </td>

                  <td>
                    <div className="action-group">
                      <button
                        className="btn-edit"
                        onClick={() =>
                          handleEdit(student)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() =>
                          handleDelete(
                            student.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {editingStudent && (
        <EditModal
          title="Edit Student"
          initialData={editingStudent}
          onSave={handleSave}
          onCancel={() =>
            setEditingStudent(null)
          }
          fields={[
            {
              name: 'name',
              label: 'Full Name',
            },
            {
              name: 'studentId',
              label: 'Student ID',
            },
            {
              name: 'major',
              label: 'Major',
            },
            {
              name: 'gpa',
              label: 'GPA',
              type: 'number',
              step: '0.01',
            },
          ]}
        />
      )}
    </>
  );
}

export default StudentTable;