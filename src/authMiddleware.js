// authMiddleware.js
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const accessCode = req.headers['x-access-code'];

  if (!accessCode) {
    return res.status(401).json({ error: 'Access code is required' });
  }

  if (accessCode !== process.env.ACCESS_CODE) {
    return res.status(403).json({ error: 'Invalid access code' });
  }

  next();
};

module.exports = authMiddleware;