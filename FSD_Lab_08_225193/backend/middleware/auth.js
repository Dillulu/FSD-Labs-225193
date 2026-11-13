const jwt = require('jsonwebtoken');

/**
 * Verifies the Bearer JWT from the Authorization header.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.get('Authorization') || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match || !match[1].trim()) {
    return res.status(401).json({ error: 'Authentication token is missing. Please log in.' });
  }

  const token = match[1].trim();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ error: 'Invalid authentication token.' });
  }
}

/**
 * Enforces role-based authorization on protected routes.
 */
function authorizeRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Access denied: administrator privileges required.'
      });
    }
    return next();
  };
}

module.exports = { authenticateToken, authorizeRole };
