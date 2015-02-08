/**
 * Dependencies
 */
var should = require('should');
var app = require('../server');
var request = require('supertest').agent(app.listen());
var databaseHelper = require('./middlewares/database');
var authHelper = require('./middlewares/authenticator');

// support for es6 generators
var co = require('co');

describe('Index', function () {
  it('should render the page', function (done) {
    request.get('/')
    .expect(200)
    .end(done);
  });
});
