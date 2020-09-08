function ListingsController({ listingsService }) {
  return {
    get: async (request, reply) => {
      const result = await listingsService.get({ id: request.params.id });

      reply.send(result);
    },

    search: async (request, reply) => {
      const result = await listingsService.search(request.query);

      reply.send(result);
    },

    create: async (request, reply) => {
      const entity = {
        ...request.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const listing = await listingsService.create(entity);

      reply.send(listing);
    },

    update: async (request, reply) => {
      const entity = {
        ...request.body,
        updatedAt: new Date().toISOString()
      };

      const listing = await listingsService.update(request.params.id, entity);

      reply.send(listing);
    }
  };
}

module.exports = ListingsController;
