import { useState } from "react";

function EditModal({
  title,
  initialData,
  fields,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState({
    ...initialData,
  });

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>

        {fields.map((field) => (
          <div
            key={field.name}
            className="modal-field"
          >
            <label>
              {field.label}
            </label>

            <input
              type={field.type || "text"}
              step={field.step}
              name={field.name}
              value={form[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="modal-actions">
          <button
            className="btn-primary"
            onClick={() => onSave(form)}
          >
            Save
          </button>

          <button
            className="btn-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;