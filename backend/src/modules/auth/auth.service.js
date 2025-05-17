const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePassword } = require('../../utils/passwordHasher');
const { generateToken } = require('../../utils/jwt');

const prisma = new PrismaClient();

const register = async (body) => {
  const { name, email, passwordHash } = body;
  const hashedPassword = await hashPassword(passwordHash);

  try {
    const user = await prisma.user.create({
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
  const { email, passwordHash } = body;

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) throw new Error('User not found.');

  const passwordMatch = await comparePassword(passwordHash, user.passwordHash);

  if (!passwordMatch) throw new Error('Password not matched!');

  const token = await generateToken(user.id, user.name);

  return {
    token: token,
    user: user,
  };
}

module.exports = {
  register,
  login,
}
