'use strict';

const { validationError } = require('../../../constants/index').STATUS_CODES;

module.exports = (...validateFunctions) => {
    return (ctx, next) => {
        validateFunctions.forEach(validateFunction => validateFunction(ctx));

        if (ctx.errors) {
            return Promise.reject({
                validationErrors: ctx.errors,
                status: validationError
            });
        }
        return next();
    };
};
