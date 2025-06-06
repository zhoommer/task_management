const { PrismaClient } = require('@prisma/client');


class ProjectService {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getAll(query) {
    const { createdBy, sort, direction } = query;

    // I create valid sort field list.
    const validSortFields = ['name', 'createdAt'];

    // This is same to validSortFields
    const validDirectionFields = ['asc', 'desc'];

    const directionField = validDirectionFields.includes(direction) ? direction : 'desc';

    // Checked validSortFields includes sort parameter. Default 'createdAt'
    const sortField = validSortFields.includes(sort) ? sort : 'createdAt';

    try {
      const projects = await this.prisma.project.findMany({
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
      throw new Error(`Failed to fethc project: ${error.message}`);
    }
  };

  async create(body, id) {
    const validatedFields = ['name', 'description'];

    const result = validatedFields(body, validatedFields);

    if (!result.valid) {
      const error = new Error(`Missing or invalid field: ${result.missingField}`);
      error.status = 400;
      throw error;
    }

    if (!id) {
      const error = new Error('User ID is required to create a project.');
      error.status = 400;
      throw error;
    }

    const { name, description } = body;

    const createdById = id;

    try {
      const project = await this.prisma.project.create({
        data: { name, description, createdById },
      });

      return project;
    } catch (error) {
      throw new Error(`Failed to create project: ${error.message}`);
    }
  };

  async update(body, id) {
    const validatedFields = ['name', 'description'];

    const result = validatedFields(body, validatedFields);

    if (!result.valid) {
      const error = new Error(`Missing or invalid field: ${result.missingField}`);
      error.status = 400;
      throw error;
    }

    if (!id) {
      const error = new Error('User ID is required to create a project.');
      error.status = 400;
      throw error;
    } const { name, description } = body;

    try {
      const project = await this.prisma.project.update({
        where: { id },
        data: { name, description }
      });

      return project;
    } catch (error) {
      throw new Error(`Failed to update project: ${error.message}`);
    }
  };

  async deleteProject(id) {
    if (!id) {
      const error = new Error('Project ID is required to delete a project.');
      error.status = 400;
      throw error;
    }
    try {
      const deletedProject = await this.prisma.project.delete({
        where: { id },
      });

      return deletedProject;
    } catch (error) {
      throw new Error(`Failed to delete project: ${error.message}`);
    }
  };
}

module.exports = new ProjectService();
