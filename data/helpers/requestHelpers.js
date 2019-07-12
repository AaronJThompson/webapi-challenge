const projectsDB = require('./projectModel');
const actionsDB = require('./actionModel');

module.exports = {
    sendError,
    validateProject,
    validateProjectID,
    validateAction,
    validateActionID
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

async function validateActionID(req, res, next) {
    if (req.params.id) {
        const id = parseInt(req.params.id);
        if(!isNaN(id)) {
            try {
                req.action = await actionsDB.get(id);
                if (req.action === null || Object.keys(req.action).length === 0) {
                    throw new Error("Action was empty or doesn't exist");
                }
                next();
                return;
            } catch (error) {
                sendError(res, `Action id ${id} does not exist`, 404);
                return;
            }
        }
        sendError(res, `${req.params.id} is not a valid id`, 400);
    } else {
        next();
    }
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        sendError(res, "project-id, description and notes field are required to create action", 400);
        return;
    }
    if (description.length > 128) {
        sendError(res, "description too long. 128 character limit", 400);
        return;
    }
    next();
}