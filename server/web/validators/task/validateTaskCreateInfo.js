'use strict';

module.exports = (ctx) => {
    ctx.checkBody('description').notEmpty();
};


