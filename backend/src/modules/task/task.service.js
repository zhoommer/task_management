const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAll = async (queries) => {

  const { status } = queries;

  const projectId = Number(queries.projectId);

  try {
    const allTasks = await prisma.task.findMany({
      where: projectId || status ? { ...(projectId && { projectId }), ...(status && { status }) } : {},
      include: {
        createdBy: { select: { id: true, name: true, createdAt: true } },
        assignments: { select: { user: { select: { name: true } } } },
      },
    });
    return allTasks;
  } catch (error) {
    console.error(error);
  }
}

const create = async (body, createdById) => {
  const { title, description, priority, dueDate, projectId, assignedUserId } = body;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const task = await prisma.task.create({
        data: { title, description, priority, dueDate, projectId, createdById }
      });
      const taskAssignment = await prisma.taskAssignment.create({
        data: { taskId: task.id, userId: assignedUserId }
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
