-- Synthetic lab fixtures: all marks are fictional demonstration values.
-- The student owner requested this project upload. Other identities below are generic demo records.
CREATE DATABASE IF NOT EXISTS university_api_lab7;
USE university_api_lab7;

CREATE TABLE IF NOT EXISTS students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  registration VARCHAR(30) NOT NULL UNIQUE,
  program VARCHAR(60) NOT NULL
);
CREATE TABLE IF NOT EXISTS teachers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  department VARCHAR(60) NOT NULL
);
CREATE TABLE IF NOT EXISTS marks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  subject VARCHAR(80) NOT NULL,
  obtained DECIMAL(5,2) NOT NULL,
  total DECIMAL(5,2) NOT NULL DEFAULT 100,
  UNIQUE KEY student_subject (student_id, subject),
  FOREIGN KEY (student_id) REFERENCES students(id)
);
CREATE TABLE IF NOT EXISTS api_keys (
  id INT PRIMARY KEY AUTO_INCREMENT,
  key_hash CHAR(64) NOT NULL UNIQUE,
  key_prefix VARCHAR(16) NOT NULL,
  student_id INT NULL,
  teacher_id INT NULL,
  request_limit INT NOT NULL,
  used_requests INT NOT NULL DEFAULT 0,
  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  CHECK ((student_id IS NOT NULL AND teacher_id IS NULL) OR
         (student_id IS NULL AND teacher_id IS NOT NULL)),
  CHECK (request_limit > 0 AND used_requests >= 0)
);

INSERT IGNORE INTO students VALUES
(1, 'Hamza Tahir', '225193', 'BS Computer Science'),
(2, 'Demo Student Two', 'DEMO002', 'BS Computer Science'),
(3, 'Demo Student Three', 'DEMO003', 'BS Computer Science');
INSERT IGNORE INTO teachers VALUES
(1, 'Demo Teacher One', 'Computer Science'),
(2, 'Demo Teacher Two', 'Computer Science');
INSERT IGNORE INTO marks (student_id, subject, obtained, total) VALUES
(1, 'Full Stack Development', 85, 100), (1, 'Database Systems', 79, 100),
(2, 'Full Stack Development', 82, 100), (2, 'Database Systems', 88, 100),
(3, 'Full Stack Development', 75, 100), (3, 'Database Systems', 80, 100);
