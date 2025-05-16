const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.delete('/:id', userController.deleteUser);

module.exports = router;

