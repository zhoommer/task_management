const express = require('express');
const jwtAuth = require('../middleware/authMiddleware');
const router = express.Router();
const userRoutes = require('../modules/user/user.routes');
const authRoutes = require('../modules/auth/auth.routes');
const projectRoutes = require('../modules/project/project.routes');
const taskRoutes = require('../modules/task/task.routes');


router.use('/auth', authRoutes);

router.use('/users', jwtAuth, userRoutes);

router.use('/project', jwtAuth, projectRoutes);

router.use('/task', jwtAuth, taskRoutes);

module.exports = router;
