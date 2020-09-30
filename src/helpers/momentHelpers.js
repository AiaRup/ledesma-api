const moment = require('moment');

const Module = {};

Module.getFormattedDate = function getFormattedDate(date) {
  return moment(date).format('YYYY-MM-DD');
};

module.exports = Module;
