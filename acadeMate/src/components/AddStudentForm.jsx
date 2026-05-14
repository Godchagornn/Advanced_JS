import { useState } from 'react';

import { useAddStudentMutation } from '../features/students/studentApi';

const EMPTY_FORM = {
  name: '',
  studentId: '',
  major: '',
  gpa: '',
};

function AddStudentForm() {
  const [addStudent, { isLoading }] = useAddStudentMutation();

  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addStudent({
        ...form,
        gpa: parseFloat(form.gpa),
      }).unwrap();

      setForm(EMPTY_FORM);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <form className="add-form glass" onSubmit={handleSubmit}>
      <h3>Add New Student</h3>

      <div className="form-row">
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="studentId"
          placeholder="Student ID"
          value={form.studentId}
          onChange={handleChange}
          required
        />

        <input
          name="major"
          placeholder="Major"
          value={form.major}
          onChange={handleChange}
          required
        />

        <input
          name="gpa"
          placeholder="GPA"
          type="number"
          step="0.01"
          value={form.gpa}
          onChange={handleChange}
          required
        />

        <button className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving…' : '+ Add Student'}
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;
