const router = require('express').Router();
const helmet = require('helmet');

const projectsDB = require('../data/helpers/projectModel');

router.use(helmet());

function sendError (res, message = `Server couldn't complete request`, code = 500) {
    res.status(code).json({ error: message });
}

async function validateProjectID(req, res, next) {
    if (req.params.id) {
        const id = parseInt(req.params.id);
        if(!isNaN(id)) {
            try {
                req.project = await projectsDB.get(id);
                if (req.project === null || Object.keys(req.project).length === 0) {
                    throw new Error("Project was empty or doesn't exist");
                }
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

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        sendError(res, "Name and description field are required to create project", 400);
        return;
    }
    next();
}

router.get('/', async (req, res) => {
    try {
        const projs = await projectsDB.get();
        res.status(200).json(projs);
    } catch (error) {
        sendError(res, "Error retrieving projects");
    }
})

router.get('/:id', validateProjectID, (req, res) => {
    res.status(200).json(req.project);
})

router.post('/', validateProject, async (req, res) => {
    try {
        const proj = await projectsDB.insert(req.body);
        if (!proj) {
            throw new Error("Project couldn't be created");
        }
        res.status(201).json(post);
    } catch (error) {
        sendError(res, "Project couldn't be created", 500);
    }
})

router.put('/:id', validateProjectID, async(req, res) => {
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
        sendError(res, "Couldn't update post", 500);
    }
})

router.delete('/:id', validateProjectID, async (req, res) => {
    try {
        await projectsDB.remove(req.project.id);
        res.status(200).json(req.project);
    } catch (error) {
        sendError(res, "Project couldn't be deleted", 500);
    }
})
module.exports = router;