var { PrismaClient } = require('@prisma/client');
require('dotenv').config();

var prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to PostgreSQL via Prisma');
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = main;
