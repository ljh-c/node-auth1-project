const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require('../user/user-model.js');

router.post('/register', async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;  
  
  try {
    const newUser = await Users.add(user);
    req.session.loggedIn = true;
    req.session.username = newUser.username;

    res.status(201).json(newUser);
  }
  catch (err) {
    res.status(500).json(err.stack);
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
  if (req.session.loggedIn) {
    req.session.destroy(err => {
      if (err) {
        res.json({ message: 'error logging out' });
      } else {
        res.status(200).json({ message: 'logged out successfully' });
      }
    });
  } else {
    res.status(200).json({ message: 'you were never logged in, so you are still logged out' });
  }
});
  
module.exports = router;