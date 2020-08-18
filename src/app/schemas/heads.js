const Joi = require('joi');

const objectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId');

const headsProperties = {
  name: Joi.string(),
  farm: objectId,
  operations: Joi.array().items(Joi.object()),
  area: Joi.number(),
  system: Joi.string(),
  updatedAt: Joi.string(),
  active: Joi.boolean(),
  operators: {
    type: Joi.array().items(objectId)
  },
  _id: objectId
};

const get = {
  response: {
    200: {
      type: 'object',
      properties: headsProperties
    }
  }
};

const create = {
  body: {
    type: 'object',
    properties: {
      name: Joi.string(),
      farm: objectId,
      operations: Joi.array().items(Joi.object()),
      area: Joi.number(),
      system: Joi.string(),
      operators: {
        type: Joi.array().items(objectId)
      }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: headsProperties
    }
  }
};

exports.default = {
  get,
  create
};
