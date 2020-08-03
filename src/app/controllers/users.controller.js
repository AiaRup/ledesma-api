const jwt = require('jsonwebtoken');

function UsersController({ config, usersService }) {
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
      const { employeeCode, password, name } = request.body;

      const users = (await usersService.search({ employeeCode })) || [];

      if (!employeeCode || !password || !name) {
        return reply
          .status(400)
          .send({ error: 'Invalid password/name/employee code.' });
      }

      if (!employeeCode || users.docs.length)
        return reply
          .status(400)
          .send({ error: 'A user with the employee code already exists.' });

      const entity = {
        ...request.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        active: true
      };

      const user = await usersService.create(entity);

      const token = jwt.sign(
        { userId: user._id, name: user.name },
        config.auth.JWT_SECRET
      );

      reply.send(token);
    },

    update: async (request, reply) => {
      const { employeeCode, password, name } = request.body;

      const users = (await usersService.search({ employeeCode })) || [];

      if (!employeeCode || !password || !name) {
        return reply
          .status(400)
          .send({ error: 'Invalid password/name/employee code.' });
      }

      if (!employeeCode || users.docs.length)
        return reply
          .status(400)
          .send({ error: 'A user with the employee code already exists.' });

      const entity = {
        ...request.body,
        updatedAt: new Date().toISOString()
      };

      const user = await usersService.create(entity);

      const token = jwt.sign(
        { userId: user._id, name: user.name },
        config.auth.JWT_SECRET
      );

      reply.send(token);
    },

    login: async (request, reply) => {
      const { employeeCode, password } = request.body;

      if (!employeeCode || !password) {
        return reply
          .status(400)
          .send({ error: 'Invalid password or employee code.' });
      }

      const { docs: users = [] } = await usersService.search({
        employeeCode,
        password
      });

      if (!users.length) {
        return reply.status(400).send({ error: 'User does not exist.' });
      }

      const token = jwt.sign({ ...users[0] }, config.auth.JWT_SECRET);

      reply.send(token);
    }
  };
}

module.exports = UsersController;
