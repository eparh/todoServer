'use strict';

class BaseRepository {
    constructor(dbContext, modelName) {
        this.dbContext = dbContext;
        this.Model = dbContext.models[modelName];
    }

    findAll() {
        return this.find({});
    }

    async find(query, attributes) {
        const models = await this.Model.find(query, attributes);

        return this.toJSON(models);
    }

    async findOne(query, attributes) {
        const model = await this.Model.findOne(query, attributes);

        return this.toJSON(model);
    }

    async findById(id) {
        const model = await this.Model.findById(id);

        return this.toJSON(model);
    }

    async create(info) {
        const newModel = await this.Model.create(info);

        return this.toJSON(newModel);
    }

    update(query, info, opts) {
        return this.Model.update(query, info, opts);
    }

    updateById(id, info) {
        return this.Model.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: info
            },
            {
                new: true
            });
    }

    removeById(id) {
        return this.Model.remove({
            _id: id
        });
    }

    toJSON(info) {
        function _toJson(info) {
            return info.toJSON();
        }

        if (Array.isArray(info)) {
            return info.map(_toJson);
        } else if (info) {
            return _toJson(info);
        } else {
            return null;
        }
    }
}

module.exports = BaseRepository;