const validateFields = require('../../utils/validateFields');
const taskService = require('./task.service');
const { FIELDS, STATUS, PRIORITY } = require('./constants');


const getAll = async (req, res) => {
  const queries = req.query;

  const allTasks = await taskService.getAll(queries);

  return res.status(200).json({ message: 'All tasks succesfully returned.', data: allTasks });
}

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Missing field task id.' });

  const task = await taskService.getById(id);

  return res.status(200).json({ message: 'Task found.', data: task });
}

const create = async (req, res) => {

  if (!PRIORITY.includes(req.body.priority)) return res.status(400).json({ message: 'Priority must be low, medium, high, critical.' });

  const result = validateFields(req.body, FIELDS);

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  const createdById = req.user.id;

  if (!createdById) return res.status(400).json({ message: 'Creator id is required.' });

  const task = await taskService.create(req.body, createdById);

  if (!task) {
    res.status(404).json({ message: 'Task not found.' });
  }
  return res.status(201).json({ message: 'Task succesfully created.', data: task });
}

const update = async (req, res) => {
  if (!STATUS.includes(req.body.status)) return res.status(400).json({ message: 'Status must be waiting, inprogress, test, done.' });

  if (!PRIORITY.includes(req.body.priority)) return res.status(400).json({ message: 'Priority must be low, medium, high, critical.' });

  const result = validateFields(req.body, FIELDS);

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Task id is required.' });

  const updatedTask = await taskService.update(req.body, id);

  return res.status(201).json({ messasge: 'Task succesfully updated.', data: updatedTask });
}

const updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  const { id } = req.params;

  if (!status) return res.status(400).json({ message: 'Status field is required.' });

  if (!STATUS.includes(status)) return res.status(400).json({ message: 'Status must be waiting, inprogress, test or done.' });

  const updatedTask = await taskService.updateTaskStatus(id, status);

  return res.status(200).json({ message: 'Task updated succesfully.', data: updatedTask });
}

const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "Task id required." });

  const deletedTask = await taskService.deleteTask(Number(id));

  return res.status(200).json({ message: "Task deleted succesfully.", data: deletedTask });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateTaskStatus,
  deleteTask,
}
