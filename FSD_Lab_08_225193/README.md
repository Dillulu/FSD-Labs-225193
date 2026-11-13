# Lab 08 - University Course Management System

Hamza Tahir | Registration ID: 225193  
Air University Kamra Campus  
Course: CS-301L Full Stack Development

## Overview

A web-based University Course Management System built with **jQuery AJAX**, **Node.js**, **Express.js**, **MySQL (XAMPP)**, **bcrypt**, and **JSON Web Tokens (JWT)** supporting authentication and role-based authorization (`student` and `admin`).

## Run

1. Start MySQL in XAMPP and import `database.sql` (creates `UniversityDB` with `users` and `courses` tables plus seed data).
2. Open a terminal in `FSD_Lab_08_225193`.
3. Copy `.env.example` to `.env` and configure your database settings and a strong `JWT_SECRET`.
4. Install dependencies and start the server:

```bash
npm install
npm start
```

5. Open `http://localhost:3000` in your browser.

## Demo Credentials

- **Admin:** `admin@au.edu.pk` / `Admin@123`
- **Student:** `hamza.225193@students.au.edu.pk` / `Student@123`

## Security & Architecture Notes

- Passwords are hashed using `bcrypt` (10 salt rounds); plain-text passwords are never stored.
- Public registration (`/api/auth/register`) always assigns the `student` role and rejects attempts to self-assign `admin`.
- All MySQL queries use parameterized statements via `mysql2/promise`.
- Protected routes enforce JWT verification (`authenticateToken`) and role checks (`authorizeRole`).
- Lab report PDF and screenshots are maintained in Google Drive (`documentation/`).
