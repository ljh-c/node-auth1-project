const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const userRouter = require('../user/user-router.js');

const restricted = require('../auth/restricted.js');

router.use('/', authRouter);
router.use('/users', restricted, userRouter);

router.get('/restricted/secret', (req, res) => {
  res.status(200).json({ msg: `Hi ${req.session.username}, logged in is ${req.session.loggedIn}. This is secret.` });
});

module.exports = router;