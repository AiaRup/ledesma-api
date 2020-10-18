const { authentication } = require('../../helpers');
const { FarmsSchema } = require('../schemas');

module.exports = function FarmsRouter({ farmsController }) {
  function ctrl(method) {
    return function(req, res) {
      return farmsController[method](req, res);
    };
  }

  return async function(fastify) {
    fastify.addHook('onRequest', authentication);

    fastify.get('/', ctrl('search'));
    fastify.get('/:id', { schema: FarmsSchema.get }, ctrl('get'));
    fastify.post('/', { schema: FarmsSchema.get }, ctrl('create'));
    fastify.put('/:id', ctrl('update'));
    fastify.delete('/:id', ctrl('remove'));
  };
};
