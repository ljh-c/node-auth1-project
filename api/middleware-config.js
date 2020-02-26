const express = require('express');
const cors = require('cors');
const session = require('express-session');
const knexStore = require('connect-session-knex')(session);
const knex = require('../data/db-config.js');

const sessionConfig = {
  name: 'decisive',
  secret: 'etvimoravianB7_T9e4mrD', // save as env variable
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 5,  // 5 minutes
    secure: false,  // should be true in production
    httpOnly: true
  },
  store: new knexStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    clearInterval: 1000 * 60 * 5,
  })
};

const logger = (req, res, next) => {
  console.log(`${req.method} Request to ${req.originalUrl} \n ${req.path}`);
  console.dir(req.session.loggedIn);

  if (req.path.includes('restricted') && !req.session.loggedIn) {
    res.status(401).json({ error: 'Please log in to see this content' });
  } else {
    next();
  }
}

module.exports = server => {
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig));
  server.use('/', logger);
};