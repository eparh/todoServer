'use strict';

const mapper = require('automapper-ts');
const cloneDeep = require('lodash/cloneDeep');

class AutoMapper {
    constructor() {
        this._mappings = [];
        this.mapper = cloneDeep(mapper);
    }

    createMap(sourceType, destinationType) {
        const existingMapping = this._mappings.find(mapping => mapping.sourceType === sourceType && mapping.destinationType === destinationType);

        if (existingMapping) {
            const sourceName = sourceType.name || sourceType;
            const destinationName = destinationType.name || destinationType;

            throw new Error(`Mapping from ${sourceName} to ${destinationName} already exists`);
        }

        this._mappings.push({
            sourceType,
            destinationType
        });

        return this.mapper.createMap(sourceType, destinationType);
    }

    map(sourceType, destinationType, source) {
        if (source) {
            return this.mapper.map(sourceType, destinationType, source);
        }

        return null;
    }

    mapArray(sourceType, destinationType, list) {
        if (Array.isArray(list)) {
            return list.map(source => this.mapper.map(sourceType, destinationType, source));
        }

        return null;
    }

    copyOwnProperties(model, prop, value) {
        if (model.hasOwnProperty(prop)) {
            model[prop] = value;
        }
    }

    copyDefinedProperties(model, prop, value) {
        if (value !== undefined) {
            model[prop] = value;
        }
    }

    copyProperties(model, prop, value) {
        model[prop] = value !== undefined ? value : null;
    }

    copyUsingDictionary(dictionary) {
        return (model, prop, value) => {
            const modelProp = dictionary[prop];

            if (modelProp) {
                model[modelProp] = value;
            }
        };
    }
}

module.exports = new AutoMapper();
