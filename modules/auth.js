const jwt = require('jsonwebtoken');

const password = '376624954';
const secret = password;

const getHash = (s) => {
  for (var i = 0, h = 1; i < s.length; i++)
    h = Math.imul(h + s.charCodeAt(i) | 0, 2654435761);
  return String((h ^ h >>> 17) >>> 0);
};

const verifyPassword = (p) => {
  const hashed = getHash(p);
  return hashed === password;
};

const verifyToken = (token) => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
};

const getToken = (p) => {
  if (verifyPassword(p)) {
    return jwt.sign({data: 'lightingToken'}, secret, {expiresIn: '30d'});
  }
  return null;
};

module.exports = {
  verifyPassword,
  verifyToken,
  getToken
};