'use strict';

const bCryptService = require('../../businessLogic/services/external/bcrypt');
const BaseService = require('./base');
const userRepository = require('../../dataAccess/repositories/user');
const UserModel = require('../models/user');

const ConflictError = require('../errrors/conflict');

class UserService extends BaseService {
    constructor() {
        super(UserModel, userRepository, 'UserDataModel');
    }

    async register(user) {
        const { email } = user;
        const existedUser = await this.findByEmail(email);

        if (existedUser) {
            throw new ConflictError(`User with email ${email} already exists`);
        }

        return this.create(user, this._processUserData);
    }

    async findByEmail(email) {
        return this.findOneByQuery({
            email
        });
    }

    validatePassword(password, passwordInDB) {
        return bCryptService.validatePassword(password, passwordInDB);
    }

    async isCredentialsValid(email, password) {
        const user = await this.findByEmail(email);

        return user && this.validatePassword(password, user.password);
    }

    async _processUserData(user) {
        return {
            ...user,
            encryptedPassword: await bCryptService.generateHash(user.password)
        };
    }
}

module.exports = new UserService();