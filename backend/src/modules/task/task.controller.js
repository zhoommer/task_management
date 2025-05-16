const validateFields = require('../../utils/validateFields');
const taskService = require('./task.service');
const { FIELDS, STATUS, PRIORITY } = require('./constants');


const getAll = async (req, res) => {
  const allTasks = await taskService.getAll();

  return res.status(200).json({ message: 'All tasks succesfully returned.', data: allTasks });
}

const create = async (req, res) => {
  if (!STATUS.includes(req.body.status)) return res.status(400).json({ message: 'Status should be waiting, inprogress, test, done.' });

  if (!PRIORITY.includes(req.body.priority)) return res.status(400).json({ message: 'Priority should be low, medium, high, critical.' });

  const result = validateFields(req.body, FIELDS);

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  const createdById = req.user.id;

  if (!createdById) return res.status(400).json({ message: 'Creator id is required.' });

  const createdTask = await taskService.create(req.body, createdById);

  return res.status(201).json({ messasge: 'Task succesfully created.', data: createdTask });

}

module.exports = {
  getAll,
  create,
}
