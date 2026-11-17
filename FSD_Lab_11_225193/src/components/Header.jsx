// Header.jsx - Top navigation header with title, session, and administrator profile
function Header({ activeSection = 'dashboard', isSystemOnline = true }) {
  const academicSession = "Fall 2026";
  const studentName = "Hamza Tahir";
  const regNumber = "225193";

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'students':
        return 'Student Directory';
      case 'courses':
        return 'Course Management';
      case 'attendance':
        return 'Attendance Analytics';
      case 'settings':
        return 'System & Portal Settings';
      case 'dashboard':
      default:
        return 'Student Dashboard';
    }
  };

  return (
    <header className="header">
      {/* Page Title & Welcome */}
      <div className="header-left">
        <h1 className="header-title">{getSectionTitle()}</h1>
        <p className="header-welcome">
          Welcome back, {studentName} ({regNumber})
        </p>
      </div>

      {/* Session Info & Administrator Profile */}
      <div className="header-right">
        {/* System Online / Offline Indicator Pill */}
        <div className={`header-status-pill ${isSystemOnline ? 'status-online' : 'status-offline'}`}>
          <span className={`status-dot ${isSystemOnline ? '' : 'offline'}`}></span>
          <span className="status-label">{isSystemOnline ? 'System Online' : 'System Offline'}</span>
        </div>

        {/* Academic Session Badge */}
        <div className="session-badge">
          <span className="session-icon">📅</span>
          <span className="session-label">Session:</span>
          <strong className="session-value">{academicSession}</strong>
        </div>

        {/* Administrator Profile Card */}
        <div className="admin-profile">
          <div className="profile-avatar">HT</div>
          <div className="profile-details">
            <span className="profile-name">{studentName}</span>
            <span className="profile-role">Reg: {regNumber} • Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
