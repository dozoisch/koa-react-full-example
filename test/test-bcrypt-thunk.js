"use strict";
var bcrypt = require("../lib/bcrypt-thunk");
var should = require("should");

// support for es6 generators
var co = require("co");

const PASSWORD = "bleh";
const SALT = "$2a$10$zyParsk87TjIfgPFsOC2HO";
const HASH = "$2a$10$zyParsk87TjIfgPFsOC2HOnXu3azSlVkpf9L48qJcFcCofF4eDqeW";
const ROUNDS = 10;

describe("Bcrypt Thunk'ed", function () {
  describe("Salt", function () {
    it("should generate salt", co.wrap(function *() {
      var salt = yield bcrypt.genSalt(ROUNDS);
      should.exist(salt);
      salt.length.should.be.above(0);
      salt.should.match(new RegExp("\\$.{2}\\$" + ROUNDS + "\\$.{22}"));
    }));
    it("should throw on bad round", co.wrap(function *() {
      try {
        yield bcrypt.genSalt("b");
        should.fail("should have thrown an error");
      } catch (err) {
        should.exist(err);
      }
    }));
  });

  describe("Hash", function () {
    it("should hash password", co.wrap(function *() {
      var hash = yield bcrypt.hash(PASSWORD, SALT);
      should.exist(hash);
      hash.length.should.be.above(0);
      hash.should.equal(HASH);
    }));
    it("should throw on bad salt", co.wrap(function *() {
      try {
        yield bcrypt.hash(PASSWORD, "BAD_SALT");
        should.fail("should have thrown an error");
      } catch (err) {
        should.exist(err);
      }
    }));
  });

  describe("Match", function () {
    it("should match passwords", co.wrap(function *() {
      var match = yield bcrypt.compare(PASSWORD, HASH);
      match.should.be.true;
    }));
    it("should not match passwords", co.wrap(function *() {
      var match = yield bcrypt.compare(PASSWORD + "ERROR", HASH);
      match.should.be.false;
    }));
  });
});
