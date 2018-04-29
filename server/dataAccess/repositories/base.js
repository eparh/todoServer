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
        const self = this;
        const models = await this.Model.find(query, attributes);

        return self.toJSON(models);
    }

    async findOne(query, attributes) {
        const self = this;
        const model = await this.Model.findOne(query, attributes);

        return self.toJSON(model);
    }

    async findById(id) {
        const self = this;
        const model = await this.Model.findById(id);

        return self.toJSON(model);
    }

    async create(info) {
        const self = this;
        const newModel = await self.Model.create(info);

        return self.toJSON(newModel);
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