const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);
mongoose.Promise = global.Promise;

function Db({ config }) {
  return {
    start: async () => {
      try {
        await mongoose.connect(config.db.MONGODB_URL, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: true,
          useUnifiedTopology: true
        });

        console.info('Database connected succesfully');
      } catch (error) {
        throw new Error('Database failed to connect');
      }
    },
    stop: () => {
      mongoose.connection.close();
    }
  };
}

module.exports = Db;
