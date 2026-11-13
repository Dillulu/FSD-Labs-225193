require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./backend/config/db');
const authRoutes = require('./backend/routes/authRoutes');
const courseRoutes = require('./backend/routes/courseRoutes');

if (!process.env.JWT_SECRET) {
  throw new Error('Set JWT_SECRET in .env before starting the server.');
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public/register.html')));
app.get('/student', (req, res) => res.sendFile(path.join(__dirname, 'public/student.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public/admin.html')));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' });
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON request body.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Request payload too large.' });
  }
  console.error('Server error:', err.message);
  return res.status(500).json({ error: 'Internal server error. Check database connection.' });
});

db.query('SELECT 1')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`University Course Management System running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
