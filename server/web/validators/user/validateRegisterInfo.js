'use strict';

const { emailMinLength, emailMaxLength, passwordMinLength, passwordMaxLength } = require('../../../constants/validationOptions');

module.exports = (ctx) => {
    ctx.checkBody('email').notEmpty().len(emailMinLength, emailMaxLength, 'email\'s length should be between 4 and 30');
    ctx.checkBody('password').notEmpty().len(passwordMinLength, passwordMaxLength, 'password\'s length should be more than 4');
};

