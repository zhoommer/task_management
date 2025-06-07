const { PrismaClient } = require('@prisma/client');
const { hashPassword, comparePassword } = require('../../utils/passwordHasher');
const { generateToken } = require('../../utils/jwt');
const validateFields = require('../../utils/validateFields');

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
    const requiredFields = ['name', 'email', 'password'];

    const result = validateFields(body, requiredFields);

    if (!result.valid) {
      const error = new Error(`Missing or invalid field: ${result.missingField}`);
      error.status = 400;
      throw error;
    }

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
      throw new Error(error.message || 'Registration failed');
    }
  };

  async login(body) {
    const validatedFields = ['email', 'passwordHash'];

    const result = validateFields(body, validatedFields);

    if (!result.valid) {
      const error = new Error(`Missing or invalid field: ${result.missingField}`);
      error.status = 400;
      throw error;
    }

    const { email, passwordHash } = body;

    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) throw new Error('User not found');

    const passwordMatch = await comparePassword(passwordHash, user.passwordHash);

    if (!passwordMatch) throw new Error('Password not matched');

    const token = await generateToken(user.id, user.name);

    return {
      token,
      user,
      avatarName: getAvatarName(user.name)
    };
  };
}

module.exports = new AuthService();
