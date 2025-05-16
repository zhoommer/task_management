var { PrismaClient } = require('@prisma/client');

var prisma = new PrismaClient();


const getAll = async (query) => {
  var { createdBy, sort, direction } = query;

  // I create valid sort field list.
  var validSortFields = ['name', 'createdAt'];

  // This is same to validSortFields
  var validDirectionFields = ['asc', 'desc'];

  var directionField = validDirectionFields.includes(direction) ? direction : 'desc';

  // Checked validSortFields includes sort parameter. Default 'createdAt'
  var sortField = validSortFields.includes(sort) ? sort : 'createdAt';

  try {
    var projects = await prisma.project.findMany({
      orderBy: {
        [sortField]: directionField,
      },
      include: createdBy === 'true' ? { createdBy: true } : undefined // if query parameter == 'true' include users info
    });
    return projects;
  } catch (error) {
    console.error(error);
  }
}

const create = async (body, id) => {
  var { name, description } = body;

  var createdById = id;

  try {
    var project = await prisma.project.create({
      data: { name, description, createdById },
    });

    return project;
  } catch (error) {
    console.error(error);
  }
}

const update = async (body, id) => {
  var { name, description } = body;

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
    var deletedProject = await prisma.project.delete({
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
