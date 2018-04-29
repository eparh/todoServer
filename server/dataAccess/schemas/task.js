'use strict';

const BaseSchema = require('./base');

class TaskSchema extends BaseSchema {
    get() {
        const {
            Schema, ofType, required, objectRef, includeVirtuals, withTimeStamps
        } = this;

        return new Schema({
            author: required(objectRef('User')),
            title: required(ofType(String)),
            description: required(ofType(String))
        },
        withTimeStamps(includeVirtuals())
        );
    }
}

module.exports = TaskSchema;