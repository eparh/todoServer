'use strict';

module.exports = (ctx) => {
    ctx.checkBody('description').notEmpty();
    ctx.checkBody('isCompleted').notEmpty();
};