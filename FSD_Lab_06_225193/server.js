require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
const pool = mysql.createPool({host: process.env.DB_HOST || '127.0.0.1', port: Number(process.env.DB_PORT || 3306), user: process.env.DB_USER || 'root', password: process.env.DB_PASSWORD || '', database: process.env.DB_NAME || 'lab06_portfolio'});
const categories = ['skills','education','experience','projects'];
const uploadDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadDir, {recursive:true});
app.use(express.json({limit:'20kb'}));
app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads', express.static(uploadDir));
const route = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);
const clean = (value, max) => typeof value === 'string' && value.trim().length <= max ? value.trim() : '';
const validId = value => /^[1-9]\d*$/.test(value) && Number.isSafeInteger(Number(value));
function removeImage(image) {
 if (image && image.startsWith('/uploads/')) fs.unlink(path.join(uploadDir,path.basename(image)), () => {});
}
app.get('/api/portfolio', route(async (req,res) => {
 const [profiles] = await pool.query('SELECT * FROM profile WHERE id=1');
 const [entries] = await pool.query('SELECT * FROM entries ORDER BY id');
 res.json({profile:profiles[0] || null, entries});
}));
app.put('/api/profile', route(async (req,res) => {
 const name=clean(req.body.name,100), title=clean(req.body.title,100), email=clean(req.body.email,150), bio=clean(req.body.bio,2000);
 if (!name || !title || !bio || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({message:'Enter a name, title, valid email and short bio.'});
 await pool.execute('INSERT INTO profile (id,name,title,email,bio) VALUES (1,?,?,?,?) ON DUPLICATE KEY UPDATE name=VALUES(name),title=VALUES(title),email=VALUES(email),bio=VALUES(bio)',[name,title,email,bio]);
 res.json({message:'Profile saved.'});
}));
app.delete('/api/profile', route(async (req,res) => {
 const [rows]=await pool.query('SELECT image FROM profile WHERE id=1');
 await pool.query('DELETE FROM profile WHERE id=1');
 removeImage(rows[0]?.image);
 res.json({message:'Profile deleted. Your section entries are kept.'});
}));
const upload = multer({storage:multer.memoryStorage(), limits:{fileSize:2*1024*1024}});
app.post('/api/profile/image', upload.single('image'), route(async (req,res) => {
 const [rows]=await pool.query('SELECT image FROM profile WHERE id=1');
 if (!rows.length) return res.status(400).json({message:'Save your profile first.'});
 const data=req.file?.buffer;
 let ext;
 if (data && data.length > 8 && data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) ext='png';
 else if (data && data.length > 3 && data[0]===255 && data[1]===216 && data[2]===255) ext='jpg';
 else return res.status(400).json({message:'Choose a JPG or PNG image (up to 2 MB).'});
 const image='/uploads/'+crypto.randomUUID()+'.'+ext;
 const filename=path.join(uploadDir,path.basename(image));
 await fs.promises.writeFile(filename,data);
 try { await pool.execute('UPDATE profile SET image=? WHERE id=1',[image]); }
 catch(error) { await fs.promises.unlink(filename); throw error; }
 removeImage(rows[0].image);
 res.json({message:'Photo updated.'});
}));
app.delete('/api/profile/image', route(async (req,res) => {
 const [rows]=await pool.query('SELECT image FROM profile WHERE id=1');
 await pool.query('UPDATE profile SET image=NULL WHERE id=1');
 removeImage(rows[0]?.image);
 res.json({message:'Photo removed.'});
}));
function entryData(body) {
 const category=body.category, title=clean(body.title,120), detail=clean(body.detail,2000);
 return categories.includes(category) && title && detail ? [category,title,detail] : null;
}
app.post('/api/entries', route(async (req,res) => {
 const values=entryData(req.body);
 if(!values) return res.status(400).json({message:'Select a section and fill in both fields.'});
 await pool.execute('INSERT INTO entries (category,title,detail) VALUES (?,?,?)',values);
 res.status(201).json({message:'Entry added.'});
}));
app.put('/api/entries/:id', route(async (req,res) => {
 const values=entryData(req.body);
 if(!values || !validId(req.params.id)) return res.status(400).json({message:'Invalid entry.'});
 const [rows]=await pool.execute('SELECT id FROM entries WHERE id=?',[req.params.id]);
 if(!rows.length) return res.status(404).json({message:'Entry not found.'});
 await pool.execute('UPDATE entries SET category=?,title=?,detail=? WHERE id=?',[...values,req.params.id]);
 res.json({message:'Entry updated.'});
}));
app.delete('/api/entries/:id', route(async (req,res) => {
 if(!validId(req.params.id)) return res.status(400).json({message:'Invalid entry ID.'});
 const [result]=await pool.execute('DELETE FROM entries WHERE id=?',[req.params.id]);
 if(!result.affectedRows) return res.status(404).json({message:'Entry not found.'});
 res.json({message:'Entry deleted.'});
}));
app.use((err,req,res,next) => {
 console.error(err.message);
 res.status(err instanceof multer.MulterError ? 400 : 500).json({message:err instanceof multer.MulterError ? 'Choose one image smaller than 2 MB.' : 'Unable to complete the request. Check the server and database.'});
});
app.listen(process.env.PORT || 3000, () => console.log('Portfolio: http://localhost:'+(process.env.PORT || 3000)));
