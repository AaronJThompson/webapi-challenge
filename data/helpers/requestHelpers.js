const projectsDB = require('./projectModel');
const actionsDB = require('./actionModel');

module.exports = {
    sendError,
    validateProject,
    validateProjectID,
};

function sendError (res, message = `Server couldn't complete request`, code = 500) {
    res.status(code).json({ error: message });
}

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (!name || !description) {
        sendError(res, "Name and description field are required to create project", 400);
        return;
    }
    next();
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