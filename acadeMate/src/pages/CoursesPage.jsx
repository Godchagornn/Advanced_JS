import { useEffect, useState } from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  fetchCourses,
  addCourseAsync,
  deleteCourseAsync,
  updateCourseAsync,
} from "../features/courses/coursesThunks";

import {
  selectAllCourses,
  selectCourseCount,
} from "../features/courses/coursesSlice";

import {
  selectTotalCredits,
  selectCoursesStatus,
  selectCoursesError,
} from "../features/courses/selectors";

import EditModal from "../components/EditModal";

function CoursesPage() {
  const dispatch = useDispatch();

  const courses = useSelector(selectAllCourses);

  const courseCount =
    useSelector(selectCourseCount);

  const totalCredits =
    useSelector(selectTotalCredits);

  const status =
    useSelector(selectCoursesStatus);

  const error =
    useSelector(selectCoursesError);

  const [editing, setEditing] =
    useState(null);

  const [form, setForm] = useState({
    code: "",
    title: "",
    credits: "",
    dept: "",
  });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.code || !form.title)
      return;

    const payload = {
      code: form.code,
      title: form.title,
      credits: Number(form.credits),
      dept: form.dept || "General",
    };

    try {
      await dispatch(
        addCourseAsync(payload)
      ).unwrap();

      setForm({
        code: "",
        title: "",
        credits: "",
        dept: "",
      });

    } catch (err) {
      alert(err);
    }
  }

  async function handleSaveEdit(
    updatedCourse
  ) {
    try {
      await dispatch(
        updateCourseAsync({
          ...updatedCourse,
          credits: Number(
            updatedCourse.credits
          ),
        })
      ).unwrap();

      setEditing(null);

    } catch (err) {
      alert(err);
    }
  }

  function handleDelete(id) {
    dispatch(deleteCourseAsync(id));
  }

  if (status === "loading") {
    return (
      <div className="loading-box">
        Loading courses...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="error-banner">
        <p>Error: {error}</p>

        <button
          className="btn-primary"
          onClick={() =>
            dispatch(fetchCourses())
          }
        >
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

      {/* Add Form */}
      <form
        onSubmit={handleSubmit}
        className="add-form glass"
      >
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

          <button
            type="submit"
            className="btn-primary"
          >
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
                        setEditing(c)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() =>
                        handleDelete(c.id)
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

      {/* Modal */}
      {/* Modal */}
      {editing && (
        <EditModal
          title="Edit Course"
          initialData={editing}
          onSave={handleSaveEdit}
          onCancel={() =>
            setEditing(null)
          }
          fields={[
            {
              name: "code",
              label: "Course Code",
            },
            {
              name: "title",
              label: "Title",
            },
            {
              name: "credits",
              label: "Credits",
              type: "number",
            },
            {
              name: "dept",
              label: "Department",
            },
          ]}
        />
      )}
    </>
  );
}

export default CoursesPage;