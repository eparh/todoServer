'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');
const userService = require('../../../domain/services/user');
const dateTimeHelper = require('../../../helpers/dateTimeHelper');

const secret = config.get('jwt.secret');
const { unauthorized, success } = require('../../../constants/index').STATUS_CODES;

module.exports = async (ctx) => {
    const { request: { body: { login, password } } } = ctx;

    if (await userService.isCredentialsValid(login, password)) {
        const { id, role } = await userService.findByLogin(login);

        ctx.status = success;
        ctx.body = {
            token: jwt.sign(
                {
                    id,
                    role,
                    exp: dateTimeHelper.getExpirationDate()
                },
                secret
            ),
            message: 'Successfully logged in!'
        };
    } else {
        ctx.status = ctx.status = unauthorized;
        ctx.body = {
            message: 'Authentication failed'
        };
    }
    return ctx;
};