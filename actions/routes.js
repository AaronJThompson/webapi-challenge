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

router.post('/', helper.validateAction, async (req, res) => {
    try {
        const action = await actionsDB.insert(req.body);
        if (!action) {
            throw new Error("Couldn't create action");
        }
        res.status(201).json(action);
    } catch (error) {
        helper.sendError(res, "Couldn't create action", 500);
    }
})

router.put('/:id', helper.validateActionID, async (req, res) => {
    if(Object.keys(req.body) === 0) {
        helper.sendError(res, "Nothing to update", 400);
        return;
    }
    if(req.description && req.description.length > 128) {
        helper.sendError(res, "Description too long. 128 character limit", 400);
        return;
    }
    try {
        const action = await actionsDB.update(req.action.id, req.body);
        if (!action) {
            throw new Error("Couldn't update action");
        }
        res.status(200).json(action);
    } catch (error) {
        helper.sendError(res, "Couldn't update action", 500);
    }
})

router.delete('/:id', helper.validateActionID, async (req, res) => {
    try {
        await actionsDB.remove(req.action.id);
        res.status(200).json(req.action);
    } catch (error) {
        helper.sendError(res, "Couldn't remove action", 500);
    }
})
router.use(helmet());

module.exports = router;