

const jwt = require('jsonwebtoken');
const SECRET = 'secreto_super_seguro';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    req.usuario = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
};
