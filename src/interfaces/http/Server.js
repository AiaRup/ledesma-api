const fastify = require('fastify');
const cors = require('fastify-cors');
const compress = require('fastify-compress');
const multipart = require('fastify-multipart');
const Joi = require('joi');

require('make-promises-safe');

const plugins = require('./middleware');

class Server {
  constructor({ config, router, db, container }) {
    this.config = config;
    this.db = db;
    this.container = container;
    this.fastify = fastify({
      logger: {
        prettyPrint: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: true
        }
      }
    });

    this.fastify.register(cors, {
      origin: '*',
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Accept',
        'Content-Type',
        'Authorization'
      ],
      methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE', 'PATCH']
    });
    this.fastify.addContentTypeParser('*', function(_, done) {
      done();
    });
    this.fastify.register(compress);
    this.fastify.register(multipart);
    this.fastify.setErrorHandler(function(error, request, reply) {
      request.log.error(error);

      if (error.validation) {
        return reply.code(400).send({ error: error.message });
      }

      if (error.statusCode) {
        return reply
          .code(error.statusCode)
          .send({ error: error.message || error });
      }

      reply.code(500).send({ error: 'Internal server error' });
    });
    this.fastify.register(router);
    // Decorate fastify instance with empty user
    this.fastify.decorateRequest('user', { payload: {} });

    this.fastify.schemaCompiler = schema => data => Joi.validate(data, schema);

    // Register plugins
    Object.values(plugins).forEach(plugin => {
      this.fastify.register(plugin(container));
    });
  }

  async start() {
    try {
      await this.fastify.listen(this.config.web.port, '0.0.0.0');
      await this.db.start();
    } catch (err) {
      throw new Error(err);
    }
  }
}

function createServer(container) {
  return function create({ config, router, db }) {
    return new Server({ config, router, db, container });
  };
}

module.exports = createServer;
