// const bcrypt = require('bcryptjs');
// const Users = require('../user/user-model.js');

module.exports = async (req, res, next) => {
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ error: 'Please provide credentials' })
  }

  // const { username, password } = req.headers;

  // if (username && password) {
  //   try {
  //     const user = await Users.getBy({ username });

  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       next();
  //     } else {
  //       res.status(401).json({ message: 'You shall not pass!' })
  //     }
  //   }
  //   catch ({ name, message, stack }) {
  //     res.status(500).json({ name, message, stack })
  //   }
  // } else {
  //   res.status(400).json({ error: 'Please provide credentials' })
  // }
};