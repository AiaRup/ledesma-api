const { authentication } = require('../../helpers');
// const { ListingSchema } = require('../schemas');

module.exports = function UsersRouter({ listingsController }) {
  function ctrl(method) {
    return function(req, res) {
      return listingsController[method](req, res);
    };
  }

  return async function(fastify) {
    // fastify.addHook('onRequest', authentication);

    fastify.get('/', ctrl('search'));
    fastify.get('/:id', ctrl('get'));
    fastify.post('/', ctrl('create'));
    fastify.put('/:id', ctrl('update'));
    fastify.delete('/:id', ctrl('remove'));
  };
};
