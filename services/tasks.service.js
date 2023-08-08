const Task = require('../models/task.model');

const TASKS_SERVICE = {};

TASKS_SERVICE.getAll = async () => {
    console.log('ENTERING: Task Serivce getAll');
    try {
        const tasks = await Task.find();
        return tasks;
    } catch (err) {
        console.error(err);
    }
}

TASKS_SERVICE.getById = async (taskId) => {
    console.log('ENTERING: Task Service getById');
    try {
        if (!taskId) return;
        const tasks = await Task.findById(taskId);
        return tasks;
    } catch (err) {
        consle.error(err);
    }
}

TASKS_SERVICE.add = async (task) => {
    console.log('ENTERING: Task Service add');
    try {
        if (!task) return;
        task.completed = false;
        const result = await Task.create(task);
        return result;
    } catch (err) {
        console.error(err);
    }
}

TASKS_SERVICE.updateById = async (taskId, update) => {
    console.log('ENTERING: Task Service updateById');
    try {
        if (!taskId) return;
        await Task.findByIdAndUpdate(taskId, update);
        const task = await TASKS_SERVICE.getById(taskId);
        return task;
    } catch (err) {
        consle.error(err);
    }
}

TASKS_SERVICE.deleteById = async (taskId) => {
    console.log('ENTERING: Task Service deleteById');
    try {
        if (!taskId) return;
        const tasks = await Task.findByIdAndDelete(taskId);
        console.log(tasks);
        return tasks;
    } catch (err) {
        consle.error(err);
    }
}

TASKS_SERVICE.completeById = async (taskId) => {
    console.log('ENTERING: Task Service completeById');
    try {
        if (!taskId) return;
        const task = await TASKS_SERVICE.getById(taskId);
        console.log(task);
        if (!task) return;
        task.completed = true;
        const completedTask = await TASKS_SERVICE.updateById(taskId, task);
        console.log(completedTask);
        return task;
    } catch (err) {
        consle.error(err);
    }
}

module.exports = TASKS_SERVICE;