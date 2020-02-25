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
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.getBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.loggedIn = true;
      req.session.username = user.username;

      res.status(200).json({ message: `Logged in. id: ${user.id}` })
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logout', (req, res) => {
  
  
  req.session.destroy(err => {
    if (err) {
      res.json({ message: 'you can\'t leave' });
    } else {
      res.status(200).json({ message: 'bye' });
    }


  });
});

module.exports = router;