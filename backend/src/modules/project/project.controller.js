const projectService = require('./project.service');
const validateFields = require('../../utils/validateFields');


const getAll = async (req, res) => {
  const projects = await projectService.getAll(req.query);

  return res.status(200).json({ message: 'All projects succesfully fetched.', data: projects });
}

const create = async (req, res) => {
  const validatedFields = ['name', 'description'];

  const createdById = req.user?.id;

  const result = validateFields(req.body, validatedFields);

  if (!createdById) {
    return res.status(400).json({ message: 'Missing field: createdById' });
  }

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  const createdProject = await projectService.create(req.body, createdById);

  return res.status(201).json({ message: 'Project created succesfully', data: createdProject });
}

const update = async (req, res) => {
  const validatedFields = ['name', 'description'];

  const id = req.params.id;

  if (!id) {
    res.status(400).json({ message: 'Project id is required.' });
  }

  const result = validateFields(req.body, validatedFields);

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  const updatedProject = await projectService.update(req.body, Number(id));

  return res.status(200).json({ message: 'Project updated succesfully', data: updatedProject });
}

const deleteProject = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ message: 'Project id is required.' });
  }

  const deletedProject = await projectService.deleteProject(Number(id));

  return res.status(200).json({ message: 'Project deleted succesfully.', data: deletedProject });
}

module.exports = {
  getAll,
  create,
  update,
  deleteProject,
}
