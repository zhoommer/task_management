var express = require('express');
var router = express.Router();
var userController = require('./user.controller');

router.get('/', userController.getAll);

router.get('/:id', userController.getById);

router.delete('/:id', userController.deleteUser);

module.exports = router;

