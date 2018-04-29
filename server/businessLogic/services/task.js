'use strict';

const BaseService = require('./base');
const taskRepository = require('../../dataAccess/repositories/task');
const TaskModel = require('../models/task');

class TaskService extends BaseService {
    constructor() {
        super(TaskModel, taskRepository, 'TaskDataModel', true);
    }

    async createTask(userId, task) {
        return this.create({
            ...task,
            author: userId
        });
    }

    async updateTask(id, task, user) {
        return this.update(id, task, user);
    }

    async deleteTask(id, user) {
        await this.removeById(id, user);
    }
}

module.exports = new TaskService();