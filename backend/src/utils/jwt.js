const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.generateToken = async (id, name, type) => {
  const payload = {
    id: id,
    name: name,
    type: type
  };
  const token = await jwtSign(payload);
  return token;
};

module.exports.verifyToken = async (token) => {
  const result = await jwtVerify(token);
  return result;
};

module.exports.getPayloadFromToken = async (token) => {
  const payload = await jwtVerify(token);
  return payload;
};

const jwtSign = (payload) => {
  const options = {
    algorithm: 'HS256',
    expiresIn: '24h'
  }
  return new Promise((resolve, reject) => {
    try {
      const cert = process.env.PUBLIC_NODE_JWT_SECRET_KEY;
      const token = jwt.sign(payload, cert, options);
      resolve(token);
    } catch (err) {
      reject(err);
    }
  })
}

const jwtVerify = (token) => {
  const options = {
    algorithms: ['HS256']
  }
  return new Promise((resolve, reject) => {
    try {
      const cert = process.env.PUBLIC_NODE_JWT_SECRET_KEY;
      const result = jwt.verify(token, cert, options);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  })
}
