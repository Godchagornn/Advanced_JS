import React from 'react';
import { Users, GraduationCap, TrendingUp, TrendingDown } from 'lucide-react';
import { useSelector } from "react-redux";

function GpaSummary() {
    const students = useSelector((state) => state.students.list);

    if (students.length === 0) return null;
    
    const average = (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2);
    const highest = Math.max(...students.map(s => s.gpa)).toFixed(2);
    const lowest = Math.min(...students.map(s => s.gpa)).toFixed(2);

    return (
        <div className="gpa-summary">
            <div className="stat-card sc1">
                <div className="stat-top">
                    <span className="stat-label">Students</span>
                    <Users size={36} className="stat-icon" color="#6C63FF" />
                </div>
                <div className="stat-value">{students.length}</div>
                <div className="stat-sub">Total enrolled</div>
            </div>

            <div className="stat-card sc2">
                <div className="stat-top">
                    <span className="stat-label">Avg GPA</span>
                    <GraduationCap size={36} className="stat-icon" color="#22D3EE" />
                </div>
                <div className="stat-value">{average}</div>
                <div className="stat-sub">Class average</div>
            </div>

            <div className="stat-card sc3">
                <div className="stat-top">
                    <span className="stat-label">Highest</span>
                    <TrendingUp size={36} className="stat-icon" color="#10B981" />
                </div>
                <div className="stat-value">{highest}</div>
                <div className="stat-sub">Best performance</div>
            </div>

            <div className="stat-card sc4">
                <div className="stat-top">
                    <span className="stat-label">Lowest</span>
                    <TrendingDown size={36} className="stat-icon" color="#F59E0B" />
                </div>
                <div className="stat-value">{lowest}</div>
                <div className="stat-sub">Minimum GPA</div>
            </div>
        </div>
    );
}

export default GpaSummary;