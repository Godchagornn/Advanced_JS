import { Routes, Route, NavLink } from "react-router-dom";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import GradesPage from "./pages/GradesPage";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>

        {/* NAVBAR */}
        <nav className="nav-bar">
          <NavLink to="/" end>Students</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/grades">Grades</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/grades" element={<GradesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;