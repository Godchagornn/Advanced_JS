import GpaSummary from '../components/GpaSummary';
import AddStudentForm from '../components/AddStudentForm';
import StudentTable from '../components/StudentTable';

function StudentsPage() {
  return (
    <>
      <GpaSummary />
      <AddStudentForm />
      <StudentTable />
    </>
  );
}

export default StudentsPage;