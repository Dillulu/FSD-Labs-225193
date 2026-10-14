FSD LAB 06 - PERSONAL PORTFOLIO
Muhammad Hamza Tahir | Registration ID: 225193

REQUIREMENTS
Node.js (LTS), npm, and MySQL (XAMPP MySQL is also suitable).

RUN ON WINDOWS
1. Extract the ZIP into a folder.
2. Open XAMPP and start MySQL. Apache is only needed for phpMyAdmin.
3. Open http://localhost/phpmyadmin and use Import to import database.sql.
   Alternatively run: mysql -u root -p < database.sql
4. Open a terminal in this folder and run: npm install
5. Copy .env.example to .env. Set DB_PORT to your actual MySQL port.
   XAMPP commonly uses root with an empty password. If your setup differs,
   change DB_USER and DB_PASSWORD. Do not share your actual password.
6. Run: npm start
7. Open http://localhost:3000 in your browser.
8. Add your profile first, then add your portfolio entries and upload a photo.

Every edit uses jQuery AJAX. Data is stored in MySQL; images are in uploads/.
Keep the database and uploads folder to preserve your portfolio.
Do not open index.html directly; use the Node server URL.
To stop the server, press Ctrl+C. Run npm start to restart it.
If database connection fails, check MySQL is running and .env settings match.
If port 3000 is busy, change PORT in .env and open that port instead.

FILES
server.js              Express routes, validation and database queries
public/index.html      Page layout and forms
public/style.css       Responsive styling
public/app.js          jQuery AJAX and reusable section rendering
public/vendor/         Local jQuery (no CDN required while using the website)
database.sql           Creates database and tables (starts empty)
.env.example           Example database configuration
package.json/lock      npm dependencies
uploads/               Uploaded image storage
documentation/         PDF, screenshots and demonstration video

DEMO DATA
Screenshots/video use example education, skills, experience and projects to
show the features. Replace them with your real details. No sample entries
are inserted by database.sql.

SCOPE
Simple local, single-user lab application. No authentication is included.
The handout mentions three questions but lists one portfolio task. The PDF
therefore documents frontend, backend and database implementation.
