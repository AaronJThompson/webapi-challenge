const express = require('express');
const projectRoutes = require('./projects/routes');
const actionRoutes = require('./actions/routes');
const server = express();
const cors = require('cors')
server.use(express.json());
server.use(cors());
server.use('/api/projects', projectRoutes);

server.use('/api/actions', actionRoutes);

module.exports = server;