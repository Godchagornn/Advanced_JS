import { useState } from 'react';

import {
  useGetCoursesQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from '../features/courses/courseApi';

import EditModal from '../components/EditModal';

const EMPTY_FORM = { code: '', title: '', credits: '', dept: '' };

function CoursesPage() {
  const {
    data: courses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCoursesQuery();

  const [addCourse, { isLoading: isAdding }] = useAddCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const courseCount = courses.length;
  const totalCredits = courses.reduce(
    (sum, c) => sum + Number(c.credits || 0),
    0
  );

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.code || !form.title) return;

    try {
      await addCourse({
        code: form.code,
        title: form.title,
        credits: Number(form.credits),
        dept: form.dept || 'General',
      }).unwrap();

      setForm(EMPTY_FORM);
    } catch (err) {
      alert(err);
    }
  }

  async function handleSaveEdit(updatedCourse) {
    try {
      await updateCourse({
        ...updatedCourse,
        credits: Number(updatedCourse.credits),
      }).unwrap();

      setEditing(null);
    } catch (err) {
      alert(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCourse(id).unwrap();
    } catch (err) {
      alert(err);
    }
  }

  if (isLoading) {
    return <div className="loading-box">Loading courses...</div>;
  }

  if (isError) {
    return (
      <div className="error-banner">
        <p>Error: {error?.status ?? 'Failed to fetch courses'}</p>

        <button className="btn-primary" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Summary */}
      <div className="gpa-summary">
        <div className="stat-card">
          <span className="stat-value">{courseCount}</span>
          <span className="stat-label">Total Courses</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{totalCredits}</span>
          <span className="stat-label">Total Credits</span>
        </div>
      </div>

      {/* Add Form */}
      <form onSubmit={handleSubmit} className="add-form glass">
        <h3>Add Course</h3>

        <div className="form-row">
          <input
            name="code"
            placeholder="Code"
            value={form.code}
            onChange={handleChange}
          />

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            name="credits"
            type="number"
            placeholder="Credits"
            value={form.credits}
            onChange={handleChange}
          />

          <input
            name="dept"
            placeholder="Dept"
            value={form.dept}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary" disabled={isAdding}>
            {isAdding ? 'Saving…' : '+ Add'}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="table-wrap glass">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Code</th>
              <th>Title</th>
              <th>Credits</th>
              <th>Dept</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((c, i) => (
              <tr key={c.id}>
                <td className="td-num">{i + 1}</td>
                <td className="td-name">{c.code}</td>
                <td>{c.title}</td>
                <td>{c.credits}</td>
                <td className="td-sub">{c.dept}</td>

                <td>
                  <div className="action-group">
                    <button
                      className="btn-edit"
                      onClick={() => setEditing(c)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(c.id)}
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

      {/* Modal */}
      {editing && (
        <EditModal
          title="Edit Course"
          initialData={editing}
          onSave={handleSaveEdit}
          onCancel={() => setEditing(null)}
          fields={[
            { name: 'code', label: 'Course Code' },
            { name: 'title', label: 'Title' },
            { name: 'credits', label: 'Credits', type: 'number' },
            { name: 'dept', label: 'Department' },
          ]}
        />
      )}
    </>
  );
}

export default CoursesPage;
