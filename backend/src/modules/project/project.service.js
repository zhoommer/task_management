const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const getAll = async (query) => {
  const { createdBy, sort, direction } = query;

  // I create valid sort field list.
  const validSortFields = ['name', 'createdAt'];

  // This is same to validSortFields
  const validDirectionFields = ['asc', 'desc'];

  const directionField = validDirectionFields.includes(direction) ? direction : 'desc';

  // Checked validSortFields includes sort parameter. Default 'createdAt'
  const sortField = validSortFields.includes(sort) ? sort : 'createdAt';

  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        [sortField]: directionField,
      },
      include: createdBy === 'true' ? {
        createdBy: {
          select: { id: true, name: true, createdAt: true }
        }
      } : undefined // if query parameter == 'true' include users info
    });
    return projects;
  } catch (error) {
    console.error(error);
  }
}

const create = async (body, id) => {
  const { name, description } = body;

  const createdById = id;

  try {
    const project = await prisma.project.create({
      data: { name, description, createdById },
    });

    return project;
  } catch (error) {
    console.error(error);
  }
}

const update = async (body, id) => {
  const { name, description } = body;

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { name, description }
    });

    return project;
  } catch (error) {
    console.error(error);
  }
}

const deleteProject = async (id) => {
  try {
    const deletedProject = await prisma.project.delete({
      where: { id },
    });

    return deletedProject;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getAll,
  create,
  update,
  deleteProject,
}
