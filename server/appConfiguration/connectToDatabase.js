'use strict';

const dbContext = require('../dataAccess/context');

module.exports = () => {
    dbContext.connect();
};