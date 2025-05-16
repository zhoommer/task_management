var express = require('express');
var jwtAuth = require('../middleware/authMiddleware');
var router = express.Router();
var userRoutes = require('../modules/user/user.routes');
var authRoutes = require('../modules/auth/auth.routes');
var projectRoutes = require('../modules/project/project.routes');


router.use('/users', jwtAuth, userRoutes);

router.use('/auth', authRoutes);

router.use('/project', jwtAuth, projectRoutes);


module.exports = router;
