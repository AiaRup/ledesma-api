const fastifyPlugin = require('fastify-plugin');

function createScopePerRequest(container) {
  return fastifyPlugin(function scopePerRequest(fastify, _, next) {
    fastify.decorateRequest('container', container);
    next();
  });
}

module.exports = createScopePerRequest;
