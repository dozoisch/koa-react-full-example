var router = require('koa-router');

var countController = require('../src/controllers/count');
var indexController = require('../src/controllers/index');
var authController = require('../src/controllers/auth');

var secured = function *(next) {
  if (this.isAuthenticated()) {
    yield next;
  } else {
    this.status = 401;
  }
};

module.exports = function (app, passport) {
  // register functions
  app.use(router(app));

  app.get('/login', authController.login);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?error=local'
  }));

  app.all("/logout", authController.logout);

  // Just to be able to create user to test our app
  app.get('/user/:username/:password', authController.createUser);

  app.get('/', function *() {
    if (this.isAuthenticated()) {
      yield indexController.index.apply(this);
    } else {
      this.redirect('/login');
    }
  });

  // secured routes
  app.get('/value', secured, countController.getCount);
  app.get('/inc', secured, countController.increment);
  app.get('/dec', secured, countController.decrement);
};
