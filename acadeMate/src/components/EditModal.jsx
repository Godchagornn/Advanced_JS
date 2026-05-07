import { useState } from "react";

function EditModal({ student, onSave, onCancel }) {
  const [form, setForm] = useState({ ...student });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Student</h3>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
        />

        <input
          name="major"
          value={form.major}
          onChange={handleChange}
        />

        <input
          name="gpa"
          value={form.gpa}
          onChange={handleChange}
          type="number"
          step="0.01"
        />

        <div className="modal-actions">
          <button onClick={() => onSave(form)}>
            Save
          </button>

          <button onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;