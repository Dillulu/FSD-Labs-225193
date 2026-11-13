const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/register', async (req, res, next) => {
  try {
    const { fullName, email, password, role } = req.body || {};

    if (role !== undefined && role !== 'student') {
      return res.status(403).json({
        error: 'Cannot assign administrator role through public registration.'
      });
    }

    const cleanName = typeof fullName === 'string' ? fullName.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const rawPassword = typeof password === 'string' ? password : '';

    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({ error: 'Full name must be between 2 and 100 characters.' });
    }
    if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 120) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (rawPassword.length < 6 || rawPassword.length > 128) {
      return res.status(400).json({ error: 'Password must be between 6 and 128 characters.' });
    }

    const [existing] = await db.execute('SELECT id FROM users WHERE email = ?', [cleanEmail]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email address is already registered.' });
    }

    const passwordHash = await bcrypt.hash(rawPassword, 10);
    const assignedRole = 'student';

    const [result] = await db.execute(
      'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [cleanName, cleanEmail, passwordHash, assignedRole]
    );

    return res.status(201).json({
      message: 'Registration successful. You may now log in.',
      user: {
        id: result.insertId,
        fullName: cleanName,
        email: cleanEmail,
        role: assignedRole
      }
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email address is already registered.' });
    }
    return next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const rawPassword = typeof password === 'string' ? password : '';

    if (!EMAIL_REGEX.test(cleanEmail) || !rawPassword) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const [rows] = await db.execute(
      'SELECT id, full_name, email, password_hash, role FROM users WHERE email = ?',
      [cleanEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = rows[0];
    const passwordMatches = await bcrypt.compare(rawPassword, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const payload = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '2h'
    });

    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: payload
    });
  } catch (err) {
    return next(err);
  }
});

router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, full_name AS fullName, email, role, created_at AS createdAt FROM users WHERE id = ?',
      [req.user.id]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'User account no longer exists.' });
    }
    return res.status(200).json({ user: rows[0] });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
