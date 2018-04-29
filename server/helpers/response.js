'use strict';

const logger = require('../helpers/logger');

const { serverError, success } = require('../constants').STATUS_CODES;

class Response {
    wrap(fn) {
        const self = this;

        return async (ctx, next) => {
            try {
                const data = await fn(ctx, next);

                self.send(ctx, null, data);
            } catch (err) {
                self.send(ctx, err);
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