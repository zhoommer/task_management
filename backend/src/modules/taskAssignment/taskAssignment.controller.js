const assignmentService = require('./taskAssignment.service');


const getByTaskId = async (req, res) => {
  const { taskId } = req.params;

  const userId = req.user.id;

  if (!taskId) return res.status(400).json({ message: 'Missing parameter: taskId' });

  const result = await assignmentService.getByTaskId(Number(taskId), userId);

  return res.status(200).json({ message: 'Assignment returned successfully.', data: result });
}


module.exports = {
  getByTaskId,
}
