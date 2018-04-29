'use strict';

const Router = require('koa-router');

const response = require('../../helpers/response');
const validator = require('../middlewares/validation/validator');

class BaseRoute {
    constructor(controller) {
        this.controller = controller;
        this.validator = validator;
    }

    apply() {
        const router = new Router();

        this.get(router);

        return router.routes();
    }

    registerHandler(methodName, isAsync = true) {
        const { controller } = this;
        const handler = controller[methodName].bind(controller);

        if (isAsync) {
            return response.wrap(handler);
        } else {
            return handler;
        }
    }
}

module.exports = BaseRoute;