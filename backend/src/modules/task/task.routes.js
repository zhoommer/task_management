const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');

router.get('/', taskController.getAll);

router.post('/', taskController.create);

module.exports = router;
