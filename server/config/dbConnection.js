const logger = require('./logger');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://192.168.192.47/story-storage'

const dbConnection = MongoClient.connect(url).catch((err) => {
  logger.error(err.message);
  process.exit(-1);
});

module.exports = dbConnection;