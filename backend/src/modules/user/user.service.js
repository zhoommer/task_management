const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAll = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error(error);
  }
}

const getMe = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

const getById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

const deleteUser = async (id) => {
  try {
    await prisma.user.delete({
      where: { id }
    })
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  getAll,
  getMe,
  getById,
  deleteUser,
}
