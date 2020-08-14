const mongoose = require('mongoose');
const { FarmSchema } = require('./schemas');

module.exports = mongoose.model('Farms', FarmSchema);
