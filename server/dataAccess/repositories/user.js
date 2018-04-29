'use strict';

const dbContext = require('../../dataAccess/context');
const BaseRepository = require('./base');

class UserRepository extends BaseRepository {
    constructor() {
        super(dbContext, 'User');
    }
}

module.exports = new UserRepository();