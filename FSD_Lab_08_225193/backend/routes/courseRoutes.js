const express = require('express');
const db = require('../config/db');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

function parsePositiveId(rawId) {
  const num = Number(rawId);
  return Number.isInteger(num) && num > 0 ? num : null;
}

function validateCourseInput(body) {
  const courseCode = typeof body.courseCode === 'string' ? body.courseCode.trim().toUpperCase() : '';
  const title = typeof body.title === 'string' ? body.title.trim() : '';
  const instructor = typeof body.instructor === 'string' ? body.instructor.trim() : '';
  const semester = typeof body.semester === 'string' ? body.semester.trim() : '';
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  const credits = Number(body.credits);

  if (!courseCode || courseCode.length > 20) {
    return { error: 'Course code is required (max 20 characters).' };
  }
  if (!title || title.length > 120) {
    return { error: 'Course title is required (max 120 characters).' };
  }
  if (!instructor || instructor.length > 100) {
    return { error: 'Instructor name is required (max 100 characters).' };
  }
  if (!Number.isInteger(credits) || credits < 1 || credits > 6) {
    return { error: 'Credits must be an integer between 1 and 6.' };
  }
  if (!semester || semester.length > 40) {
    return { error: 'Semester is required (max 40 characters).' };
  }

  return { courseCode, title, instructor, credits, semester, description };
}

router.get('/', authenticateToken, authorizeRole('student', 'admin'), async (req, res, next) => {
  try {
    const [courses] = await db.execute(
      `SELECT id, course_code AS courseCode, title, instructor, credits, semester, description, created_at AS createdAt
       FROM courses
       ORDER BY course_code ASC`
    );
    return res.status(200).json({ courses });
  } catch (err) {
    return next(err);
  }
});

router.post('/', authenticateToken, authorizeRole('admin'), async (req, res, next) => {
  try {
    const parsed = validateCourseInput(req.body || {});
    if (parsed.error) {
      return res.status(400).json({ error: parsed.error });
    }

    const [existing] = await db.execute('SELECT id FROM courses WHERE course_code = ?', [parsed.courseCode]);
    if (existing.length > 0) {
      return res.status(409).json({ error: `Course code ${parsed.courseCode} already exists.` });
    }

    const [result] = await db.execute(
      `INSERT INTO courses (course_code, title, instructor, credits, semester, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [parsed.courseCode, parsed.title, parsed.instructor, parsed.credits, parsed.semester, parsed.description]
    );

    const [[course]] = await db.execute(
      `SELECT id, course_code AS courseCode, title, instructor, credits, semester, description, created_at AS createdAt
       FROM courses WHERE id = ?`,
      [result.insertId]
    );

    return res.status(201).json({ message: 'Course added successfully.', course });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Course code already exists.' });
    }
    return next(err);
  }
});

router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res, next) => {
  try {
    const courseId = parsePositiveId(req.params.id);
    if (!courseId) {
      return res.status(400).json({ error: 'Invalid course ID.' });
    }

    const parsed = validateCourseInput(req.body || {});
    if (parsed.error) {
      return res.status(400).json({ error: parsed.error });
    }

    const [existing] = await db.execute('SELECT id FROM courses WHERE id = ?', [courseId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    const [duplicateCode] = await db.execute(
      'SELECT id FROM courses WHERE course_code = ? AND id <> ?',
      [parsed.courseCode, courseId]
    );
    if (duplicateCode.length > 0) {
      return res.status(409).json({ error: `Course code ${parsed.courseCode} is used by another course.` });
    }

    await db.execute(
      `UPDATE courses
       SET course_code = ?, title = ?, instructor = ?, credits = ?, semester = ?, description = ?
       WHERE id = ?`,
      [parsed.courseCode, parsed.title, parsed.instructor, parsed.credits, parsed.semester, parsed.description, courseId]
    );

    const [[course]] = await db.execute(
      `SELECT id, course_code AS courseCode, title, instructor, credits, semester, description, created_at AS createdAt
       FROM courses WHERE id = ?`,
      [courseId]
    );

    return res.status(200).json({ message: 'Course updated successfully.', course });
  } catch (err) {
    return next(err);
  }
});

router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res, next) => {
  try {
    const courseId = parsePositiveId(req.params.id);
    if (!courseId) {
      return res.status(400).json({ error: 'Invalid course ID.' });
    }

    const [result] = await db.execute('DELETE FROM courses WHERE id = ?', [courseId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    return res.status(200).json({ message: 'Course deleted successfully.' });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
