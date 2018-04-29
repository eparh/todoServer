'use strict';

const userController = require('../controllers/user');
const BaseRoute = require('./base');

const validateLoginInfo = require('../validators/user/validateLoginInfo');
const validateRegisterInfo = require('../validators/user/validateRegisterInfo');
const authenticate = require('../middlewares/security/authenticate');

class UserRoute extends BaseRoute {
    constructor() {
        super(userController);
    }

    get(router) {
        const { validator } = this;

        router.prefix('/users');

        router.post('/register', validator(validateRegisterInfo), this.registerHandler('register'));
        router.post('/login', authenticate, validator(validateLoginInfo));
    }
}

module.exports = new UserRoute();
