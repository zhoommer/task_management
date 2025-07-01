const taskService = require('./task.service');

const getAll = async (req, res) => {
  const queries = req.query;

  const allTasks = await taskService.getAll(queries);

  return res.status(200).json({ message: 'All tasks successfully returned.', data: allTasks });
}

const getById = async (req, res) => {
  const { id } = req.params;

  const task = await taskService.getById(id);

  if (!task) return res.status(404).json({ message: 'Task not found.' });

  return res.status(200).json({ message: 'Task found.', data: task });
}

const create = async (req, res) => {
  const createdById = req.user.id;

  const task = await taskService.create(req.body, createdById);

  if (!task) return res.status(400).json({ message: 'Task creation failed.' });

  return res.status(201).json({ message: 'Task successfully created.', data: task });
}

const update = async (req, res) => {
  const { id } = req.params;

  const updatedTask = await taskService.update(req.body, id);

  if (!updatedTask) return res.status(400).json({ message: 'Task update failed.' });

  return res.status(200).json({ message: 'Task successfully updated.', data: updatedTask });
}

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedTask = await taskService.updateTaskStatus(id, status);

  if (!updatedTask) return res.status(400).json({ message: 'Task status update failed.' });

  return res.status(200).json({ message: 'Task status successfully updated.', data: updatedTask });
}

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const deletedTask = await taskService.deleteTask(Number(id));

  if (!deletedTask) return res.status(400).json({ message: 'Task deletion failed.' });

  return res.status(200).json({ message: 'Task successfully deleted.', data: deletedTask });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateTaskStatus,
  deleteTask,
}