const mongoose = require('mongoose');
const { ListingSchema } = require('./schemas');

module.exports = mongoose.model('Listings', ListingSchema);
