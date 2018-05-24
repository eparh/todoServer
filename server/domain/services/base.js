'use strict';

const mapper = require('../../helpers/mapper');
const ConflictError = require('../errrors/conflict');
const NoPermissionError = require('../errrors/noPermission');

class BaseService {
    constructor(Model, repository, mappingDataPath, checkPermission) {
        this.Model = Model;
        this.repository = repository;
        this.mapper = mapper;
        this.mappingDataPath = mappingDataPath;
        this.checkPermission = checkPermission;
    }

    async findById(id) {
        const { Model, mappingDataPath, repository } = this;
        const item = await repository.findById(id);

        return item && !item.isDeleted && mapper.map(mappingDataPath, Model, item);
    }

    async findOneByQuery(query) {
        const { Model, mappingDataPath, repository } = this;
        const item = await repository.findOne(query);

        return item && !item.isDeleted && mapper.map(mappingDataPath, Model, item);
    }

    async findByQuery(query) {
        const { Model, mappingDataPath, repository } = this;
        const item = await repository.find(query);

        return mapper
            .mapArray(mappingDataPath, Model, item.filter(item => !item.isDeleted));
    }

    async findAll() {
        const { Model, mappingDataPath, repository } = this;
        const items = await repository.findAll();

        return mapper
            .mapArray(mappingDataPath, Model, items.filter(item => !item.isDeleted));
    }

    async create(item, beforeCreate) {
        const { Model, repository, mappingDataPath } = this;

        let newItem = beforeCreate ? beforeCreate(item) : item;

        newItem = newItem.then ? await newItem : newItem;

        const dataModel = mapper.map(Model, mappingDataPath, newItem);
        const createdDataModel = await repository.create(dataModel);
        const createdModel = mapper.map(mappingDataPath, Model, createdDataModel);

        const actualDataModel = await repository.findById(createdModel.id);

        return mapper.map(mappingDataPath, Model, actualDataModel);
    }

    async update(id, item, user) {
        await this.validate(id, user);

        return this.updateUnsafe(id, item);
    }

    async updateUnsafe(id, item) {
        const { Model, repository, mappingDataPath } = this;

        const dataModel = mapper.map(Model, mappingDataPath, item);

        await repository.updateById(id, dataModel);
        const updatedModel = await repository.findById(id);

        return mapper.map(mappingDataPath, Model, updatedModel);
    }

    async updateByQuery(query, item, opts) {
        const { Model, mappingDataPath, repository } = this;

        return repository.update(query, item, opts);
    }

    async removeById(id, user) {
        await this.validate(id, user);

        await this.removeByIdUnsafe(id);
    }

    async removeByIdUnsafe(id) {
        const { repository } = this;

        await repository.removeById(id);
    }

    async validate(id, user) {
        const { Model, checkPermission, _hasPermission, repository, mappingDataPath } = this;
        const itemName = Model.name;

        const currentDataModel = await repository.findById(id);

        if (!currentDataModel || currentDataModel.isDeleted) {
            throw new ConflictError(`${itemName} with id ${id} does not exist`);
        }

        const currentModel = mapper.map(mappingDataPath, Model, currentDataModel);

        if (checkPermission && !_hasPermission(user, currentModel.author)) {
            throw new NoPermissionError(`You don't have permission to update ${itemName.toLowerCase()} with id ${id}`);
        }
    }

    _hasPermission(user, author) {
        return user.role === 'admin' || user.id === author.toString();
    }
}

module.exports = BaseService;