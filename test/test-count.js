/**
 * Dependencies
 */
var co = require('co');
var mongoose = require('mongoose');
var should = require('should');
var app = require('../server');
var request = require('supertest').agent(app.listen());
var databaseHelper = require('./middlewares/database');

// Model
var CountModel = mongoose.model('Count');

describe('Count', function () {
  var gCount = 1;

  before(co(function *() {
    var c = new CountModel({value: gCount});
    yield c.save();
  }));

  it('should fetch value', function (done) {
    request.get('/value')
    .expect(200)
    .end(function (err, res) {
      should.exist(res.body);
      res.body.count.should.equal(gCount);
      done();
    });
  });

  it('should increment value', function (done) {
    request.get('/inc')
    .expect(200)
    .end(function (err, res) {
      should.exist(res.body);
      res.body.count.should.equal(++gCount);
      done();
    });
  });

  it('should decrement value', function (done) {
    request.get('/dec')
    .expect(200)
    .end(function (err, res) {
      should.exist(res.body);
      res.body.count.should.equal(--gCount);
      done();
    });
  });

  after(co(databaseHelper.dropDatabase));
})
