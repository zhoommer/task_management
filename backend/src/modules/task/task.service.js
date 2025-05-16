const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAll = async () => {
  try {
    const allTasks = await prisma.task.findMany();
    return allTasks;
  } catch (error) {
    console.error(error);
  }
}

const create = async (body, createdById) => {
  const { title, description, status, priority, dueDate, projectId } = body;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const task = await prisma.task.create({
        data: { title, description, status, priority, dueDate, projectId, createdById }
      });
      const taskAssignment = await prisma.taskAssignment.create({
        data: { taskId: task.id, userId: createdById }
      });
      return { task, taskAssignment };
    });
    return result;

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAll,
  create,
}
