'use strict';

const logger = require('../helpers/logger');
const { validationError } = require('../constants').STATUS_CODES;

module.exports = (app) => {
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            if (err.code) {
                err.status = validationError;
            }
            logger.error(err);
            ctx.body = err;
            ctx.status = err.status;
        }
    });
};