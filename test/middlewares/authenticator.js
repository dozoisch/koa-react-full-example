"use strict";
var should = require("should");
var mongoose = require("mongoose");

var User = mongoose.model("User");

const CREDENTIALS = { u: "test@email.com", p: "123123123" };
exports.LOGIN_URL = "/auth";

exports.createUser = function *() {
  var user = new User({ username: CREDENTIALS.u, password: CREDENTIALS.p });
  yield user.save();
};

exports.signAgent = function(agent, done) {
  agent
  .post(exports.LOGIN_URL)
  .set("Content-Type", "application/json")
  .send({ username: CREDENTIALS.u, password: CREDENTIALS.p })
  .redirects(false)
  .expect(200)
  .end(function(err, res) {
    if (err) { return done(err); }
    should.exist(res.body);
    should.exist(res.body.user);
    should.exist(res.body.user.username);
    done();
  });
};
