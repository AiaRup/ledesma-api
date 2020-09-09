const dotenv = require('dotenv');

const artifactDetails = require('../ArtifactDetails.json');

dotenv.config();

module.exports = {
  web: {
    artifact: artifactDetails,
    name: artifactDetails.name,
    version: artifactDetails.version,
    port: process.env.PORT || 9000
  },
  db: {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://mongodb'
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET || 'superSecretTokenOfLedesma',
    expiresIn: '30000s'
  },
  search: {
    pageOptions: {
      page: 1,
      limit: 100,
      sort: { createdAt: -1 },
      sortDirection: -1
    }
  }
};
