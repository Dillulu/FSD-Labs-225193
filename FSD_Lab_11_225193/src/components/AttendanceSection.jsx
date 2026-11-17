// AttendanceSection.jsx - Attendance monitoring and eligibility tracking
import { useState } from 'react';

function AttendanceSection({ attendanceRecords, departmentOptions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const filteredAttendance = attendanceRecords.filter((rec) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      term === '' ||
      rec.name.toLowerCase().includes(term) ||
      rec.rollNumber.toLowerCase().includes(term);

    const matchesDept =
      selectedDept === 'All Departments' ||
      rec.department.toLowerCase() === selectedDept.toLowerCase();

    return matchesSearch && matchesDept;
  });

  const avgPercentage = Math.round(
    attendanceRecords.reduce((acc, curr) => acc + curr.percentage, 0) /
      (attendanceRecords.length || 1)
  );

  return (
    <div className="section-container">
      {/* Attendance Stats Cards */}
      <div className="section-header-cards">
        <div className="section-metric-card">
          <span className="metric-icon">📊</span>
          <div>
            <h3>Overall Average</h3>
            <p className="metric-num">{avgPercentage}%</p>
          </div>
        </div>
        <div className="section-metric-card">
          <span className="metric-icon">✅</span>
          <div>
            <h3>Eligible Students</h3>
            <p className="metric-num">
              {attendanceRecords.filter((r) => r.status === 'Eligible').length}
            </p>
          </div>
        </div>
        <div className="section-metric-card">
          <span className="metric-icon">⚠️</span>
          <div>
            <h3>Short Attendance (&lt;75%)</h3>
            <p className="metric-num">
              {attendanceRecords.filter((r) => r.status === 'Short Attendance').length}
            </p>
          </div>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header-bar">
          <div>
            <h2 className="table-title">Student Attendance Register</h2>
            <p className="table-description">
              Showing {filteredAttendance.length} of {attendanceRecords.length} records (75% minimum required)
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="table-controls-bar">
          <div className="search-control">
            <label htmlFor="att-search" className="control-label">Search:</label>
            <div className="search-input-wrapper">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                id="att-search"
                type="text"
                className="search-input"
                placeholder="Search student or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchTerm('')}
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="filter-control">
            <label htmlFor="att-dept" className="control-label">Department:</label>
            <select
              id="att-dept"
              className="filter-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="All Departments">All Departments</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Delivered</th>
                <th>Attended</th>
                <th>Attendance %</th>
                <th>Exam Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((rec) => (
                  <tr key={rec.id}>
                    <td className="roll-no">{rec.rollNumber}</td>
                    <td className="student-name">{rec.name}</td>
                    <td>{rec.department}</td>
                    <td>{rec.totalClasses} Lectures</td>
                    <td>{rec.attended} Lectures</td>
                    <td>
                      <div className="attendance-bar-wrapper">
                        <div className="attendance-percent-text">
                          <strong>{rec.percentage}%</strong>
                        </div>
                        <div className="progress-track">
                          <div
                            className={`progress-fill ${
                              rec.percentage >= 75 ? 'fill-good' : 'fill-warning'
                            }`}
                            style={{ width: `${rec.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          rec.status === 'Eligible' ? 'badge-active' : 'badge-inactive'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-state">
                    <div className="empty-state-content">
                      <span className="empty-state-icon">🔍</span>
                      <p className="empty-state-title">No attendance records found</p>
                      <button
                        type="button"
                        className="btn-reset-filters"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedDept('All Departments');
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceSection;
