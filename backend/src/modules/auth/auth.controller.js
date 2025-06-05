const authService = require('./auth.service');
const { asyncWrapper } = require('../../middleware/asyncWrapper');

exports.register = asyncWrapper(async (req, res) => {
  const response = await authService.register(req.body);
  return res.status(201).json({ message: 'User created successfully.', data: response });
});


exports.login = asyncWrapper(async (req, res) => {
  const response = await authService.login(req.body);

  console.log("RES: ", response);

  return res.status(200).json({ message: 'Logged in successfully.', data: response });
})
