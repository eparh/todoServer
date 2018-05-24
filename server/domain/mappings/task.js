'use strict';

const mapper = require('../../helpers/mapper');
const TaskModel = require('../models/task');

mapper.createMap('TaskDataModel', TaskModel)
    .forAllMembers(mapper.copyOwnProperties)
    .forMember('id', opts => opts.sourceObject._id);

mapper.createMap(TaskModel, 'TaskDataModel')
    .forAllMembers(mapper.copyProperties)
    .forMember('_id', opts => opts.ignore());

mapper.createMap(TaskModel, 'UpdateTaskDataModel')
    .forAllMembers(mapper.copyProperties)
    .forMember('_id', opts => opts.sourceObject.id)
    .forSourceMember('id', opts => opts.ignore());

mapper.createMap(TaskModel, 'TaskViewModel')
    .forAllMembers(mapper.copyProperties);
