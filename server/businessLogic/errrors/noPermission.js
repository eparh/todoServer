'use strict';

const BaseError = require('./base');
const { forbidden } = require('../../constants/').STATUS_CODES;

class NoPermissionError extends BaseError {
    constructor(message) {
        super(message);
        this.statusCode = forbidden;
    }
}

module.exports = NoPermissionError;
