var authService = require('./auth.service');
var validateFields = require('../../utils/validateFields');

const register = async (req, res) => {
  var requiredFields = ['name', 'email', 'passwordHash'];

  var result = validateFields(req.body, requiredFields);

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  var user = await authService.create(req.body);
  return res.status(201).json({ message: 'User created successfully.', data: user });
}

const login = async (req, res) => {
  var requiredFields = ['email', 'passwordHash'];

  var result = validateFields(req.body, requiredFields);

  if (!result.valid) {
    return res.status(400).json({ message: `Missing or invalid field: ${result.missingField}` });
  }

  var token = await authService.login(req.body);

  return res.status(200).json({ message: 'Logged in successfully.', token: token });
}

module.exports = {
  register,
  login,
}
