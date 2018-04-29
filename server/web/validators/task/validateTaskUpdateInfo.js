'use strict';

module.exports = (ctx) => {
    ctx.checkBody('title').notEmpty();
    ctx.checkBody('description').notEmpty();
};