const dbConnection = require('../config/dbConnection');
const Promise = require('bluebird');
const bcrypt  =  Promise.promisifyAll(require('bcryptjs'));

module.exports.find = (username, password) => {
  return dbConnection.then((db) => {
    return db.collection('users').findOne({ username }, { hash: 0 });
  })
};

module.exports.checkUserExists = (username) => {
  return dbConnection.then((db) => {
    return db.collection('users').find({ username }, { _id: 1 }).limit(1).count();
  })
};

module.exports.checkPassword = (username, password) => {
  return dbConnection.then((db) => {
    return db.collection('users').findOne({ username }).then((res) => {
      if (res != null) {
        return bcrypt.compare(password, res.hash);
      } else {
        return Promise.resolve(false);
      }
    });
  })
};

module.exports.insert = (username, password) => {
  return bcrypt
    .genSaltAsync(10)
    .then(bcrypt.hashAsync.bind(bcrypt, password))
    .then((hash) => {
      return dbConnection.then((db) => {
        return db.collection('users').insert({ username, hash });
      })
    });
};