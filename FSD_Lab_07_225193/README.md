# Lab 07 - University API Access Management

Hamza Tahir | Registration ID: 225193
Air University Kamra Campus

## Run

1. Start MySQL and import `database.sql`.
2. Open a terminal in this folder.
3. Copy `.env.example` to `.env` and enter your local database settings. Set `ADMIN_API_KEY` to your own chosen value; the template leaves it blank.
4. Run `npm ci`, then `npm start`.
5. Open http://localhost:3000/admin and enter the ADMIN_API_KEY from `.env`.
6. Generate a student or teacher key, save it at `/settings`, then load academic records at `/`.

The admin can generate/revoke keys, update request limits and view usage.
Students see their own marks; teachers can view all students.

The PDF, screenshots and recorded demo are maintained separately in Google Drive.

Database marks are fictional sample values. Other students and teachers use generic demo identities.
Dependencies and local `.env` files are excluded; `.env.example` contains demo configuration only.
