// SettingsSection.jsx - System settings with interactive System Online / Offline toggle
function SettingsSection({
  isSystemOnline,
  onToggleSystemStatus,
  studentName = 'Hamza Tahir',
  regNumber = '225193'
}) {
  return (
    <div className="section-container">
      <div className="settings-grid">
        {/* Primary Card: System Availability & Online/Offline Toggle */}
        <div className="settings-card primary-card">
          <div className="settings-card-header">
            <div>
              <h2 className="settings-card-title">System Status & Availability</h2>
              <p className="settings-card-subtitle">
                Configure whether the CampusHub portal is currently accessible to university students and faculty.
              </p>
            </div>
            <span className={`status-pill-large ${isSystemOnline ? 'pill-online' : 'pill-offline'}`}>
              <span className={`status-dot ${isSystemOnline ? '' : 'offline'}`}></span>
              {isSystemOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          <div className="toggle-container">
            <div className="toggle-info">
              <h3>System Operational Mode</h3>
              <p>
                {isSystemOnline
                  ? 'The portal is currently live. Students and faculty can view dashboards, courses, and attendance.'
                  : 'The portal is currently in Maintenance Mode (Offline). Access is restricted to administrators.'}
              </p>
            </div>

            {/* Custom Interactive Toggle Switch */}
            <label className="switch-wrapper" htmlFor="system-status-toggle">
              <span className="switch-text">{isSystemOnline ? 'Online' : 'Offline'}</span>
              <input
                id="system-status-toggle"
                type="checkbox"
                checked={isSystemOnline}
                onChange={onToggleSystemStatus}
                className="switch-input"
              />
              <span className="switch-slider"></span>
            </label>
          </div>

          <div className={`status-notice-banner ${isSystemOnline ? 'notice-online' : 'notice-offline'}`}>
            <span className="notice-icon">{isSystemOnline ? '🟢' : '🔴'}</span>
            <div>
              <strong>Current State: {isSystemOnline ? 'System Online (Production)' : 'System Offline (Maintenance)'}</strong>
              <p>
                {isSystemOnline
                  ? 'All microservices, student database endpoints, and real-time APIs are responding normally.'
                  : 'Scheduled maintenance is in progress. Student registrations and course enrollments are paused.'}
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Card: Student & Course Information */}
        <div className="settings-card">
          <h2 className="settings-card-title">Academic & Developer Credentials</h2>
          <p className="settings-card-subtitle">
            Course and developer credentials for this laboratory assignment.
          </p>

          <div className="credentials-list">
            <div className="credential-item">
              <span className="cred-label">Lead Developer</span>
              <span className="cred-value">{studentName}</span>
            </div>
            <div className="credential-item">
              <span className="cred-label">Registration / Roll No</span>
              <span className="cred-value badge badge-active">{regNumber}</span>
            </div>
            <div className="credential-item">
              <span className="cred-label">Course</span>
              <span className="cred-value">CS-301L: Full Stack Development</span>
            </div>
            <div className="credential-item">
              <span className="cred-label">Lab Demonstrator</span>
              <span className="cred-value">M. Fahad Qasim</span>
            </div>
            <div className="credential-item">
              <span className="cred-label">Institution</span>
              <span className="cred-value">Air University, Aerospace & Aviation Campus Kamra</span>
            </div>
            <div className="credential-item">
              <span className="cred-label">Current Session</span>
              <span className="cred-value">Fall 2026</span>
            </div>
          </div>
        </div>

        {/* Third Card: Quick Portal Preferences */}
        <div className="settings-card">
          <h2 className="settings-card-title">Portal Preferences</h2>
          <div className="preferences-form">
            <label>
              Default Department
              <select defaultValue="Computer Science">
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Information Technology">Information Technology</option>
              </select>
            </label>
            <label>
              Records Per Page
              <select defaultValue="10">
                <option value="5">5 Records</option>
                <option value="10">10 Records</option>
                <option value="25">25 Records</option>
                <option value="50">50 Records</option>
              </select>
            </label>
            <label>
              Notification Alerts
              <input type="text" readOnly value="Enabled (Real-time updates & attendance triggers)" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsSection;
