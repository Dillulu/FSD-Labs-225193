/**
 * Full Stack Development (CS-301L) - Lab 05
 * Student Name: Hamza Tahir
 * Registration ID: 225193
 * 
 * Question 3: Express.js Backend with GET & POST API Endpoints + CORS
 * - GET  /api/students  → returns all students as JSON
 * - POST /api/students  → accepts new student object, validates, appends, returns 201
 * - CORS enabled so jQuery frontend can communicate cross-origin
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3005;

// In-memory student data store (seeded with initial data)
let students = [
    { id: 1, name: "Hamza Tahir",   regId: "225193", city: "Islamabad", age: 20, grade: "A", course: "FSD" },
    { id: 2, name: "Ali Hassan",    regId: "225101", city: "Lahore",     age: 21, grade: "B", course: "FSD" },
    { id: 3, name: "Sara Ahmed",    regId: "225122", city: "Karachi",    age: 22, grade: "A+", course: "FSD" },
    { id: 4, name: "Usman Malik",   regId: "225145", city: "Rawalpindi", age: 20, grade: "B+", course: "FSD" },
    { id: 5, name: "Zainab Raza",   regId: "225167", city: "Multan",     age: 21, grade: "A",  course: "FSD" }
];

// Middleware: Enable CORS (Cross-Origin Resource Sharing) for jQuery frontend
app.use(cors());

// Middleware: Parse incoming JSON request bodies
app.use(express.json());

// Root route - serves a simple HTML welcome page
app.get("/", function (req, res) {
    res.send(`
        <html>
        <head><title>FSD Lab 05 - Express API</title></head>
        <body style="font-family:sans-serif; padding:40px; background:#f8fafc;">
            <h1 style="color:#1d4ed8;">FSD Lab 05 - Express REST API</h1>
            <p><strong>Student:</strong> Hamza Tahir | <strong>Reg ID:</strong> 225193</p>
            <hr>
            <h2>Available Endpoints:</h2>
            <ul>
                <li><code>GET  /api/students</code> - Get all students</li>
                <li><code>POST /api/students</code> - Add a new student</li>
            </ul>
            <p>Open <a href="/api/students">/api/students</a> to see JSON response.</p>
        </body>
        </html>
    `);
});

// -------------------------------------------------------
// GET /api/students - Return all students as JSON
// -------------------------------------------------------
app.get("/api/students", function (req, res) {
    console.log(`[GET] /api/students - Returning ${students.length} records`);
    res.status(200).json({
        success: true,
        count: students.length,
        students: students
    });
});

// -------------------------------------------------------
// POST /api/students - Add a new student record
// -------------------------------------------------------
app.post("/api/students", function (req, res) {
    const body = req.body;
    console.log("[POST] /api/students - Received body:", body);

    // Server-side validation
    if (!body.name || !body.city || body.age === undefined) {
        return res.status(400).json({
            success: false,
            message: "Validation failed. 'name', 'city', and 'age' are required fields."
        });
    }

    // Build new student object
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = {
        id: newId,
        name: String(body.name).trim(),
        regId: String(body.regId || "N/A").trim(),
        city: String(body.city).trim(),
        age: Number(body.age),
        grade: String(body.grade || "N/A").trim(),
        course: String(body.course || "FSD").trim()
    };

    students.push(newStudent);

    console.log("[POST] New student added:", newStudent);

    res.status(201).json({
        success: true,
        message: "Student record added successfully.",
        student: newStudent,
        totalStudents: students.length
    });
});

// Start Express Server
app.listen(PORT, function () {
    console.log("============================================");
    console.log(`  FSD Lab 05 - Express API Running`);
    console.log(`  Student: Hamza Tahir (225193)`);
    console.log(`  Server: http://localhost:${PORT}`);
    console.log(`  GET  -> http://localhost:${PORT}/api/students`);
    console.log(`  POST -> http://localhost:${PORT}/api/students`);
    console.log("============================================");
});
