const projectService = require('./project.service');

const getAll = async (req, res) => {
  const projects = await projectService.getAll(req.query);

  return res.status(200).json({ message: 'All projects succesfully fetched.', data: projects });
}

const create = async (req, res) => {

  const createdProject = await projectService.create(req.body, createdById);

  return res.status(201).json({ message: 'Project created succesfully', data: createdProject });
}

const update = async (req, res) => {

  const updatedProject = await projectService.update(req.body, Number(id));

  return res.status(200).json({ message: 'Project updated succesfully', data: updatedProject });
}

const deleteProject = async (req, res) => {

  const deletedProject = await projectService.deleteProject(Number(id));

  return res.status(200).json({ message: 'Project deleted succesfully.', data: deletedProject });
}

module.exports = {
  getAll,
  create,
  update,
  deleteProject,
}
