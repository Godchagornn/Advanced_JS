import { useSelector } from 'react-redux';

import {
  selectStudentCount,
  selectAverageGpa,
  selectHighAchieversCount,
} from '../features/students/selectors';

function GpaSummary() {
  const count = useSelector(
    selectStudentCount
  );

  const avgGpa = useSelector(
    selectAverageGpa
  );

  const highCount = useSelector(
    selectHighAchieversCount
  );

  return (
    <div className="gpa-summary">
      <div className="stat-card sc1">
        <div className="stat-top">
          <span className="stat-label">
            Total Students
          </span>
        </div>

        <div className="stat-value">
          {count}
        </div>

        <div className="stat-sub">
          Registered students
        </div>
      </div>

      <div className="stat-card sc2">
        <div className="stat-top">
          <span className="stat-label">
            Average GPA
          </span>
        </div>

        <div className="stat-value">
          {avgGpa}
        </div>

        <div className="stat-sub">
          Overall performance
        </div>
      </div>

      <div className="stat-card sc3">
        <div className="stat-top">
          <span className="stat-label">
            High Achievers
          </span>
        </div>

        <div className="stat-value">
          {highCount}
        </div>

        <div className="stat-sub">
          GPA 3.5 or higher
        </div>
      </div>
    </div>
  );
}

export default GpaSummary;