const express = require('express');
const router = express.Router();
const taskController = require('./task.controller');

router.get('/', taskController.getAll);

router.post('/', taskController.create);

router.put('/:id', taskController.update);

router.patch('/:id', taskController.updateTaskStatus);

router.delete('/:id', taskController.deleteTask);

module.exports = router;
