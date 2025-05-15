var { PrismaClient } = require('@prisma/client');

var prisma = new PrismaClient();

const getAll = async () => {
  try {
    var users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error(error);
  }
}

const getById = async (id) => {
  try {
    var user = await prisma.user.findUnique({
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
  getById,
  deleteUser,
}
