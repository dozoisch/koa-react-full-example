/**
 * Dependencies
 */
var should = require('should');
var mongoose = require('mongoose');

var User = mongoose.model('User');

/**
 * Constants
 */
const CREDENTIALS = { u: 'test@email.com', p:'123123123' };

exports.LOGIN_URL = '/login';

/**
 * Utils
 */
exports.createUser = function *() {
  var user = new User({ username: CREDENTIALS.u, password: CREDENTIALS.p });
  yield user.save();
};

exports.signAgent = function (agent, done) {
  agent
  .post(exports.LOGIN_URL)
  .set('Content-Type', 'application/json')
  .send({ username: CREDENTIALS.u, password: CREDENTIALS.p })
  .redirects(false)
  .expect(302)
  .end(function (err, res) {
    if(err) done(err);
    try {
      res.headers.location.should.equal('/');
      done();
    } catch (err) {
      done(err);
    }
  });
};
