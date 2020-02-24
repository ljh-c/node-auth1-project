const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../user/user-model.js');

router.post('/register', async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  try {
    res.status(201).json(await Users.add(user));
  }
  catch (err) {
    res.status(500).json(error);
  }
});

module.exports = router;