'use strict';

const { idLength, messages: idLengthMessage } = require('../../../constants/validationOptions');

module.exports = (ctx) => {
    ctx.checkParams('id').notEmpty().len(idLength, idLength, idLengthMessage);
};