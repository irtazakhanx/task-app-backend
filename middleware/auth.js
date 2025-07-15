const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Accept token directly, or with 'Bearer ' prefix
  let token = authHeader;
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
}; 