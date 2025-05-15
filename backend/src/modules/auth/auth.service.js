var { PrismaClient } = require('@prisma/client');
var { hashPassword, comparePassword } = require('../../utils/passwordHasher');
const { generateToken } = require('../../utils/jwt');

var prisma = new PrismaClient();

const register = async (body) => {
  var { name, email, passwordHash } = body;
  var hashedPassword = await hashPassword(passwordHash);

  try {
    var user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword
      }
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

const login = async (body) => {
  var { email, passwordHash } = body;

  var user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) new Error('User not found.');

  var passwordMatch = await comparePassword(passwordHash, user.passwordHash);

  if (!passwordMatch) new Error('Password not matched!');

  var token = await generateToken();

  return token;
}

module.exports = {
  register,
  login,
}
