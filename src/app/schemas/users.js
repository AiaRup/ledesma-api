const Joi = require('joi');

const userProperties = {
  name: Joi.string(),
  password: Joi.string(),
  employeeCode: Joi.number(),
  email: Joi.string()
};

const get = {
  response: {
    200: {
      type: 'object',
      properties: userProperties
    }
  }
};

const create = {
  body: {
    type: 'object',
    properties: userProperties
  },
  response: {
    200: {
      type: 'object',
      properties: userProperties
    }
  }
};

exports.default = {
  get,
  create
};
