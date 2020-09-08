function farmsController({ farmsService }) {
  return {
    get: async (request, reply) => {
      const result = await farmsService.get({ id: request.params.id });

      reply.send(result);
    },

    search: async (request, reply) => {
      const result = await farmsService.search(request.query);

      reply.send(result);
    },

    create: async (request, reply) => {
      const entity = {
        ...request.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const farm = await farmsService.create(entity);

      reply.send(farm);
    },

    update: async (request, reply) => {
      const entity = {
        ...request.body,
        updatedAt: new Date().toISOString()
      };

      const farm = await farmsService.update(request.params.id, entity);

      reply.send(farm);
    },

    remove: async (request, reply) => {
      const result = await farmsService.remove(request.params.id);

      reply.type('text/json').send(result);
    }
  };
}

module.exports = farmsController;
