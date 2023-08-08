const TASKS_CONTROLLER = require('../../controllers/tasks.controller');
const router = require('express').Router();

router 
    .get('/tasks', TASKS_CONTROLLER.getAll)
    .get('/tasks/:taskId', TASKS_CONTROLLER.getById)
    .post('/tasks', TASKS_CONTROLLER.add)
    .put('/tasks/:taskId', TASKS_CONTROLLER.updateById)
    .patch('/tasks/:taskId', TASKS_CONTROLLER.completeById)
    .delete('/tasks/:taskId', TASKS_CONTROLLER.deleteById);

module.exports = router;