const express = require('express');
const apiRouter = require('./api-router.js');
const middlewareConfig = require('./middleware-config.js');

const server = express();

middlewareConfig(server);

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.send('<h1>Authentication</h1>');
});

module.exports = server;