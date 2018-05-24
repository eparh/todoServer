'use strict';

const bCryptService = require('..//services/external/bcrypt');
const BaseService = require('./base');
const userRepository = require('../../dataAccess/repositories/user');
const UserModel = require('../models/user');

const ConflictError = require('../errrors/conflict');

class UserService extends BaseService {
    constructor() {
        super(UserModel, userRepository, 'UserDataModel');
    }

    async register(user) {
        const { login } = user;
        const existedUser = await this.findByLogin(login);

        if (existedUser) {
            throw new ConflictError(`User with login ${login} already exists`);
        }

        return this.create(user, this._processUserData);
    }

    async findByLogin(login) {
        return this.findOneByQuery({
            login
        });
    }

    validatePassword(password, passwordInDB) {
        return bCryptService.validatePassword(password, passwordInDB);
    }

    async isCredentialsValid(login, password) {
        const user = await this.findByLogin(login);

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