const express = require('express');
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

module.exports = server => {
  server.use(express.json());
  server.use(session(sessionConfig));
};