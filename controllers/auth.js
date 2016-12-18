const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const User = require('../models/user');
const Client = require('../models/client');
const Token = require('../models/token');

passport.use(new BasicStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    if (user.password !== password) {
      return done(null, false);
    }
    return done(null, user)
  })
}))

passport.use('client-basic', new BasicStrategy((username, password, done) => {
  Client.findOne({ id: username }, (err, client) => {
    if (err) {
      return done(err);
    }
    if (!client || client.secret !== password) {
      return done(null, false);
    }
    return done(null, client);
  })
}))

passport.use(new BearerStrategy((accessToken, done) => {
  Token.findOne({ value: accessToken }, (err, token) => {
    if (err) {
      return done(err);
    }
    if (!token) {
      return done(null, false);
    }
    User.findOne({ _id: token.userId }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      done(null, user, { scope: '*' });
    })
  })
}))

module.exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
module.exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
module.exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });