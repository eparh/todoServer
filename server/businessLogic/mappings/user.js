'use strict';

const mapper = require('../../helpers/mapper');
const UserModel = require('../models/user');

mapper.createMap('UserDataModel', UserModel)
    .forAllMembers(mapper.copyOwnProperties)
    .forMember('id', opts => opts.sourceObject._id);

mapper.createMap(UserModel, 'UserDataModel')
    .forAllMembers(mapper.copyProperties)
    .forMember('password', opts => opts.sourceObject.encryptedPassword)
    .forSourceMember('encryptedPassword', opts => opts.ignore())
    .forMember('_id', opts => opts.ignore());

mapper.createMap(UserModel, 'UserViewModel')
    .forAllMembers(mapper.copyProperties)
    .forMember('password', opts => opts.ignore())
    .forMember('encryptedPassword', opts => opts.ignore());
