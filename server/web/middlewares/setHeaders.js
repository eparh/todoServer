'use strict';

const responseHeaders = require('../../constants/responseHeaders');

module.exports = async (ctx, next) => {
    responseHeaders.forEach(header => ctx.set(Object.keys(header)[0], Object.values(header)[0]));
    await next();
};
