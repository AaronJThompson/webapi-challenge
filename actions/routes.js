const router = require('express').Router();
const helmet = require('helmet');

const actionsDB = require('../data/helpers/actionModel');
const helper = require('../data/helpers/requestHelpers');

router.get('/', async (req, res) => {
    try {
        const actions = await actionsDB.get();
        if (!actions) {
            throw new Error("Couldn't get actions");
        }
        res.status(200).json(actions);
    } catch (error) {
        helper.sendError(res, "Couldn't get actions", 500);
    }
})

router.get('/:id', helper.validateActionID, (req, res) => {
    res.status(200).json(req.action);
})

router.use(helmet());

module.exports = router;