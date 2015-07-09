"use strict";
var should = require("should");
var app = require("../server");
var request = require("supertest").agent(app.listen());
var databaseHelper = require("./middlewares/database");
var authHelper = require("./middlewares/authenticator");

// support for es6 generators
var co = require("co");

var URLS = {
  auth: "/auth",
  signOut: "/signout",
  signUp: "/signup",
};

describe("Auth", function() {
  before(co.wrap(function *() {
    yield authHelper.createUser();
  }));
  describe("Anonymous Call", function() {
    it("should return empty body", function(done) {
      request.get(URLS.auth)
      .accept("json")
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        should.not.exist(res.body.user);
        done();
      });
    });
  });
  describe("Auth calls", function() {
    before(function(done) {
      authHelper.signAgent(request, done);
    });
    it("should return the user infos", function(done) {
      request.get(URLS.auth)
      .accept("json")
      .expect(200)
      .end(function(err, res) {
        if (err) { return done(err); }
        should.exist(res.body);
        should.exist(res.body.user);
        should.exist(res.body.user.username);
        done();
      });
    });

    it("should sign out");
    it("should sign up");
  });

  after(function(done) { databaseHelper.dropDatabase(done); });
});
