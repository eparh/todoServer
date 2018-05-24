'use strict';

const BaseSchema = require('./base');

class TaskSchema extends BaseSchema {
    get() {
        const {
            Schema, ofType, required, objectRef, includeVirtuals, withTimeStamps, withDefault
        } = this;

        return new Schema({
            author: required(objectRef('User')),
            description: required(ofType(String)),
            isCompleted: withDefault(ofType(Boolean), false),
            isDeleted: withDefault(ofType(Boolean), false)
        },
        withTimeStamps(includeVirtuals())
        );
    }
}

module.exports = TaskSchema;