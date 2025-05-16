const { verifyToken } = require("../utils/jwt");


const jwtAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verifiedToken = await verifyToken(token);
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = jwtAuth;
