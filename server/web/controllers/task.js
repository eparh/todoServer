'use strict';

const mapper = require('../../helpers/mapper');
const taskService = require('../../domain/services/task');
const TaskModel = require('../../domain/models/task');

class TaskController {
    async getTask(ctx) {
        const id = ctx.params.id;

        const task = await taskService.findById(id);

        return mapper.map(TaskModel, 'TaskViewModel', task);
    }

    async getTasks(ctx) {
        const userId = ctx.state.user.id;
        const { isCompleted } = ctx.request.query;
        const tasks = await taskService.findTasks(userId, isCompleted);

        return mapper.mapArray(TaskModel, 'TaskViewModel', tasks);
    }

    async deleteCompletedTasks(ctx) {
        const userId = ctx.state.user.id;
        const tasks = await taskService.deleteCompletedTasks(userId);

        return mapper.mapArray(TaskModel, 'TaskViewModel', tasks);
    }

    async createTask(ctx) {
        const task = ctx.request.body;
        const userId = ctx.state.user.id;

        const createdTask = await taskService.createTask(userId, task);

        return mapper.map(TaskModel, 'TaskViewModel', createdTask);
    }

    async updateTask(ctx) {
        const { id } = ctx.params;
        const task = ctx.request.body;
        const user = ctx.state.user;

        const updatedTask = await taskService.updateTask(id, task, user);

        return mapper.map(TaskModel, 'TaskViewModel', updatedTask);
    }

    async completeTasks(ctx) {
        const userId = ctx.state.user.id;
        const tasks = await taskService.completeTasks(userId);

        return mapper.mapArray(TaskModel, 'TaskViewModel', tasks);
    }

    deleteTask(ctx) {
        const { id } = ctx.params;
        const user = ctx.state.user;

        return taskService.deleteTask(id, user);
    }
}

module.exports = new TaskController();