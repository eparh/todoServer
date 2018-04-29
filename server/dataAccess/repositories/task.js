'use strict';

const dbContext = require('../../dataAccess/context');
const BaseRepository = require('./base');

class TaskRepository extends BaseRepository {
    constructor() {
        super(dbContext, 'Task');
    }
}

module.exports = new TaskRepository();