'use strict';

const { loginMinLength, loginMaxLength, passwordMinLength, passwordMaxLength } = require('../../../constants/validationOptions');

module.exports = (ctx) => {
    ctx.checkBody('login').notEmpty().len(loginMinLength, loginMaxLength, 'login\'s length should be between 4 and 30');
    ctx.checkBody('password').notEmpty().len(passwordMinLength, passwordMaxLength, 'password\'s length should be more than 4');
};

