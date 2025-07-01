const { PrismaClient } = require('@prisma/client');
const { FIELDS, STATUS, PRIORITY } = require('./constants');
const validateFields = require('../../utils/validateFields');

class TaskService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAll(queries) {
    const { status, userId } = queries;
    const projectId = Number(queries.projectId);

    const where = {
      ...(userId && { assignments: { some: { userId } } }),
      ...(projectId && { projectId }),
      ...(status && { status }),
    };

    try {
      const allTasks = await this.prisma.task.findMany({
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

  async getById(id) {
    if (!id) throw new Error('Task ID is required.');

    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        createdBy: { select: { id: true, name: true, createdAt: true } },
        assignments: { select: { user: { select: { id: true, name: true } } } },
      }
    });
    return task;
  }

  async create(body, createdById) {
    if (!PRIORITY.includes(body.priority)) throw new Error('Priority must be low, medium, high, or critical.');

    const result = validateFields(body, FIELDS);
    if (!result.valid) throw new Error(`Missing or invalid field: ${result.missingField}`);

    if (!createdById) throw new Error('Creator ID is required.');

    const { title, description, priority, dueDate, projectId, assignedUserId } = body;

    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        const task = await prisma.task.create({
          data: { title, description, status: 'waiting', priority, dueDate, projectId, createdById }
        });
        await prisma.taskAssignment.create({
          data: { taskId: task.id, userId: assignedUserId }
        });
        return task;
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async update(body, id) {
    if (!STATUS.includes(body.status)) throw new Error('Status must be waiting, inprogress, test, or done.');
    if (!PRIORITY.includes(body.priority)) throw new Error('Priority must be low, medium, high, or critical.');

    const result = validateFields(body, FIELDS);
    if (!result.valid) throw new Error(`Missing or invalid field: ${result.missingField}`);

    try {
      const updatedTask = await this.prisma.task.update({
        where: { id },
        data: body,
      });
      return updatedTask;
    } catch (error) {
      console.error(error);
    }
  }

  async updateTaskStatus(id, status) {
    if (!STATUS.includes(status)) throw new Error('Status must be waiting, inprogress, test, or done.');

    try {
      return await this.prisma.task.update({ where: { id: Number(id) }, data: { status } });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteTask(id) {
    if (!id) throw new Error('Task ID is required.');

    try {
      const deletedTask = await this.prisma.task.delete({
        where: { id },
      });
      return deletedTask;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new TaskService();