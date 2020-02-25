const express = require('express');
const apiRouter = require('./api-router.js');
const middlewareConfig = require('./middleware-config.js');

const server = express();

const sessionConfig = {
  name: 'monkey',
  secret: 'keep it secret, keep it safe', // secret in production
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false  
  // GDPR laws against setting cookies automatically
};

middlewareConfig(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.send('<h1>Authentication</h1>');
});

module.exports = server;