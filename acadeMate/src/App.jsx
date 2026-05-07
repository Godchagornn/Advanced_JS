// src/App.jsx

import "./App.css";

import { Routes, Route, Link } from "react-router-dom";

import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import GradesPage from "./pages/GradesPage";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AcadeMate</h1>

        <nav className="nav-menu">
          <Link to="/">Students</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/grades">Grades</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<StudentsPage />} />

          <Route
            path="/courses"
            element={<CoursesPage />}
          />

          <Route
            path="/grades"
            element={<GradesPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;