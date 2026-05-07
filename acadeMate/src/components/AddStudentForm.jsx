import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addStudentAsync } from '../features/students/studentsThunks';

const EMPTY_FORM = {
  name: '',
  studentId: '',
  major: '',
  gpa: '',
};

function AddStudentForm() {
  const dispatch = useDispatch();

  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        addStudentAsync({
          ...form,
          gpa: parseFloat(form.gpa),
        })
      ).unwrap();

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

        <button className="btn-primary">
          + Add Student
        </button>
      </div>
    </form>
  );
}

export default AddStudentForm;