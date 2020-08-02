const { authentication, verifyUserRole } = require('../../helpers');
const { BadRequest } = require('../errors');

module.exports = function UsersRouter({ usersController }) {
  function ctrl(method) {
    return function(req, res) {
      return usersController[method](req, res);
    };
  }

  function verifyHFRDrole(request, reply, done) {
    if (!verifyUserRole(request, 'Admin')) {
      throw new BadRequest('Only user with Admin role can perform this action');
    }
    done();
  }

  return async function(fastify) {
    fastify.addHook('onRequest', authentication);

    fastify.get('/', ctrl('search'));
    fastify.get('/:id', ctrl('get'));
    fastify.post('/', { preValidation: verifyHFRDrole }, ctrl('create'));
    fastify.put('/:id', { preValidation: verifyHFRDrole }, ctrl('update'));
    fastify.delete('/:id', ctrl('remove'));
  };
};
