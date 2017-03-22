const logger = require('./logger');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Promise = require('bluebird');

const dbConnection = require('./dbConnection');
const userService = require('../controllers/user.service');

const validateEmail = Promise.promisify(require("email-validator").validate_async);

const passportLocal = require("passport-local");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const LocalStategy = passportLocal.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions,
  function(body, done) {
    console.log(body);
    done(null, req.body);
  }
));

passport.use('local-signup', new LocalStategy({}, function(username, password, done) {
  validateEmail(username)
    .then((isValid) => {
      if (!isValid) {
        return Promise.reject([null, false, 400]);
      } else {
        return username;
      }
    })
    .then(userService.checkUserExists)
    .then((userExists) => {
      if (userExists) {
        return Promise.reject([null, false, 409]);
      } else {
        return userService.insert(username, password);
      }
    })
    .then((user) => {
      done(null, { status: true, token: jwt.sign({ username: user.username }, jwtOptions.secretOrKey) });
    })
    .catch((rejection) => {
      logger.warn(rejection);
      done(...[].concat(rejection));
    });
}));

passport.use('local-login', new LocalStategy({}, function(username, password, done) {

  console.log(username, password);

  userService.checkPassword(username, password).then((found) => {
    if (found) {
      done(null, { status: true, token: jwt.sign({ username }, jwtOptions.secretOrKey) });
    } else {
      done(null);
    }
  });

}));

module.exports = passport;