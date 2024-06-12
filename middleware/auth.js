// middleware/auth.js
const jwt = require('jsonwebtoken');
const blacklistedTokens = require('../middleware/blacklist');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  if (blacklistedTokens.includes(token)) {
    return res.status(401).json({ message: 'Token has been blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
	// console.error('JWT verification error:', error); // Log the exact error
    if (error instanceof jwt.JsonWebTokenError) {
		// Invalid token
		res.status(401).json({ error: `Invalid token: ${error.message}` });
	  } else if (error instanceof jwt.TokenExpiredError) {
		// Expired token
		res.status(401).json({ error: `Token expired: ${error.message}` });
	  } else if (error instanceof jwt.NotBeforeError) {
		// Not active token
		res.status(401).json({ error: `Token not active: ${error.message}` });
	  } else {
		// Other errors
		res.status(500).json({ error: `Token verification failed: ${error.message}` });
	  }
  }
};

module.exports = auth;
