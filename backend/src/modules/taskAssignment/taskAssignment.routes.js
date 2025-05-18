const express = require('express');
const router = express.Router();
const assignmentController = require('./taskAssignment.controller');

router.get('/:taskId', assignmentController.getByTaskId);


module.exports = router;
