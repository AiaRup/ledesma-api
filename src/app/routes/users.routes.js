const { verifyUserRole } = require('../../helpers');
const { BadRequest } = require('../errors');
const { UsersSchema } = require('../schemas');

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
    fastify.get('/', ctrl('search'));
    fastify.get('/:id', { schema: UsersSchema.get }, ctrl('get'));
    fastify.post(
      '/',
      { schema: UsersSchema.get, preValidation: verifyAdminRole },
      ctrl('create')
    );
    fastify.post('/login', ctrl('login'));
    fastify.post('/signup', ctrl('signup'));
    fastify.put('/:id', ctrl('update'));
    fastify.delete('/:id', ctrl('remove'));
  };
};
