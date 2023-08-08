const TASKS_SERVICE = require('../services/tasks.service');
const TASKS_CONTROLLER = {};

TASKS_CONTROLLER.getAll = async (request, response) => {
    console.log('[ENTERING TASKS]: getAll Controller');
    let tasks = [];
    try {
        tasks = await TASKS_SERVICE.getAll();
        if (!tasks) {
            response.status(400).send({
                status: 400,
                tasks: tasks,
                message: 'Error fetching the list of tasks',
            });
            return;
        }

        response.status(200).send({
            stauts: 200,
            tasks: tasks,
            message: ''
        });
    } catch (err) {
        console.error(err);
        response.status(400).send({
            status: 400,
            tasks: tasks,
            message: `Error fetching the list of tasks: ${err}`,
        });
    }
}

TASKS_CONTROLLER.getById = async (request, response) => {
    console.log('[ENTERING TASKS]: getById Controller');
    const { params: { taskId } } = request;

    if (!taskId) {
        response.status(400).send({
            status: 400,
            message: 'Task id is required',
            taskId,
        });

        return;
    }

    let task;

    try {
        task = await TASKS_SERVICE.getById(taskId);
        if (!task) {
            response.status(404).send({
                status: 404,
                message: 'Task not found',
                task,
            });

            return;
        }

        response.status(200).send({
            status: 200,
            message: 'Task was found',
            task,
        });
    } catch (err) {
        response.status(400).send({
            message: 'Error fetching the task by id',
            stackTrace: err,
            task,
        });
    }
}

TASKS_CONTROLLER.add = async (request, response) => {
    const { body } = request;
    if (!body.title || !body.description) {
        response.status(400).send({
            status: 400,
            message: 'Title and Description are required',
            title: body.title,
            description: body.description,
        });
    }

    try {
        const task = await TASKS_SERVICE.add(body);

        response.status(200).send({
            status: 200,
            message: 'Task saved successfully',
            task,
        });
    } catch (err) {
        response.status(400).send({
            status: 400,
            message: 'Error trying to save the task',
            stackTrace: err,
            body,
        });
    }
}
TASKS_CONTROLLER.updateById = async (request, response) => {
    console.log('[ENTERING TASKS]: getById Controller');
    const { params: { taskId } } = request;
    const { body } = request;

    if (!taskId) {
        response.status(400).send({
            status: 400,
            message: 'Task id is required',
            taskId,
        });

        return;
    }

    let task;

    try {
        task = await TASKS_SERVICE.updateById(taskId, body);
        if (!task) {
            response.status(400).send({
                status: 400,
                message: 'Error trying to update task',
                task,
            });

            return;
        }

        response.status(200).send({
            status: 200,
            message: 'Task has been updated successfully',
            task,
        });
    } catch (err) {
        response.status(400).send({
            message: 'Error updating the task by id',
            stackTrace: err,
            task,
        });
    }

}

TASKS_CONTROLLER.deleteById = async (request, response) => {
    console.log('[ENTERING TASKS]: getById Controller');
    const { params: { taskId } } = request;

    if (!taskId) {
        response.status(400).send({
            status: 400,
            message: 'Task id is required',
            taskId,
        });

        return;
    }

    let task;

    try {
        task = await TASKS_SERVICE.deleteById(taskId);
        if (!task) {
            response.status(400).send({
                status: 400,
                message: 'Error trying to remove task',
                task,
            });

            return;
        }

        response.status(200).send({
            status: 200,
            message: 'Task has been removed successfully',
            task,
        });
    } catch (err) {
        response.status(400).send({
            message: 'Error removing the task by id',
            stackTrace: err,
            task,
        });
    }
}

TASKS_CONTROLLER.completeById = async (request, response) => {
    console.log('[ENTERING TASKS]: getById Controller');
    const { params: { taskId } } = request;

    if (!taskId) {
        response.status(400).send({
            status: 400,
            message: 'Task id is required',
            taskId,
        });

        return;
    }

    let completedTask;

    try {
        completedTask = await TASKS_SERVICE.completeById(taskId);
        if (!completedTask) {
            response.status(400).send({
                status: 400,
                message: 'Error trying to complete task',
                task,
            });

            return;
        }

        response.status(200).send({ 
            status: 200,
            message: 'Task completed successfully',
            completedTask,
        });
    } catch (err) {
        response.status(400).send({
            status: 400,
            message: 'Error trying to complete task',
            stackTrace: err,
            completedTask,
            taskId,
        });
     }
}
module.exports = TASKS_CONTROLLER;