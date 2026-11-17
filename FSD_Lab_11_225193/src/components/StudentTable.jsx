// StudentTable.jsx - Student controls and reusable prop-driven student rows
function StudentRow({ student, onDelete }) {
  return (
    <tr>
      <td className="roll-no">{student.rollNumber}</td>
      <td className="student-name">{student.name}</td>
      <td>{student.department}</td>
      <td>{student.semester}</td>
      <td>{student.email}</td>
      <td className="gpa-value">{student.gpa}</td>
      <td>
        <span className={`badge badge-${student.status.toLowerCase()}`}>
          {student.status}
        </span>
      </td>
      <td>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

function StudentTable({
  students,
  filteredStudents,
  searchTerm,
  onSearchChange,
  onClearSearch,
  selectedDepartment,
  onDepartmentChange,
  departmentOptions,
  isAddFormVisible,
  onToggleAddForm,
  newStudent,
  onNewStudentChange,
  onAddStudent,
  onDeleteStudent,
}) {
  const displayList = filteredStudents || students;
  const isFiltered = searchTerm.trim() !== '' || selectedDepartment !== 'All Departments';

  return (
    <div className="table-container">
      <div className="table-header-bar">
        <div>
          <h2 className="table-title">Enrolled Students</h2>
          <p className="table-description">
            {isFiltered
              ? `Showing ${displayList.length} of ${students.length} students`
              : `${students.length} local student records`}
          </p>
        </div>
        <button type="button" className="btn-view-all" onClick={onToggleAddForm}>
          {isAddFormVisible ? 'Close Form' : 'Add Student'}
        </button>
      </div>

      {/* Lab Task 1 & Lab Task 2: Search and Department Filter Toolbar */}
      <div className="table-controls-bar">
        <div className="search-control">
          <label htmlFor="student-search" className="control-label">Search:</label>
          <div className="search-input-wrapper">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              id="student-search"
              type="text"
              className="search-input"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={onSearchChange}
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={onClearSearch}
                aria-label="Clear search"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="filter-control">
          <label htmlFor="department-filter" className="control-label">Department:</label>
          <select
            id="department-filter"
            className="filter-select"
            value={selectedDepartment}
            onChange={onDepartmentChange}
          >
            <option value="All Departments">All Departments</option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {isAddFormVisible && (
        <form className="student-form" onSubmit={onAddStudent}>
          <h3 className="form-title">Add New Student</h3>
          <div className="form-grid">
            <label>
              Name
              <input name="name" value={newStudent.name} onChange={onNewStudentChange} required />
            </label>
            <label>
              Roll Number
              <input name="rollNumber" value={newStudent.rollNumber} onChange={onNewStudentChange} required />
            </label>
            <label>
              Department
              <select name="department" value={newStudent.department} onChange={onNewStudentChange}>
                {departmentOptions.map((department) => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </label>
            <label>
              Semester
              <select name="semester" value={newStudent.semester} onChange={onNewStudentChange}>
                {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map((semester) => (
                  <option key={semester} value={semester}>{semester}</option>
                ))}
              </select>
            </label>
            <label>
              Email
              <input type="email" name="email" value={newStudent.email} onChange={onNewStudentChange} required />
            </label>
          </div>
          <button type="submit" className="btn-submit">Save Student</button>
        </form>
      )}

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Email</th>
              <th>GPA</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayList.length > 0 ? (
              displayList.map((student) => (
                <StudentRow key={student.id} student={student} onDelete={onDeleteStudent} />
              ))
            ) : (
              <tr>
                <td colSpan="8" className="empty-state">
                  <div className="empty-state-content">
                    <span className="empty-state-icon" aria-hidden="true">🔍</span>
                    <p className="empty-state-title">No matching students found</p>
                    <p className="empty-state-desc">
                      {searchTerm.trim() && selectedDepartment !== 'All Departments'
                        ? `No students found matching "${searchTerm}" in the "${selectedDepartment}" department.`
                        : searchTerm.trim()
                        ? `No students found matching "${searchTerm}". Try checking your spelling or roll number.`
                        : selectedDepartment !== 'All Departments'
                        ? `No students currently enrolled in the "${selectedDepartment}" department.`
                        : 'No student records available.'}
                    </p>
                    {isFiltered && (
                      <button
                        type="button"
                        className="btn-reset-filters"
                        onClick={() => {
                          onClearSearch();
                          onDepartmentChange({ target: { value: 'All Departments' } });
                        }}
                      >
                        Reset Search & Filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
