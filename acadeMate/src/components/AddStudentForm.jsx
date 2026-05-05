import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addStudent,
  updateStudent,
} from "../features/students/studentsSlice";

const EMPTY_FORM = {
  name: "",
  studentId: "",
  major: "",
  gpa: "",
};

function AddStudentForm({ editingStudent, setEditingStudent }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    }
  }, [editingStudent]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim() || !formData.studentId.trim()) {
      setError("Name and Student ID are required.");
      return;
    }

    const gpaNum = parseFloat(formData.gpa);

    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setError("GPA must be between 0.0 - 4.0");
      return;
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      studentId: formData.studentId.trim(),
      major: formData.major.trim() || "Undeclared",
      gpa: gpaNum,
    };

    if (editingStudent) {
      dispatch(updateStudent(payload));
      setEditingStudent(null);
    } else {
      dispatch(
        addStudent({
          ...payload,
          id: Date.now(),
        })
      );
    }

    setFormData(EMPTY_FORM);
    setError("");
  }

  function handleCancel() {
    setEditingStudent(null);
    setFormData(EMPTY_FORM);
    setError("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>{editingStudent ? "Edit Student" : "Add New Student"}</h3>

      {error && <p className="form-error">{error}</p>}

      <div className="form-row">
        <input
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="studentId"
          placeholder="Student ID *"
          value={formData.studentId}
          onChange={handleChange}
        />

        <input
          name="major"
          placeholder="Major"
          value={formData.major}
          onChange={handleChange}
        />

        <input
          name="gpa"
          type="number"
          step="0.01"
          min="0"
          max="4"
          placeholder="GPA"
          value={formData.gpa}
          onChange={handleChange}
        />

        <button type="submit" className="btn-primary">
          {editingStudent ? "Save" : "+ Add"}
        </button>

        {editingStudent && (
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
  );
}

export default AddStudentForm;