const { verifyToken } = require("../utils/jwt");


const jwtAuth = async (req, res, next) => {
  var authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  var token = authHeader.split(' ')[1];

  try {
    var verifiedToken = await verifyToken(token);
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = jwtAuth;
