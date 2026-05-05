import { useState } from 'react';
import GpaSummary from '../components/GpaSummary';
import AddStudentForm from '../components/AddStudentForm';
import StudentTable from '../components/StudentTable';

function StudentsPage() {
  const [editingStudent, setEditingStudent] = useState(null);

  return (
    <>
      <GpaSummary />
      <AddStudentForm
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />
      <StudentTable onEdit={setEditingStudent} />
    </>
  );
}

export default StudentsPage;