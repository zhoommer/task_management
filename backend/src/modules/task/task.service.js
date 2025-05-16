// title
// description
// status waiting | inprogress | test | done
// priority low | medium | high | critical
// dueDate
// projectId => parameter
// createdById
// assignments => userId & taskId

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const create = async (body, createdById) => {
  const { title, description, status, priority, dueDate, projectId } = body;

  try {
    const createdTask = await prisma.task.create({
      data: { title, description, status, priority, dueDate, projectId, createdById },
    });

    return createdTask;

  } catch (error) {
    console.error(error);
  }
}



module.exports = {
  create,
}
