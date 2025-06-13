const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAll = async (queries) => {

  const { status, userId } = queries;

  const projectId = Number(queries.projectId);

  const where = {
    ...(userId && { assignments: { some: { userId } } }),
    ...(projectId && { projectId }),
    ...(status && { status }),
  };

  try {
    const allTasks = await prisma.task.findMany({
      where,
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

const getById = async (id) => {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, name: true, createdAt: true } },
      assignments: { select: { user: { select: { id: true, name: true } } } },
    }
  });
  return task;
}

const create = async (body, createdById) => {
  const { title, description, priority, dueDate, projectId, assignedUserId } = body;

  try {
    const result = await prisma.$transaction(async (prisma) => {
      const task = await prisma.task.create({
        data: { title, description, status: 'waiting', priority, dueDate, projectId, createdById }
      });
      await prisma.taskAssignment.create({
        data: { taskId: task.id, userId: assignedUserId }
      });
      return task
    });
    return {
      id: result.id,
      title: result.title,
      description: result.description,
      status: result.status,
      priority: result.priority,
      dueDate: result.dueDate,
      projectId: result.projectId,
      assignedUserId: result.assignedUserId,
    };
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
    return await prisma.task.update({ where: { id: Number(id) }, data: { status: status } });
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
  getById,
  create,
  update,
  updateTaskStatus,
  deleteTask,
}
