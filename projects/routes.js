const router = require('express').Router();
const helmet = require('helmet');

const projectsDB = require('../data/helpers/projectModel');
const helper = require('../data/helpers/requestHelpers');

router.use(helmet());

router.get('/', async (req, res) => {
    try {
        const projs = await projectsDB.get();
        res.status(200).json(projs);
    } catch (error) {
        helper.sendError(res, "Error retrieving projects");
    }
})

router.get('/:id', helper.validateProjectID, (req, res) => {
    res.status(200).json(req.project);
})

router.post('/', helper.validateProject, async (req, res) => {
    try {
        const proj = await projectsDB.insert(req.body);
        if (!proj) {
            throw new Error("Project couldn't be created");
        }
        res.status(201).json(post);
    } catch (error) {
        helper.sendError(res, "Project couldn't be created", 500);
    }
})

router.put('/:id', helper.validateProjectID, async(req, res) => {
    if (Object.keys(req.body).length === 0) {
        sendError(res, "Nothing to update", 400);
        return;
    }
    try {
        const proj = await projectsDB.update(req.project.id,  req.body);
        if (proj) {
            res.status(200).json(proj);
        } else {
            throw new Error("Couldn't update post");
        }
    } catch (error) {
        helper.sendError(res, "Couldn't update post", 500);
    }
})

router.delete('/:id', helper.validateProjectID, async (req, res) => {
    try {
        await projectsDB.remove(req.project.id);
        res.status(200).json(req.project);
    } catch (error) {
        helper.sendError(res, "Project couldn't be deleted", 500);
    }
})
module.exports = router;