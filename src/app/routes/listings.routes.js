const { authentication } = require('../../helpers');
// const { ListingSchema } = require('../schemas');

module.exports = function UsersRouter({ usersController }) {
  function ctrl(method) {
    return function(req, res) {
      return usersController[method](req, res);
    };
  }

  return async function(fastify) {
    fastify.addHook('onRequest', authentication);

    fastify.get('/', ctrl('search'));
    fastify.get('/:id', ctrl('get'));
    fastify.post('/', ctrl('create'));
    fastify.put('/:id', ctrl('update'));
    fastify.delete('/:id', ctrl('remove'));
  };
};
