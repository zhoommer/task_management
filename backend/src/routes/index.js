var express = require('express');
var router = express.Router();
var userRoutes = require('../modules/user/user.routes');
var authRoutes = require('../modules/auth/auth.routes');


router.use('/users', userRoutes);

router.use('/auth', authRoutes);
module.exports = router;
