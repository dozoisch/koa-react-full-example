"use strict";
var LocalStrategy = require("passport-local").Strategy;
var authenticator = require("../lib/authenticator");
var User = require("mongoose").model("User");

var serialize = function(user, done) {
  done(null, user._id);
};

var deserialize = function(id, done) {
  User.findById(id, done);
};

module.exports = function(passport, config) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(authenticator.localUser));
};
