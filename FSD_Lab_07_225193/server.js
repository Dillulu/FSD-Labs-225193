require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const crypto = require('crypto');
const path = require('path');
const app = express();
if (!process.env.ADMIN_API_KEY) throw new Error('Set ADMIN_API_KEY in .env first.');
const db = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1', port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root', password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'university_api_lab7', connectionLimit: 5
});
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public/admin.html')));
app.get('/settings', (req, res) => res.sendFile(path.join(__dirname, 'public/settings.html')));
const run = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const integer = value => Number.isInteger(value) && value > 0 && value <= 1000000;
function admin(req, res, next) {
  if (hash(req.get('X-API-Key') || '') !== hash(process.env.ADMIN_API_KEY))
    return res.status(401).json({ error: 'Invalid admin API key.' });
  next();
}
const member = run(async (req, res, next) => {
  const [rows] = await db.execute('SELECT * FROM api_keys WHERE key_hash = ?', [hash(req.get('X-API-Key') || '')]);
  if (!rows.length) return res.status(401).json({ error: 'Invalid or missing API key.' });
  if (rows[0].revoked) return res.status(403).json({ error: 'This API key has been revoked.' });
  req.member = rows[0];
  next();
});
const teacher = (req, res, next) => {
  if (!req.member.teacher_id) return res.status(403).json({ error: 'Teachers only. Students may view only their own records.' });
  next();
};
const ownRecord = (req, res, next) => {
  if (!integer(Number(req.params.id))) return res.status(400).json({ error: 'Invalid student ID.' });
  if (req.member.student_id && req.member.student_id !== Number(req.params.id))
    return res.status(403).json({ error: 'Access denied: you may view only your own record.' });
  next();
};
// Atomic update prevents simultaneous requests from exceeding the lifetime limit.
const quota = run(async (req, res, next) => {
  const [result] = await db.execute(
    'UPDATE api_keys SET used_requests = used_requests + 1 WHERE id = ? AND revoked = FALSE AND used_requests < request_limit',
    [req.member.id]);
  if (!result.affectedRows) {
    const [[current]] = await db.execute('SELECT revoked FROM api_keys WHERE id = ?', [req.member.id]);
    return res.status(current?.revoked ? 403 : 429).json({ error: current?.revoked ? 'This API key has been revoked.' : 'Request limit reached. Ask the administrator to raise it.' });
  }
  next();
});

app.use('/api/admin', admin);
app.get('/api/admin/people', run(async (req, res) => {
  const [students] = await db.query('SELECT * FROM students ORDER BY id');
  const [teachers] = await db.query('SELECT * FROM teachers ORDER BY id');
  res.json({ students, teachers });
}));
app.get('/api/admin/keys', run(async (req, res) => {
  const [keys] = await db.query(`SELECT k.id, k.key_prefix, k.request_limit, k.used_requests,
    k.revoked, k.created_at, COALESCE(s.name, t.name) AS owner,
    IF(k.student_id IS NULL, 'teacher', 'student') AS role
    FROM api_keys k LEFT JOIN students s ON s.id = k.student_id
    LEFT JOIN teachers t ON t.id = k.teacher_id ORDER BY k.id DESC`);
  res.json(keys);
}));
app.post('/api/admin/keys', run(async (req, res) => {
  const { role, ownerId, requestLimit } = req.body;
  if (!['student', 'teacher'].includes(role) || !integer(ownerId) || !integer(requestLimit))
    return res.status(400).json({ error: 'Choose a valid role, owner and limit (1 to 1000000).' });
  const table = role === 'student' ? 'students' : 'teachers';
  const [[owner]] = await db.execute(`SELECT id FROM ${table} WHERE id = ?`, [ownerId]);
  if (!owner) return res.status(404).json({ error: 'Owner not found.' });
  const key = 'uni_' + crypto.randomBytes(24).toString('hex');
  const [result] = await db.execute(`INSERT INTO api_keys
    (key_hash, key_prefix, student_id, teacher_id, request_limit) VALUES (?, ?, ?, ?, ?)`,
    [hash(key), key.slice(0, 12), role === 'student' ? ownerId : null, role === 'teacher' ? ownerId : null, requestLimit]);
  res.status(201).json({ id: result.insertId, apiKey: key, message: 'Copy this key now. It is shown only once.' });
}));
app.patch('/api/admin/keys/:id', run(async (req, res) => {
  if (!integer(Number(req.params.id)) || !integer(req.body.requestLimit))
    return res.status(400).json({ error: 'Valid ID and limit (1 to 1000000) required.' });
  const [[key]] = await db.execute('SELECT id FROM api_keys WHERE id = ?', [req.params.id]);
  if (!key) return res.status(404).json({ error: 'Key not found.' });
  await db.execute('UPDATE api_keys SET request_limit = ? WHERE id = ?', [req.body.requestLimit, req.params.id]);
  res.json({ message: 'Request limit updated. Usage is unchanged.' });
}));
app.delete('/api/admin/keys/:id', run(async (req, res) => {
  if (!integer(Number(req.params.id))) return res.status(400).json({ error: 'Invalid key ID.' });
  const [result] = await db.execute('UPDATE api_keys SET revoked = TRUE WHERE id = ?', [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ error: 'Key not found.' });
  res.json({ message: 'Key revoked.' });
}));
app.get('/api/me', member, quota, run(async (req, res) => {
  const role = req.member.student_id ? 'student' : 'teacher';
  const id = req.member.student_id || req.member.teacher_id;
  const [[person]] = await db.execute(`SELECT * FROM ${role === 'student' ? 'students' : 'teachers'} WHERE id = ?`, [id]);
  let marks = [];
  if (role === 'student') [marks] = await db.execute('SELECT subject, obtained, total FROM marks WHERE student_id = ? ORDER BY id', [id]);
  res.json({ role, person, marks });
}));
app.get('/api/students', member, teacher, quota, run(async (req, res) => {
  const [rows] = await db.query(`SELECT s.id, s.name, s.registration, s.program, m.subject, m.obtained, m.total
    FROM students s LEFT JOIN marks m ON m.student_id = s.id ORDER BY s.id, m.id`);
  res.json(rows);
}));
app.get('/api/students/:id', member, ownRecord, quota, run(async (req, res) => {
  const [[student]] = await db.execute('SELECT * FROM students WHERE id = ?', [req.params.id]);
  if (!student) return res.status(404).json({ error: 'Student not found.' });
  const [marks] = await db.execute('SELECT subject, obtained, total FROM marks WHERE student_id = ? ORDER BY id', [student.id]);
  res.json({ student, marks });
}));
app.use('/api', (req, res) => res.status(404).json({ error: 'API endpoint not found.' }));
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON body.' });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request body is too large.' });
  console.error(err.message);
  res.status(500).json({ error: 'Server error. Check the database connection and server terminal.' });
});
db.query('SELECT 1').then(() => app.listen(process.env.PORT || 3000, () => {
  console.log('University API running at http://localhost:' + (process.env.PORT || 3000));
})).catch(err => { console.error('Database connection failed:', err.message); process.exit(1); });
