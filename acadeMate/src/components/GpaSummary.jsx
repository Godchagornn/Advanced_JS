import { useSelector } from "react-redux";

import {
  selectStudentCount,
  selectAverageGpa,
  selectHighAchieversCount,
} from "../features/students/selectors";

function GpaSummary() {
  const count = useSelector(selectStudentCount);
  const avgGpa = useSelector(selectAverageGpa);

  const highCount = useSelector(selectHighAchieversCount);

  return (
    <div className="gpa-summary">
      <div className="stat-card">
        <span className="stat-value">{count}</span>
        <span className="stat-label">Total Students</span>
      </div>

      <div className="stat-card">
        <span className="stat-value">{avgGpa}</span>
        <span className="stat-label">Average GPA</span>
      </div>

      <div className="stat-card">
        <span className="stat-value">{highCount}</span>
        <span className="stat-label">
          High Achievers (≥ 3.5)
        </span>
      </div>
    </div>
  );
}

export default GpaSummary;