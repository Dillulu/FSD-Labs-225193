// App.jsx - Main Dashboard Component that combines all subcomponents
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import StudentTable from './components/StudentTable';
import RecentActivity from './components/RecentActivity';
import CoursesSection from './components/CoursesSection';
import AttendanceSection from './components/AttendanceSection';
import SettingsSection from './components/SettingsSection';
import CourseGpaChart from './components/CourseGpaChart';
import {
  departmentOptions,
  initialStudents,
  initialCourses,
  initialAttendance,
  newStudentDefaults,
  newCourseDefaults,
  summaryCardData,
} from './data/dashboardData';
import './App.css';

function App() {
  // Navigation & System Status States
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSystemOnline, setIsSystemOnline] = useState(true);

  // Student State & Lab Task 1 & 2 Filtering States
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [newStudent, setNewStudent] = useState(newStudentDefaults);

  // Courses & Attendance States
  const [courses, setCourses] = useState(initialCourses);
  const [newCourse, setNewCourse] = useState(newCourseDefaults);
  const [attendanceRecords] = useState(initialAttendance);

  // Derived departments & dynamic summary metrics
  const departments = [...new Set(students.map((student) => student.department))];
  const summaryCards = summaryCardData.map((card) => {
    if (card.id === 'totalStudents') {
      return { ...card, value: students.length };
    }
    if (card.id === 'departments') {
      return { ...card, value: departments.length };
    }
    if (card.id === 'activeCourses') {
      return { ...card, value: courses.length };
    }
    return card;
  });

  // Student Handlers
  const handleAddStudent = (event) => {
    event.preventDefault();
    setStudents((currentStudents) => [
      ...currentStudents,
      {
        ...newStudent,
        id: Date.now(),
        gpa: '0.00',
        status: 'Active',
      },
    ]);
    setNewStudent(newStudentDefaults);
    setIsAddFormVisible(false);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId)
    );
  };

  const handleNewStudentChange = (event) => {
    const { name, value } = event.target;
    setNewStudent((currentStudent) => ({
      ...currentStudent,
      [name]: value,
    }));
  };

  // Lab Task 1: Student Search handler
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Lab Task 2: Department Filter handler
  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  // Course Handlers
  const handleAddCourse = (event) => {
    event.preventDefault();
    const courseToAdd = {
      ...newCourse,
      id: Date.now(),
      credits: Number(newCourse.credits) || 3,
      studentsEnrolled: Math.floor(Math.random() * 20) + 40,
    };
    setCourses((prev) => [...prev, courseToAdd]);
    setNewCourse(newCourseDefaults);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((course) => course.id !== courseId));
  };

  const handleNewCourseChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // System Status Toggle Handler
  const handleToggleSystemStatus = () => {
    setIsSystemOnline((prev) => !prev);
  };

  // Multi-criteria Student Filter
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      term === '' ||
      student.name.toLowerCase().includes(term) ||
      student.rollNumber.toLowerCase().includes(term);

    const matchesDepartment =
      selectedDepartment === 'All Departments' ||
      student.department.toLowerCase() === selectedDepartment.toLowerCase();

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
        activeSection={activeSection}
        onSelectSection={(section) => setActiveSection(section)}
        isSystemOnline={isSystemOnline}
        onToggleSystemStatus={handleToggleSystemStatus}
      />

      {/* 2. Main Content Area */}
      <div className="main-wrapper">
        {/* Top Header */}
        <Header activeSection={activeSection} isSystemOnline={isSystemOnline} />

        {/* Dashboard Main Workspace */}
        <main className="dashboard-content">
          {/* Main Dashboard Overview */}
          {activeSection === 'dashboard' && (
            <>
              {/* Course-wise Average GPA Comparison Bar Graph (Top of Dashboard) */}
              <CourseGpaChart
                courses={courses}
                departmentOptions={departmentOptions}
              />

              {/* Key Metric Summary Cards */}
              <SummaryCards cards={summaryCards} />

              {/* Main Content Grid: Table and Recent Activity */}
              <div className="content-grid">
                <StudentTable
                  students={students}
                  filteredStudents={filteredStudents}
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                  onClearSearch={handleClearSearch}
                  selectedDepartment={selectedDepartment}
                  onDepartmentChange={handleDepartmentChange}
                  departmentOptions={departmentOptions}
                  isAddFormVisible={isAddFormVisible}
                  onToggleAddForm={() => setIsAddFormVisible((visible) => !visible)}
                  newStudent={newStudent}
                  onNewStudentChange={handleNewStudentChange}
                  onAddStudent={handleAddStudent}
                  onDeleteStudent={handleDeleteStudent}
                />
                <RecentActivity />
              </div>
            </>
          )}

          {/* Students Section */}
          {activeSection === 'students' && (
            <div className="single-section-view">
              <StudentTable
                students={students}
                filteredStudents={filteredStudents}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
                selectedDepartment={selectedDepartment}
                onDepartmentChange={handleDepartmentChange}
                departmentOptions={departmentOptions}
                isAddFormVisible={isAddFormVisible}
                onToggleAddForm={() => setIsAddFormVisible((visible) => !visible)}
                newStudent={newStudent}
                onNewStudentChange={handleNewStudentChange}
                onAddStudent={handleAddStudent}
                onDeleteStudent={handleDeleteStudent}
              />
            </div>
          )}

          {/* Courses Section */}
          {activeSection === 'courses' && (
            <CoursesSection
              courses={courses}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
              departmentOptions={departmentOptions}
              newCourse={newCourse}
              onNewCourseChange={handleNewCourseChange}
            />
          )}

          {/* Attendance Section */}
          {activeSection === 'attendance' && (
            <AttendanceSection
              attendanceRecords={attendanceRecords}
              departmentOptions={departmentOptions}
            />
          )}

          {/* Settings Section with Online/Offline Toggle */}
          {activeSection === 'settings' && (
            <SettingsSection
              isSystemOnline={isSystemOnline}
              onToggleSystemStatus={handleToggleSystemStatus}
              studentName="Hamza Tahir"
              regNumber="225193"
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
