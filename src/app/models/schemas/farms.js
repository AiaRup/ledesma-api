const mongoosePaginate = require('mongoose-paginate');
const { Schema } = require('mongoose');

const FarmDefinition = {
  name: {
    type: String,
    required: true
  }
};

const FarmSchema = new Schema(FarmDefinition, {
  versionKey: false,
  minimize: false,
  strict: true
});

FarmSchema.index({
  name: 1
});

FarmSchema.plugin(mongoosePaginate);

module.exports = FarmSchema;
