'use strict';

const BaseService = require('./base');
const taskRepository = require('../../dataAccess/repositories/task');
const TaskModel = require('../models/task');

class TaskService extends BaseService {
    constructor() {
        super(TaskModel, taskRepository, 'TaskDataModel', true);
    }

    findTasks(userId, isCompleted) {
        const query = isCompleted === undefined ?
            {
                author: userId,
                isDeleted: false
            } :
            {
                author: userId,
                isDeleted: false,
                isCompleted
            };

        return this.findByQuery(query);
    }

    async createTask(userId, task) {
        return this.create({
            ...task,
            author: userId
        });
    }

    async deleteCompletedTasks(userId) {
        await this.updateByQuery({
            author: userId,
            isCompleted: true
        },
        {
            isDeleted: true
        },
        {
            multi: true
        }
        );

        return this.findByQuery({
            author: userId
        });
    }

    async updateTask(id, task, user) {
        return this.update(id, task, user);
    }

    async completeTasks(userId) {
        await this.updateByQuery(
            {
                author: userId
            }, {
                isCompleted: true
            },
            {
                multi: true
            });

        return this.findByQuery({
            author: userId
        });
    }

    async deleteTask(id, user) {
        await this.update(id, {
            isDeleted: true
        }, user);
    }
}

module.exports = new TaskService();