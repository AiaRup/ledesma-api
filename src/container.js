const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { camelCase } = require('change-case');
const { pipe, toPairs, map, fromPairs } = require('ramda');

const config = require('../config');
const {
  Application,
  services,
  controllers,
  models,
  routers
} = require('./app');
const { db } = require('./core');

const { createServer, router } = require('./interfaces/http');

const container = createContainer();

// DB
container.register({
  db: asFunction(db).singleton()
});

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(createServer(container)).singleton()
  })
  .register({
    router: asFunction(router).singleton()
  })
  .register({
    config: asValue(config)
  });

// Services
container.register(
  pipe(
    toPairs,
    map(([key, value]) => [camelCase(key), asFunction(value).scoped()]),
    fromPairs
  )(services)
);

// Controllers
container.register(
  pipe(
    toPairs,
    map(([key, value]) => [camelCase(key), asFunction(value).scoped()]),
    fromPairs
  )(controllers)
);

// Routers
container.register(
  pipe(
    toPairs,
    map(([key, value]) => [camelCase(key), asFunction(value).scoped()]),
    fromPairs
  )(routers)
);

// Models
container.register(
  pipe(
    toPairs,
    map(([key, value]) => [key, asValue(value)]),
    fromPairs
  )(models)
);

module.exports = container;
