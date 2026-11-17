// dashboardData.js - Local dashboard data used by the application
export const initialStudents = [
  { id: 1, name: 'Ali Khan', rollNumber: 'CS-101', department: 'Computer Science', semester: '5th', email: 'ali.khan@campushub.edu', gpa: '3.72', status: 'Active' },
  { id: 2, name: 'Sara Ahmed', rollNumber: 'CS-102', department: 'Computer Science', semester: '3rd', email: 'sara.ahmed@campushub.edu', gpa: '3.91', status: 'Active' },
  { id: 3, name: 'Hamza Malik', rollNumber: 'SE-103', department: 'Software Engineering', semester: '7th', email: 'hamza.malik@campushub.edu', gpa: '3.45', status: 'Active' },
  { id: 4, name: 'Ayesha Noor', rollNumber: 'AI-104', department: 'Artificial Intelligence', semester: '5th', email: 'ayesha.noor@campushub.edu', gpa: '3.84', status: 'Active' },
  { id: 5, name: 'Bilal Hassan', rollNumber: 'IT-105', department: 'Information Technology', semester: '1st', email: 'bilal.hassan@campushub.edu', gpa: '3.20', status: 'Inactive' },
  { id: 6, name: 'Hira Shah', rollNumber: 'SE-106', department: 'Software Engineering', semester: '3rd', email: 'hira.shah@campushub.edu', gpa: '3.68', status: 'Active' },
];

export const initialCourses = [
  { id: 101, code: 'CS-301L', title: 'Full Stack Development Lab', department: 'Computer Science', credits: 1, instructor: 'M. Fahad Qasim', studentsEnrolled: 48, semester: '5th', avgGpa: 3.82 },
  { id: 102, code: 'CS-301', title: 'Full Stack Development (Theory)', department: 'Computer Science', credits: 3, instructor: 'Dr. Tariq Mahmood', studentsEnrolled: 52, semester: '5th', avgGpa: 3.45 },
  { id: 103, code: 'CS-204', title: 'Data Structures & Algorithms', department: 'Computer Science', credits: 4, instructor: 'Dr. Usman Bashir', studentsEnrolled: 60, semester: '3rd', avgGpa: 3.25 },
  { id: 104, code: 'SE-302', title: 'Software Architecture & Design', department: 'Software Engineering', credits: 3, instructor: 'Engr. Sarah Khan', studentsEnrolled: 42, semester: '7th', avgGpa: 3.68 },
  { id: 105, code: 'SE-201', title: 'Software Requirement Engineering', department: 'Software Engineering', credits: 3, instructor: 'Engr. Bilal Aslam', studentsEnrolled: 40, semester: '3rd', avgGpa: 3.52 },
  { id: 106, code: 'AI-201', title: 'Introduction to Artificial Intelligence', department: 'Artificial Intelligence', credits: 3, instructor: 'Dr. Zeeshan Ali', studentsEnrolled: 55, semester: '5th', avgGpa: 3.78 },
  { id: 107, code: 'AI-302', title: 'Deep Learning & Neural Networks', department: 'Artificial Intelligence', credits: 4, instructor: 'Dr. Amna Riaz', studentsEnrolled: 38, semester: '7th', avgGpa: 3.38 },
  { id: 108, code: 'IT-101', title: 'Introduction to Information Tech', department: 'Information Technology', credits: 3, instructor: 'Engr. Kamran Shah', studentsEnrolled: 62, semester: '1st', avgGpa: 3.18 },
  { id: 109, code: 'IT-205', title: 'Network Administration & Security', department: 'Information Technology', credits: 3, instructor: 'Engr. Hamza Farooq', studentsEnrolled: 35, semester: '3rd', avgGpa: 3.42 },
  { id: 110, code: 'CS-205', title: 'Database Management Systems', department: 'Computer Science', credits: 4, instructor: 'Dr. Noman Qureshi', studentsEnrolled: 58, semester: '3rd', avgGpa: 3.60 },
  { id: 111, code: 'CS-308', title: 'Operating Systems & Architecture', department: 'Computer Science', credits: 4, instructor: 'Engr. Asad Raza', studentsEnrolled: 50, semester: '5th', avgGpa: 3.30 },
  { id: 112, code: 'HU-102', title: 'Technical & Business Writing', department: 'Software Engineering', credits: 3, instructor: 'Prof. Maryam Siddiqui', studentsEnrolled: 65, semester: '3rd', avgGpa: 3.70 },
];

export const newCourseDefaults = {
  code: '',
  title: '',
  department: 'Computer Science',
  credits: 3,
  instructor: '',
  semester: '5th',
  studentsEnrolled: 0,
  avgGpa: 3.50,
};

export const initialAttendance = [
  { id: 1, rollNumber: 'CS-101', name: 'Ali Khan', department: 'Computer Science', totalClasses: 32, attended: 29, percentage: 91, status: 'Eligible' },
  { id: 2, rollNumber: 'CS-102', name: 'Sara Ahmed', department: 'Computer Science', totalClasses: 32, attended: 31, percentage: 97, status: 'Eligible' },
  { id: 3, rollNumber: 'SE-103', name: 'Hamza Malik', department: 'Software Engineering', totalClasses: 32, attended: 27, percentage: 84, status: 'Eligible' },
  { id: 4, rollNumber: 'AI-104', name: 'Ayesha Noor', department: 'Artificial Intelligence', totalClasses: 32, attended: 30, percentage: 94, status: 'Eligible' },
  { id: 5, rollNumber: 'IT-105', name: 'Bilal Hassan', department: 'Information Technology', totalClasses: 32, attended: 21, percentage: 66, status: 'Short Attendance' },
  { id: 6, rollNumber: 'SE-106', name: 'Hira Shah', department: 'Software Engineering', totalClasses: 32, attended: 29, percentage: 91, status: 'Eligible' },
];

export const summaryCardData = [
  {
    id: 'totalStudents',
    title: 'Total Students',
    icon: '👨‍🎓',
    description: 'Enrolled across all programs',
    theme: 'blue',
  },
  {
    id: 'activeCourses',
    title: 'Active Courses',
    value: '12',
    icon: '📚',
    description: 'Undergraduate offerings',
    theme: 'indigo',
  },
  {
    id: 'attendance',
    title: 'Average Attendance',
    value: '87%',
    icon: '📊',
    description: 'Current semester average',
    theme: 'emerald',
  },
  {
    id: 'departments',
    title: 'Departments',
    icon: '🏛️',
    description: 'Faculties in operation',
    theme: 'amber',
  },
];

export const departmentOptions = [
  'Computer Science',
  'Software Engineering',
  'Artificial Intelligence',
  'Information Technology',
];

export const newStudentDefaults = {
  name: '',
  rollNumber: '',
  department: departmentOptions[0],
  semester: '1st',
  email: '',
};
