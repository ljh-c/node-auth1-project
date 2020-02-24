const router = require('express').Router();

const Users = require('./user-model.js');

router.get('/', async (req, res) => {
  try {
    res.status(200).json(await Users.get());
  }
  catch (err) {
    res.status(500).json({ error: 'Failed to get users', msg: err.message, stack: err.stack });
  }
});

module.exports = router;