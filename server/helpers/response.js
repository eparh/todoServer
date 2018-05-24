'use strict';

const logger = require('../helpers/logger');

const { serverError, success } = require('../constants').STATUS_CODES;

class Response {
    wrap(fn) {
        return async (ctx, next) => {
            try {
                const data = await fn(ctx, next);

                this.send(ctx, null, data);
            } catch (err) {
                this.send(ctx, err);
            }
        };
    }

    send(ctx, err, data) {
        if (err) {
            logger.error(err);
            ctx.status = err.status || err.statusCode || serverError;
            ctx.body = {
                cause: err.name,
                message: err.message
            };
        } else {
            ctx.status = data && data.statusCode || success;
            ctx.body = data;
        }
    }
}

module.exports = new Response();