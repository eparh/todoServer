'use strict';

const BaseError = require('./base');
const { conflict } = require('../../constants/').STATUS_CODES;

class ConflictError extends BaseError {
    constructor(message) {
        super(message);
        this.statusCode = conflict;
    }
}

module.exports = ConflictError;
