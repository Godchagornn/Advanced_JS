import { useState } from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  addCourse,
  deleteCourse,
  updateCourse,
} from "../features/courses/coursesSlice";

import {
  selectAllCourses,
  selectCourseCount,
  selectTotalCredits,
} from "../features/courses/selectors";

function CoursesPage() {
  const dispatch = useDispatch();

  const courses =
    useSelector(selectAllCourses);

  const courseCount =
    useSelector(selectCourseCount);

  const totalCredits =
    useSelector(selectTotalCredits);

  // Local UI State
  const [editing, setEditing] =
    useState(null);

  const [form, setForm] = useState({
    code: "",
    title: "",
    credits: "",
    dept: "",
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.code || !form.title)
      return;

    const payload = {
      code: form.code,
      title: form.title,
      credits: Number(form.credits),
      dept: form.dept || "General",
    };

    if (editing) {
      dispatch(
        updateCourse({
          ...payload,
          id: editing.id,
        })
      );

      setEditing(null);
    } else {
      dispatch(
        addCourse({
          ...payload,
          id: Date.now(),
        })
      );
    }

    setForm({
      code: "",
      title: "",
      credits: "",
      dept: "",
    });
  }

  function handleEdit(course) {
    setEditing(course);

    setForm({
      code: course.code,
      title: course.title,
      credits: course.credits,
      dept: course.dept,
    });
  }

  function handleCancel() {
    setEditing(null);

    setForm({
      code: "",
      title: "",
      credits: "",
      dept: "",
    });
  }

  return (
    <>
      {/* Summary */}
      <div className="gpa-summary">
        <div className="stat-card">
          <span className="stat-value">
            {courseCount}
          </span>

          <span className="stat-label">
            Total Courses
          </span>
        </div>

        <div className="stat-card">
          <span className="stat-value">
            {totalCredits}
          </span>

          <span className="stat-label">
            Total Credits
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="add-form glass"
      >
        <h3>
          {editing
            ? "Edit Course"
            : "Add Course"}
        </h3>

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

          <button
            type="submit"
            className="btn-primary"
          >
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
                <td className="td-num">
                  {i + 1}
                </td>

                <td className="td-name">
                  {c.code}
                </td>

                <td>{c.title}</td>

                <td>{c.credits}</td>

                <td className="td-sub">
                  {c.dept}
                </td>

                <td>
                  <div className="action-group">
                    <button
                      className="btn-edit"
                      onClick={() =>
                        handleEdit(c)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() =>
                        dispatch(
                          deleteCourse(c.id)
                        )
                      }
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
    </>
  );
}

export default CoursesPage;