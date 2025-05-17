const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAll = async (queries) => {

  const { cursor, limit } = queries;

  try {
    const queryOptions = {
      take: Number(limit) || 5,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: Number(cursor) } : undefined,
      orderBy: { id: 'desc' },
    }


    const allTasks = await prisma.task.findMany(queryOptions);
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

const update = async (body, id) => {
  const { title, description, status, priority, dueDate, projectId } = body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description, status, priority, dueDate, projectId },
    });

    return updatedTask;
  } catch (error) {
    console.log(error);
  }
}

const updateTaskStatus = async (id, status) => {
  try {
    return await prisma.task.update({ where: id, data: { status } });
  } catch (error) {
    console.log(error);
  }
}


const deleteTask = async (id) => {
  try {
    const deletedTask = await prisma.task.delete({
      where: { id },
    });

    return deletedTask;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAll,
  create,
  update,
  updateTaskStatus,
  deleteTask,
}
