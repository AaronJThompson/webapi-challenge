const router = require('express').Router();
const helmet = require('helmet');

const actionsDB = require('../data/helpers/actionModel');

router.use(helmet());

module.exports = router;