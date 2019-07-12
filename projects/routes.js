const router = require('express').Router();
const helmet = require('helmet');

const projectsDB = require('../data/helpers/projectModel');

router.use(helmet());

function sendError (res, message = `Server couldn't complete request`, code = 500) {
    res.status(code).json({ error: message });
}

async function validateProjectID(req, res, next) {
    if (req.params.id) {
        const id = new Number(req.params.id);
        if(!isNaN(id)) {
            try {
                req.project = await projectsDB.get(id);
                next();
                return;
            } catch (error) {
                sendError(res, `Project id ${id} does not exist`, 404);
                return;
            }
        }
        sendError(res, `${req.params.id} is not a valid id`, 400);
    } else {
        next();
    }
}
router.get('/', async (req, res) => {
    try {
        const projs = await projectsDB.get();
        res.status(200).json(projs);
    } catch (error) {
        sendError(res, "Error retrieving projects");
    }
})

router.get('/:id')

module.exports = router;