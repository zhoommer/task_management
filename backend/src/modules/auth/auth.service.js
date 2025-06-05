const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePassword } = require('../../utils/passwordHasher');
const { generateToken } = require('../../utils/jwt');

const getAvatarName = (name) => {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0][0]}${parts[parts.length - 1][0]}`;
};

class AuthService {
  constructor() {
    this.prisma = new PrismaClient();
  };

  async register(body) {
    const { name, email, password } = body;
    const hashedPassword = await hashPassword(password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword
        }
      });
      return user;
    } catch (error) {
      throw { status: 500, message: error.message || 'Registration failed.' };
    }
  };

  async login(body) {
    const { email, passwordHash } = body;

    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) throw { status: 404, message: 'User not found.' };

    const passwordMatch = await comparePassword(passwordHash, user.passwordHash);

    if (!passwordMatch) throw { status: 401, message: 'Password not matched!' };

    const token = await generateToken(user.id, user.name);

    return {
      token,
      user,
      avatarName: getAvatarName(user.name)
    };
  };
}

module.exports = new AuthService();
