const jwt = require('jsonwebtoken');
const settings = require('../../config');

async function authentication(req, res) {
  const token = req.headers['x-auth-token'];
  if (!token)
    return res.status(401).send({ error: 'Access denied. No token provided.' });

  try {
    const payload = jwt.verify(token, settings.auth.JWT_SECRET);
    req.user.payload = payload;
  } catch (err) {
    res.status(400).send({ error: 'Invalid token.' });
  }
}

module.exports = authentication;
