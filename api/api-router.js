const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../user/user-router.js');

const restricted = require('../auth/restricted.js');

router.use('/', authRouter);
router.use('/users', restricted, userRouter);

module.exports = router;