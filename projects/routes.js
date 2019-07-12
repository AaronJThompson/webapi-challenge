const router = require('express').Router();
const helmet = require('helmet');

const projectsDB = require('../data/helpers/projectModel');

router.use(helmet());
function sendError (res, message = `Server couldn't complete request`, code = 500) {
    res.status(code).json({ error: message });
}
router.get('/', async (req, res) => {
    try {
        const projs = await projectsDB.get();
        res.status(200).json(projs);
    } catch (error) {
        sendError(res, "Error retrieving projects");
    }
})

module.exports = router;