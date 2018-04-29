'use strict';

const taskController = require('../controllers/task');
const BaseRoute = require('./base');
const validateTaskCreateInfo = require('../validators/task/validateTaskCreateInfo');
const validateTaskUpdateInfo = require('../validators/task/validateTaskUpdateInfo');
const validateIdParam = require('../validators/task/validateIdParam');
const jwt = require('../middlewares/security/jwt');

class TaskRoute extends BaseRoute {
    constructor() {
        super(taskController);
    }

    get(router) {
        const { validator } = this;

        router.prefix('/tasks');
        router.use(jwt);

        router.get('/', this.registerHandler('getTasks'));
        router.get('/:id', validator(validateIdParam), this.registerHandler('getTask'));
        router.post('/', validator(validateTaskCreateInfo), this.registerHandler('createTask'));
        router.put('/:id', validator(validateTaskUpdateInfo, validateIdParam), this.registerHandler('updateTask'));
        router.delete('/:id', validator(validateIdParam), this.registerHandler('deleteTask'));
    }
}

module.exports = new TaskRoute();
