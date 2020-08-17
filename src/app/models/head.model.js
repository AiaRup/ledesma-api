const mongoose = require('mongoose');
const { HeadSchema } = require('./schemas');

module.exports = mongoose.model('Heads', HeadSchema);
