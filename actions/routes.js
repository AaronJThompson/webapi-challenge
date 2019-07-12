const router = require('express').Router();
const helmet = require('helmet');

const actionsDB = require('../data/helpers/actionModel');
const helper = require('../data/helpers/requestHelpers');

router.use(helmet());

module.exports = router;