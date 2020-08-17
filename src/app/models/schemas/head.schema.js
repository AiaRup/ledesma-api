const mongoosePaginate = require('mongoose-paginate');
const { Schema } = require('mongoose');

const HeadDefinition = {
  farm: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Farms'
  },
  name: {
    type: String,
    required: true
  },
  operations: {
    type: [Object],
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  system: {
    type: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    required: true
  },
  operators: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Users'
  }
};

const HeadSchema = new Schema(HeadDefinition, {
  versionKey: false,
  minimize: false,
  strict: true
});

HeadSchema.index({
  name: 1,
  farm: 1
});

HeadSchema.plugin(mongoosePaginate);

module.exports = HeadSchema;
