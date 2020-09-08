const { authentication } = require('../../helpers');
const { HeadsSchema } = require('../schemas');

module.exports = function HeadsRouter({ headsController }) {
  function ctrl(method) {
    return function(req, res) {
      return headsController[method](req, res);
    };
  }

  return async function(fastify) {
    // fastify.addHook('onRequest', authentication);

    fastify.get('/', ctrl('search'));
    fastify.get('/:id', { schema: HeadsSchema.get }, ctrl('get'));
    fastify.post('/', { schema: HeadsSchema.get }, ctrl('create'));
    fastify.put('/:id', ctrl('update'));
    fastify.delete('/:id', ctrl('remove'));
  };
};
