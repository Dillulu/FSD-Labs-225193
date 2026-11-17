// RecentActivity.jsx - University dashboard recent log and announcements
function RecentActivity() {
  return (
    <div className="activity-container">
      <div className="activity-header-bar">
        <h2 className="activity-title">Recent Activity</h2>
        <span className="activity-count-badge">3 Updates</span>
      </div>

      <div className="activity-list">
        {/* Activity Item 1 */}
        <div className="activity-item">
          <div className="activity-dot dot-emerald"></div>
          <div className="activity-body">
            <p className="activity-text">
              <strong>Sara Ahmed (CS-102)</strong> course registration for Fall 2026 was approved.
            </p>
            <span className="activity-timestamp">15 minutes ago</span>
          </div>
        </div>

        {/* Activity Item 2 */}
        <div className="activity-item">
          <div className="activity-dot dot-blue"></div>
          <div className="activity-body">
            <p className="activity-text">
              <strong>Midterm Examination Schedule</strong> published for Computer Science & Software Engineering departments.
            </p>
            <span className="activity-timestamp">2 hours ago</span>
          </div>
        </div>

        {/* Activity Item 3 */}
        <div className="activity-item">
          <div className="activity-dot dot-amber"></div>
          <div className="activity-body">
            <p className="activity-text">
              <strong>Bilal Hassan (IT-105)</strong> submitted a leave application for medical leave.
            </p>
            <span className="activity-timestamp">Yesterday at 4:30 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;
