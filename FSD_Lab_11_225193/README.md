# CS-301L: Full Stack Development — Lab 11
**React: Props and useState Hook Implementation**

- **Student:** Muhammad Hamza Tahir
- **Registration ID:** 225193
- **Demonstrator / Instructor:** M. Fahad Qasim
- **Department:** Department of Computer Science
- **Institution:** Air University, Aerospace & Aviation Campus Kamra
- **Session:** Fall 2026

---

## 📋 Lab Tasks Implemented

### 1. Lab Task 1: Student Search (Section 9.1)
- **Controlled Input:** Search input integrated in the dashboard table controls bar.
- **State Management:** Controlled with React `useState` (`searchTerm`, `setSearchTerm`).
- **Multi-Field Matching:** Searches students in real time by **Name** or **Roll Number**.
- **Case-Insensitive:** Query normalized with `.toLowerCase().trim()`.
- **Empty State Feedback:** Displays a dedicated, styled empty message with a reset button when no student matches.
- **Clear & Restore:** Clearing the search input or clicking the single-click clear button (`×`) instantly restores the entire student list.

### 2. Lab Task 2: Department Filtering (Section 9.2)
- **Controlled Selection:** Department dropdown selector added with options derived dynamically.
- **All Departments Option:** Default option allows viewing all faculties.
- **State Management:** Stored with React `useState` (`selectedDepartment`, `setSelectedDepartment`).
- **Reactive Re-rendering:** Selecting any department dynamically updates the displayed list.
- **Full Compatibility with Mutations:** Adding a new student (`handleAddStudent`) and deleting students (`handleDeleteStudent`) seamlessly reflect in both filtered and global views.

---

## 🚀 How to Run

1. Open the project directory in your terminal or VS Code:
   ```bash
   cd FSD_Lab_11_225193
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm ci
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local URL in your browser:
   ```
   http://localhost:5173/
   ```

---

## 📁 Folder Structure

```
FSD_Lab_11_225193/
├── src/
│   ├── components/
│   │   ├── AttendanceSection.jsx
│   │   ├── CourseGpaChart.jsx
│   │   ├── CoursesSection.jsx
│   │   ├── Header.jsx                   # Dashboard top header
│   │   ├── RecentActivity.jsx           # Activity feed
│   │   ├── SectionPanel.jsx
│   │   ├── SettingsSection.jsx          # System settings with Online/Offline toggle
│   │   ├── Sidebar.jsx                  # Collapsible sidebar
│   │   ├── StudentTable.jsx             # Table with search, department filter, and add/delete actions
│   │   └── SummaryCards.jsx             # Key metric summary cards
│   ├── data/
│   │   └── dashboardData.js             # Initial dataset & configuration
│   ├── App.css                          # Application styles including table controls & empty state
│   ├── App.jsx                          # Main orchestrator component managing state and props
│   ├── index.css                        # Global styles & design system tokens
│   └── main.jsx                         # Application entry point
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## 📄 Documentation
The laboratory report PDF and output screenshots are maintained separately in Google Drive.
