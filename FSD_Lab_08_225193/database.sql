-- FSD Lab 08: University Course Management System
-- Muhammad Hamza Tahir | Registration ID: 225193
CREATE DATABASE IF NOT EXISTS UniversityDB;
USE UniversityDB;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_code VARCHAR(20) NOT NULL UNIQUE,
  title VARCHAR(120) NOT NULL,
  instructor VARCHAR(100) NOT NULL,
  credits INT NOT NULL DEFAULT 3,
  semester VARCHAR(40) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Demo accounts (passwords hashed with bcrypt, 10 rounds):
-- Admin:   admin@au.edu.pk / Admin@123
-- Student: hamza.225193@students.au.edu.pk / Student@123
INSERT IGNORE INTO users (id, full_name, email, password_hash, role) VALUES
(1, 'M. Fahad Qasim (Admin)', 'admin@au.edu.pk', '$2b$10$z/g0ci1sKevJBWnbe9TLHexzfx36TOkLPboHuxiVUnKuFwWiJTbLO', 'admin'),
(2, 'Hamza Tahir', 'hamza.225193@students.au.edu.pk', '$2b$10$jaSUIS.Nyy.LAGauL7QvZOa7YAiZeOTzVvP2/aHATu56brJVaqvDu', 'student');

INSERT IGNORE INTO courses (id, course_code, title, instructor, credits, semester, description) VALUES
(1, 'CS-301L', 'Full Stack Development Lab', 'M. Fahad Qasim', 1, 'BSCS VB', 'Modern web apps using jQuery AJAX, Node.js, Express.js, MySQL, and JWT authentication.'),
(2, 'CS-302', 'Database Systems', 'Dr. Ayesha Khan', 3, 'BSCS VB', 'Relational database design, SQL optimization, transactions, and normalization.'),
(3, 'CS-305', 'Operating Systems', 'Prof. Usman Tariq', 3, 'BSCS VB', 'Process scheduling, concurrency, memory management, and file systems.'),
(4, 'CS-309', 'Artificial Intelligence', 'Dr. Bilal Ahmed', 3, 'BSCS VB', 'Search algorithms, knowledge representation, machine learning, and reasoning.');
