# Full Stack Development Labs

**Muhammad Hamza Tahir**  
**Registration ID: 225193**

This repository contains my Full Stack Development lab submissions for Labs 3, 4, 5, 6, 7 and 9. Each lab keeps its original source files and available documentation.

| Lab | Folder | Starting point |
| --- | --- | --- |
| 3 | `FSD_Lab_03_225193` | `index.html` |
| 4 | `FSD_Lab_04_225193` | `mug.html` |
| 5 | `FSD_Lab_05_225193` | Separate folders for Questions 1, 2 and 3 |
| 6 | `FSD_Lab_06_225193` | Follow `README.txt` to start the Express/MySQL portfolio |
| 7 | `FSD_Lab_07_225193` | Follow `README.md` to start the University API system |
| 9 | `FSD_Lab_09_225193` | Run `npm ci` and `npm run dev` for the React dashboard |

## Running the labs

For Labs 3 and 4, open the starting HTML file in a browser. For Lab 5 Questions 1 and 2, open the `index.html` file in the corresponding question folder. Features using external APIs or CDN libraries require an internet connection.

For Lab 5 Question 3:

1. Open a terminal in `FSD_Lab_05_225193/Question_3_Express_Backend/backend`.
2. Run `npm install`.
3. Run `node server.js`.
4. Open `frontend/index.html` in a browser. The backend listens on port 3005.

For Lab 6:

1. Start MySQL and import `database.sql`.
2. Run `npm install` inside `FSD_Lab_06_225193`.
3. Copy `.env.example` to `.env` and enter your local database settings.
4. Run `npm start`, then open `http://localhost:3000`.

For Lab 7: 
1. follow `FSD_Lab_07_225193/README.md`.
2. Import the database.
3. configure `.env`.
4. run `npm ci` and `npm start`.
5. then open `http://localhost:3000/admin`.

For Lab 9:

1. Open a terminal in `FSD_Lab_09_225193`.
2. Run `npm ci`, then `npm run dev`.
3. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Documentation

Lab 3 includes `submission.doc`. Labs 4 and 5 include PDF reports. Lab 6 includes its PDF, screenshots and demo video in `documentation/`. Lab 7 documentation and its recorded demo are maintained separately in Google Drive. Lab 9 source is included here; its report and screenshots are supplied with the project ZIP in Google Drive. Additional reports and screenshots remain in their original folders.

Dependency folders and private environment files are excluded from version control. Install dependencies locally when needed. `.env.example` is a configuration template and contains no actual password.
