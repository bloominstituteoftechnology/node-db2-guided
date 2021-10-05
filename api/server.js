const express = require('express');

const fruitsRouter = require('./fruits/fruits-router.js');

const server = express();

server.use(express.json());

server.use('/api/fruits', fruitsRouter);

module.exports = server;
