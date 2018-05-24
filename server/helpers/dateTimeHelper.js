'use strict';

const { nanosecondToSecondRatio, secondToHourRatio } = require('../constants').DATE_TIME;

class DateTimeHelper {
    getHourLength() {
        return secondToHourRatio;
    }

    getExpirationDate() {
        return Math.floor(Date.now() / nanosecondToSecondRatio) + this.getHourLength(); // 1 hour
    }
}

module.exports = new DateTimeHelper();