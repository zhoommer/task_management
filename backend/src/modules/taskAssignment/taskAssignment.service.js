const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const getByTaskId = async (taskId, userId) => {
  try {
    const response = await prisma.taskAssignment.findUnique({
      where: { taskId_userId: { taskId, userId } },
      include: { user: { select: { id: true, name: true } } },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}


module.exports = {
  getByTaskId,
}
