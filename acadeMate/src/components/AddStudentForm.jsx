import { useState } from "react";
import { useDispatch } from "react-redux";

import { addStudent } from "../features/students/studentsSlice";

const EMPTY_FORM = {
  name: "",
  studentId: "",
  major: "",
  gpa: "",
};

function AddStudentForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.studentId) {
      setError("Please fill required fields");
      return;
    }

    dispatch(
      addStudent({
        id: Date.now(),
        ...form,
        gpa: parseFloat(form.gpa) || 0,
      })
    );

    setForm(EMPTY_FORM);
    setError("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>

      {error && <p className="error">{error}</p>}

      <div className="form-row">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />

        <input
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          placeholder="Student ID *"
          required
        />

        <input
          name="major"
          value={form.major}
          onChange={handleChange}
          placeholder="Major"
        />

        <input
          name="gpa"
          value={form.gpa}
          onChange={handleChange}
          placeholder="GPA (0.0–4.0)"
          type="number"
          step="0.01"
          min="0"
          max="4"
        />

        <button type="submit" className="btn-primary">
          + Add Student
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;