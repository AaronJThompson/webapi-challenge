const express = require('express');
const projectRoutes = require('./projects/routes');
const actionRoutes = require('./actions/routes');
const server = express();

server.use(express.json());

server.use('/api/projects', projectRoutes);

server.use('/api/actions', actionRoutes);

module.exports = server;