const Joi = require('joi');

const get = {
  name: Joi.string()
    .required()
    .min(2)
};

const create = {
  name: Joi.string()
    .required()
    .min(2)
};

exports.default = {
  get,
  create
};
