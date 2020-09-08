const mongoosePaginate = require('mongoose-paginate');
const { Schema } = require('mongoose');

const ListingDefinition = {
  head: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Heads'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  operation: {
    type: Number
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  flowmeter: {
    type: Number,
    required: true
  },
  pressureField: {
    type: Number
  },
  pressurePump: {
    type: Number
  },
  location: {
    type: Schema.Types.Mixed
  }
};

const ListingSchema = new Schema(ListingDefinition, {
  versionKey: false,
  minimize: false,
  strict: true
});

ListingSchema.index({
  name: 1,
  farm: 1
});

ListingSchema.plugin(mongoosePaginate);

module.exports = ListingSchema;
