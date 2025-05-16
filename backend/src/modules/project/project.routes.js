const express = require('express');
const projectController = require('./project.controller');

const router = express.Router();

router.post('/', projectController.create);

router.put('/:id', projectController.update);

router.delete('/:id', projectController.deleteProject);

router.get('/', projectController.getAll);


module.exports = router;
