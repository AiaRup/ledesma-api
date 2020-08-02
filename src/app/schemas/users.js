const Joi = require('joi');

const get = {
  name: Joi.string()
    .required()
    .min(2),
  password: Joi.string()
    .required()
    .min(5),
  employeeCode: Joi.string()
    .required()
    .min(5)
};

const create = {
  name: Joi.string()
    .required()
    .min(2),
  email: Joi.string().email(),
  farms: Joi.array().required(),
  employeeCode: Joi.string()
    .required()
    .min(5)
};

exports.default = {
  get,
  create
};
