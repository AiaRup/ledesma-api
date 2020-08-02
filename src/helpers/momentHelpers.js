const moment = require('moment');

const Module = {};

Module.getNDaysAgoDate = function getNDaysAgoDate(days) {
  return moment()
    .startOf('day')
    .subtract(days, 'days')
    .format();
};

Module.getFormattedDate = function getFormattedDate(date) {
  return moment(date).format('YYYY-MM-DD');
};

module.exports = Module;
