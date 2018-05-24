'use strict';

module.exports = (ctx) => {
    ctx.checkQuery('isCompleted').optional();
};