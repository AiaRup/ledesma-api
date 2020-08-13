const swagger = require('fastify-swagger');

const { web } = require('../../../config');

module.exports = ({ usersRouter, listingsRouter, farmsRouter }) =>
  async function(fastify, _, next) {
    fastify
      .register(swagger, {
        swagger: {
          info: {
            title: 'Ledesma Api',
            description: 'Api routes',
            version: '0.1.0'
          }
        },
        mode: 'dynamic',
        exposeRoute: true,
        routePrefix: '/doc'
      })
      // APIs modules
      .register(usersRouter, {
        prefix: '/users'
      })
      .register(listingsRouter, {
        prefix: '/listings'
      })
      .register(farmsRouter, {
        prefix: '/farms'
      })
      .get('/version', { schema: { tags: ['Version'] } }, (req, reply) => {
        reply.send(web.artifact);
      });

    next();
  };
