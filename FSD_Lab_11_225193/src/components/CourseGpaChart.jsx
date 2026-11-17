// CourseGpaChart.jsx - Course-wise Average GPA Comparative Bar Graph
import { useState } from 'react';

function CourseGpaChart({ courses, departmentOptions }) {
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [hoveredCourse, setHoveredCourse] = useState(null);

  // Filter courses based on selected department
  const displayedCourses = courses.filter((c) =>
    selectedDept === 'All Departments' ? true : c.department === selectedDept
  );

  // Calculate highest GPA and overall average
  const maxGpaCourse = displayedCourses.reduce(
    (max, c) => (c.avgGpa > (max ? max.avgGpa : 0) ? c : max),
    null
  );

  const overallAvg = displayedCourses.length
    ? (
        displayedCourses.reduce((sum, c) => sum + (c.avgGpa || 3.0), 0) /
        displayedCourses.length
      ).toFixed(2)
    : '0.00';

  // Department colors mapping
  const getDeptColor = (dept) => {
    switch (dept) {
      case 'Computer Science':
        return '#2563eb'; // blue
      case 'Software Engineering':
        return '#6366f1'; // indigo
      case 'Artificial Intelligence':
        return '#10b981'; // emerald
      case 'Information Technology':
        return '#f59e0b'; // amber
      default:
        return '#3b82f6';
    }
  };

  return (
    <div className="course-gpa-card">
      {/* Chart Header Bar */}
      <div className="chart-header">
        <div className="chart-title-area">
          <div className="chart-badge">📊 Academic Performance Analytics</div>
          <h2 className="chart-heading">Course-wise Average GPA Comparison</h2>
          <p className="chart-subheading">
            Comparative average GPA analysis across active courses (Scale: 0.0 - 4.0 GPA)
          </p>
        </div>

        {/* Filter and Quick Metrics */}
        <div className="chart-controls">
          <div className="metric-pill">
            <span className="pill-dot" style={{ backgroundColor: '#10b981' }}></span>
            <span className="pill-text">Highest:</span>
            <strong>{maxGpaCourse ? `${maxGpaCourse.code} (${maxGpaCourse.avgGpa})` : 'N/A'}</strong>
          </div>

          <div className="metric-pill">
            <span className="pill-dot" style={{ backgroundColor: '#2563eb' }}></span>
            <span className="pill-text">Overall Avg:</span>
            <strong>{overallAvg} GPA</strong>
          </div>

          <div className="chart-dept-filter">
            <label htmlFor="chart-dept-select" className="filter-label">Filter:</label>
            <select
              id="chart-dept-select"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="chart-select"
            >
              <option value="All Departments">All Departments</option>
              {departmentOptions.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Bar Chart Container */}
      <div className="chart-wrapper">
        {/* Y-Axis Labels & Grid Lines */}
        <div className="chart-grid">
          <div className="grid-line" style={{ bottom: '100%' }}>
            <span className="axis-label">4.0</span>
          </div>
          <div className="grid-line" style={{ bottom: '75%' }}>
            <span className="axis-label">3.0</span>
          </div>
          <div className="grid-line" style={{ bottom: '50%' }}>
            <span className="axis-label">2.0</span>
          </div>
          <div className="grid-line" style={{ bottom: '25%' }}>
            <span className="axis-label">1.0</span>
          </div>
          <div className="grid-line" style={{ bottom: '0%' }}>
            <span className="axis-label">0.0</span>
          </div>
        </div>

        {/* The Bars */}
        <div className="bars-container">
          {displayedCourses.map((course) => {
            const gpaValue = course.avgGpa || 3.0;
            const barHeightPercent = Math.min(100, Math.max(5, (gpaValue / 4.0) * 100));
            const barColor = getDeptColor(course.department);
            const isHovered = hoveredCourse && hoveredCourse.id === course.id;

            return (
              <div
                key={course.id}
                className="bar-column"
                onMouseEnter={() => setHoveredCourse(course)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                {/* GPA Value Badge on Top */}
                <span className={`bar-value-badge ${isHovered ? 'badge-hover' : ''}`}>
                  {gpaValue.toFixed(2)}
                </span>

                {/* Animated Bar with Visual Gradient */}
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      height: `${barHeightPercent}%`,
                      backgroundColor: barColor,
                      boxShadow: isHovered ? `0 0 12px ${barColor}99` : 'none',
                    }}
                  ></div>
                </div>

                {/* X-Axis Course Code */}
                <span className="bar-label-code" title={course.title}>
                  {course.code}
                </span>

                {/* Department dot */}
                <span
                  className="bar-dept-dot"
                  style={{ backgroundColor: barColor }}
                  title={course.department}
                ></span>
              </div>
            );
          })}
        </div>

        {/* Hover Tooltip Overlay */}
        {hoveredCourse && (
          <div className="chart-tooltip">
            <div className="tooltip-header">
              <span className="tooltip-code">{hoveredCourse.code}</span>
              <span className="tooltip-gpa">Avg GPA: {hoveredCourse.avgGpa}</span>
            </div>
            <div className="tooltip-title">{hoveredCourse.title}</div>
            <div className="tooltip-meta">
              <span>🏛️ {hoveredCourse.department}</span>
              <span>👨‍🏫 {hoveredCourse.instructor}</span>
              <span>👥 {hoveredCourse.studentsEnrolled || 45} Students</span>
            </div>
          </div>
        )}
      </div>

      {/* Department Legend */}
      <div className="chart-legend">
        <span className="legend-title">Department Colors:</span>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#2563eb' }}></span>
          <span>Computer Science</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#6366f1' }}></span>
          <span>Software Engineering</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
          <span>Artificial Intelligence</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></span>
          <span>Information Technology</span>
        </div>
      </div>
    </div>
  );
}

export default CourseGpaChart;
