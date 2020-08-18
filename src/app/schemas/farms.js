const Joi = require('joi');

const get = {
  response: {
    200: {
      type: 'object',
      properties: {
        name: Joi.string()
      }
    }
  }
};

const create = {
  body: {
    type: 'object',
    properties: {
      name: Joi.string().required()
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        name: Joi.string()
      }
    }
  }
};

exports.default = {
  get,
  create
};
