const authService = require('./auth.service');
const validateFields = require('../../utils/validateFields');

const register = async (req, res) => {
  const requiredFields = ['name', 'email', 'passwordHash'];

  const result = validateFields(req.body, requiredFields);

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  const user = await authService.create(req.body);
  return res.status(201).json({ message: 'User created successfully.', data: user });
}

const login = async (req, res) => {
  const requiredFields = ['email', 'passwordHash'];

  const result = validateFields(req.body, requiredFields);

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  const response = await authService.login(req.body);

  return res.status(200).json({ message: 'Logged in successfully.', data: response });
}

module.exports = {
  register,
  login,
}
