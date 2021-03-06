function headsController({ headsService }) {
  return {
    get: async (request, reply) => {
      const result = await headsService.get({ id: request.params.id });

      reply.send(result);
    },

    search: async (request, reply) => {
      const result = await headsService.search(request.query);

      reply.send(result);
    },

    create: async (request, reply) => {
      const entity = {
        ...request.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const head = await headsService.create(entity);

      reply.send(head);
    },

    update: async (request, reply) => {
      const entity = {
        ...request.body,
        updatedAt: new Date().toISOString()
      };

      const head = await headsService.update(request.params.id, entity);

      reply.send(head);
    }
  };
}

module.exports = headsController;
