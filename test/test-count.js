"use strict";
var mongoose = require("mongoose");
var should = require("should");
var app = require("../server");
var request = require("supertest").agent(app.listen());
var databaseHelper = require("./middlewares/database");
var authHelper = require("./middlewares/authenticator");

// support for es6 generators
var co = require("co");

describe("Count", function () {
  // Model
  var CountModel = mongoose.model("Count");
  var gCount = 1;

  before(co.wrap(function *() {
    var c = new CountModel({value: gCount});
    yield [
      c.save(),
      authHelper.createUser()
    ];
  }));

  describe("Anonymous calls", function () {
    it("should return 401 /value", function (done) {
      request.get("/value")
      .expect(401)
      .end(done);
    });

    it("should return 401 /inc", function (done) {
      request.get("/inc")
      .expect(401)
      .end(done);
    });

    it("should return 401 /dec", function (done) {
      request.get("/dec")
      .expect(401)
      .end(done);
    });
  });

  describe("Auth calls", function () {
    before(function (done) {
      authHelper.signAgent(request, done);
    });

    it("should fetch value", function (done) {
      request.get("/value")
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err); }
        should.exist(res.body);
        res.body.count.should.equal(gCount);
        done();
      });
    });

    it("should increment value", function (done) {
      request.get("/inc")
      .expect(200)
      .end(function (err, res) {
        if (err) { return done(err); }

        should.exist(res.body);
        res.body.count.should.equal(++gCount);
        done();
      });
    });

    it("should decrement value", function (done) {
      request.get("/dec")
      .expect(200)
      .end(function (err, res) {
         if (err) { return done(err); }

        should.exist(res.body);
        res.body.count.should.equal(--gCount);
        done();
      });
    });
  });

  after(function (done) { databaseHelper.dropDatabase(done); });
});
