const container = require('./src/container');

const app = container.resolve('app');

module.exports = async function() {
  app.start().catch(error => {
    console.error(error.stack);
    process.exit();
  });
  // app.server.emit('request', req, res);
};
