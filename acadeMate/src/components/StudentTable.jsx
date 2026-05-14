import { useState } from 'react';

import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from '../features/students/studentApi';

import EditModal from './EditModal';

function StudentTable() {
  const {
    data: students = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetStudentsQuery(undefined, {
    pollingInterval: 30_000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const [deleteStudent] = useDeleteStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();

  const [editingStudent, setEditingStudent] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id).unwrap();
    } catch (err) {
      alert(err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleSave = async (updated) => {
    try {
      await updateStudent({
        ...updated,
        gpa: parseFloat(updated.gpa),
      }).unwrap();

      setEditingStudent(null);
    } catch (err) {
      alert(err);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-box">
        Loading students...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-banner">
        <p>Error: {error?.status ?? 'Failed to fetch students'}</p>

        <button className="btn-primary" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="table-toolbar">
        {isFetching && <span className="badge">↻ Syncing…</span>}
        <button className="btn-primary" onClick={refetch}>
          Refresh
        </button>
      </div>

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
            {students.map((student, index) => (
              <tr key={student.id}>
                <td className="td-num">{index + 1}</td>

                <td className="td-name">{student.name}</td>

                <td>{student.studentId}</td>

                <td>{student.major}</td>

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
                      onClick={() => handleEdit(student)}
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
      </div>

      {editingStudent && (
        <EditModal
          title="Edit Student"
          initialData={editingStudent}
          onSave={handleSave}
          onCancel={() => setEditingStudent(null)}
          fields={[
            { name: 'name', label: 'Full Name' },
            { name: 'studentId', label: 'Student ID' },
            { name: 'major', label: 'Major' },
            { name: 'gpa', label: 'GPA', type: 'number', step: '0.01' },
          ]}
        />
      )}
    </>
  );
}

export default StudentTable;
