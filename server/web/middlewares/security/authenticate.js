'use strict';

const config = require('config');
const jwt = require('jsonwebtoken');
const userService = require('../../../businessLogic/services/user');
const dateTimeHelper = require('../../../helpers/dateTimeHelper');

const secret = config.get('jwt.secret');
const { unauthorized, success } = require('../../../constants/index').STATUS_CODES;

module.exports = async (ctx) => {
    const { request: { body: { email, password } } } = ctx;

    if (await userService.isCredentialsValid(email, password)) {
        const { id, role } = await userService.findByEmail(email);

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