var should = require('should');
var app = require('../server');
var request = require('supertest').agent(app.listen());


describe('Errors', function () {
  it('should return 404', function (done) {
    request.get('/urlThatDoesNotExist')
    .expect(404)
    .end(done);
  });
});
