'use strict';

const config = require('config');
const koaJwt = require('koa-jwt');

const secret = config.get('jwt.secret');

module.exports = koaJwt({
    secret
});