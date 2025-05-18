const assignmentService = require('./taskAssignment.service');


const getByTaskId = async (req, res) => {
  const { taskId } = req.params;

  const userId = req.user.id;

  if (!taskId) return res.status(400).json({ message: 'Missing parameter: taskId' });

  return assignmentService.getByTaskId(Number(taskId), userId);
}


module.exports = {
  getByTaskId,
}
