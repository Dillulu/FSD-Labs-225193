// Sidebar.jsx - Navigation sidebar for CampusHub
function Sidebar({
  isCollapsed,
  onToggle,
  activeSection = 'dashboard',
  onSelectSection,
  isSystemOnline = true,
  onToggleSystemStatus
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Students', icon: '🎓' },
    { id: 'courses', label: 'Courses', icon: '📚' },
    { id: 'attendance', label: 'Attendance', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* University Branding */}
      <div className="sidebar-brand">
        <span className="brand-icon">🏛️</span>
        <div className="brand-text">
          <span className="brand-title">CampusHub</span>
          <span className="brand-subtitle">University Portal</span>
        </div>
      </div>

      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '»' : '«'}
      </button>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSelectSection && onSelectSection(item.id)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectSection && onSelectSection(item.id);
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer with interactive System Status */}
      <div className="sidebar-footer">
        <div
          className="system-status"
          onClick={onToggleSystemStatus}
          style={{ cursor: 'pointer' }}
          title="Click to toggle System Online/Offline status"
          role="button"
          tabIndex={0}
        >
          <span className={`status-dot ${isSystemOnline ? '' : 'offline'}`}></span>
          <span className="status-text">
            {isSystemOnline ? 'System Online' : 'System Offline'}
          </span>
        </div>
        <p className="system-version">CampusHub v1.0 • Fall 2026</p>
      </div>
    </aside>
  );
}

export default Sidebar;
