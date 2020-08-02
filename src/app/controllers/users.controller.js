function UsersController({ usersService }) {
  return {
    get: async (request, reply) => {
      const result = await usersService.get({ id: request.params.id });

      reply.send(result);
    },

    search: async (request, reply) => {
      const result = await usersService.search(request.query);

      reply.send(result);
    },

    create: async (request, reply) => {
      const entity = {
        ...request.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        active: true
      };

      const user = await usersService.create(entity);

      reply.send(user);
    },

    update: async (request, reply) => {
      const entity = {
        ...request.body,
        updatedAt: new Date().toISOString()
      };

      const user = await usersService.update(entity);

      reply.send(user);
    }
  };
}

module.exports = UsersController;
