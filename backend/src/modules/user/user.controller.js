const userService = require('./user.service');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  return res.status(200).json({ message: 'Users fetched successfully.', data: users });
}

const getMe = async (req, res) => {
  const { id } = req.user.id;

  if (!id) return res.status(400).json({ message: 'Missing field user id' });

  const user = await userService.getMe(id);

  return res.status(200).json({ message: 'User found', data: user });
}

const getById = async (req, res) => {
  const { id } = req.params;

  if (!id || id == null) {
    return res.status(400).json({ message: 'Missing field user id' });
  }

  const user = await userService.getById(id);

  return res.status(200).json({ message: 'User found.', data: user });
}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id || id == null) return res.status(400).json({ message: 'Missing field user id' });

  await userService.deleteUser(id);

  return res.status(200).json({ message: 'User deleted successfully' });
}


module.exports = {
  getAll,
  getMe,
  getById,
  deleteUser,
}
