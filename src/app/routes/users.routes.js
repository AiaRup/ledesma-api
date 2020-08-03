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
    fastify.get('/:id', { schema: UserSchema.get }, ctrl('get'));
    fastify.post(
      '/',
      { schema: UserSchema.get, preValidation: verifyAdminRole },
      ctrl('create')
    );
    fastify.post('/login', ctrl('login'));
    fastify.put('/:id', ctrl('update'));
    fastify.delete('/:id', ctrl('remove'));
  };
};
