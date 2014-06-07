/**
 * Dependencies
 */
var mongoose = require('mongoose');
var should = require('should');
var app = require('../server');
var request = require('supertest').agent(app.listen());
var databaseHelper = require('./middlewares/database');

// support for es6 generators
var co = require('co');


describe('Count', function () {
  // Model
  var CountModel = mongoose.model('Count');
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
