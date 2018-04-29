'use strict';

const mapper = require('../../helpers/mapper');
const userService = require('../../businessLogic/services/user');
const UserModel = require('../../businessLogic/models/user');

class UserController {
    async register(ctx) {
        const user = ctx.request.body;

        const createdUser = await userService.register(user);

        return mapper.map(UserModel, 'UserViewModel', createdUser);
    }
}

module.exports = new UserController();