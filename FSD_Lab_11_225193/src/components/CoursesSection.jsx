// CoursesSection.jsx - Comprehensive course management with dynamic course creation
import { useState } from 'react';

function CoursesSection({
  courses,
  onAddCourse,
  onDeleteCourse,
  departmentOptions,
  newCourse,
  onNewCourseChange,
}) {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');

  const filteredCourses = courses.filter((course) => {
    const term = courseSearch.toLowerCase().trim();
    const matchesSearch =
      term === '' ||
      course.title.toLowerCase().includes(term) ||
      course.code.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term);

    const matchesDept =
      selectedDept === 'All Departments' ||
      course.department.toLowerCase() === selectedDept.toLowerCase();

    return matchesSearch && matchesDept;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCourse(e);
    setIsAddFormVisible(false);
  };

  return (
    <div className="section-container">
      {/* Top Banner & Quick Metrics */}
      <div className="section-header-cards">
        <div className="section-metric-card">
          <span className="metric-icon">📚</span>
          <div>
            <h3>Total Courses</h3>
            <p className="metric-num">{courses.length}</p>
          </div>
        </div>
        <div className="section-metric-card">
          <span className="metric-icon">🏛️</span>
          <div>
            <h3>Departments</h3>
            <p className="metric-num">{departmentOptions.length}</p>
          </div>
        </div>
        <div className="section-metric-card">
          <span className="metric-icon">👨‍🏫</span>
          <div>
            <h3>Active Faculty</h3>
            <p className="metric-num">
              {[...new Set(courses.map((c) => c.instructor))].length}
            </p>
          </div>
        </div>
      </div>

      <div className="table-container">
        {/* Table Header Bar */}
        <div className="table-header-bar">
          <div>
            <h2 className="table-title">Course Offerings</h2>
            <p className="table-description">
              Showing {filteredCourses.length} of {courses.length} courses in Fall 2026
            </p>
          </div>
          <button
            type="button"
            className="btn-view-all"
            onClick={() => setIsAddFormVisible((prev) => !prev)}
          >
            {isAddFormVisible ? 'Close Form' : '+ Add New Course'}
          </button>
        </div>

        {/* Filter and Search Toolbar */}
        <div className="table-controls-bar">
          <div className="search-control">
            <label htmlFor="course-search" className="control-label">Search:</label>
            <div className="search-input-wrapper">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                id="course-search"
                type="text"
                className="search-input"
                placeholder="Search course title, code, or instructor..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
              />
              {courseSearch && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setCourseSearch('')}
                  title="Clear course search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="filter-control">
            <label htmlFor="course-dept-filter" className="control-label">Department:</label>
            <select
              id="course-dept-filter"
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

        {/* Add Course Form */}
        {isAddFormVisible && (
          <form className="student-form" onSubmit={handleSubmit}>
            <h3 className="form-title">Add New University Course</h3>
            <div className="form-grid">
              <label>
                Course Code
                <input
                  name="code"
                  placeholder="e.g. CS-405"
                  value={newCourse.code}
                  onChange={onNewCourseChange}
                  required
                />
              </label>
              <label>
                Course Title
                <input
                  name="title"
                  placeholder="e.g. Cloud Computing & DevOps"
                  value={newCourse.title}
                  onChange={onNewCourseChange}
                  required
                />
              </label>
              <label>
                Department
                <select
                  name="department"
                  value={newCourse.department}
                  onChange={onNewCourseChange}
                >
                  {departmentOptions.map((department) => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </select>
              </label>
              <label>
                Credit Hours
                <select
                  name="credits"
                  value={newCourse.credits}
                  onChange={onNewCourseChange}
                >
                  <option value="1">1 Credit Hour</option>
                  <option value="2">2 Credit Hours</option>
                  <option value="3">3 Credit Hours</option>
                  <option value="4">4 Credit Hours</option>
                </select>
              </label>
              <label>
                Instructor Name
                <input
                  name="instructor"
                  placeholder="e.g. Dr. Ahmed Bilal"
                  value={newCourse.instructor}
                  onChange={onNewCourseChange}
                  required
                />
              </label>
              <label>
                Semester
                <select
                  name="semester"
                  value={newCourse.semester}
                  onChange={onNewCourseChange}
                >
                  {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map((sem) => (
                    <option key={sem} value={sem}>{sem}</option>
                  ))}
                </select>
              </label>
            </div>
            <button type="submit" className="btn-submit">Save Course</button>
          </form>
        )}

        {/* Course List Table */}
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Course Title</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Instructor</th>
                <th>Semester</th>
                <th>Enrolled</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="roll-no">{course.code}</td>
                    <td className="student-name">{course.title}</td>
                    <td>{course.department}</td>
                    <td>{course.credits} Cr.</td>
                    <td>{course.instructor}</td>
                    <td>{course.semester}</td>
                    <td>
                      <span className="badge badge-active">
                        {course.studentsEnrolled || 45} Students
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => onDeleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">
                    <div className="empty-state-content">
                      <span className="empty-state-icon" aria-hidden="true">🔍</span>
                      <p className="empty-state-title">No matching courses found</p>
                      <p className="empty-state-desc">
                        No courses match your search or department filter.
                      </p>
                      <button
                        type="button"
                        className="btn-reset-filters"
                        onClick={() => {
                          setCourseSearch('');
                          setSelectedDept('All Departments');
                        }}
                      >
                        Reset Course Filters
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

export default CoursesSection;
