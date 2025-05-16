var express = require('express');
var projectController = require('./project.controller');

var router = express.Router();

router.post('/', projectController.create);

router.put('/:id', projectController.update);

router.delete('/:id', projectController.deleteProject);

router.get('/', projectController.getAll);


module.exports = router;
