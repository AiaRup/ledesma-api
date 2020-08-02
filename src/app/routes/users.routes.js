const Joi = require('joi');

const { authentication, verifyUserRole } = require('../../helpers');
const { BadRequest } = require('../errors');
const { UserSchema } = require('../schemas');

module.exports = function UsersRouter({ usersController }) {
  function ctrl(method) {
    return function(req, res) {
      return usersController[method](req, res);
    };
  }

  function verifyAdminRole(request, reply, done) {
    if (!verifyUserRole(request, 'Admin')) {
      throw new BadRequest('Only user with Admin role can perform this action');
    }
    done();
  }

  return async function(fastify) {
    fastify.addHook('onRequest', authentication);

    fastify.get('/', ctrl('search'));
    fastify.get(
      '/:id',
      { schema: UserSchema.get },
      { schemaCompiler: schema => data => Joi.validate(data, schema) },
      ctrl('get')
    );
    fastify.post(
      '/',
      { schema: UserSchema.get, preValidation: verifyAdminRole },
      { schemaCompiler: schema => data => Joi.validate(data, schema) },
      ctrl('create')
    );
    fastify.put('/:id', { preValidation: verifyAdminRole }, ctrl('update'));
    fastify.delete('/:id', ctrl('remove'));
  };
};
