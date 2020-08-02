const mongoosePaginate = require('mongoose-paginate');
const { Schema } = require('mongoose');

const UserDefinition = {
  farms: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Farms'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  employeeCode: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Number
  },
  password: {
    type: String
  },
  adminPassword: {
    type: String,
    required: true
  }
};

const UserSchema = new Schema(UserDefinition, {
  versionKey: false,
  minimize: false,
  strict: true
});

UserSchema.index({
  name: 1,
  email: 1
});

UserSchema.plugin(mongoosePaginate);

module.exports = UserSchema;
