var router = require("koa-router");

var countController = require("../src/controllers/count");
var indexController = require("../src/controllers/index");
var authController = require("../src/controllers/auth");

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

  app.get("/", function *() {
    yield indexController.index.apply(this);
  });

  app.get("/auth", authController.getCurrentUser);
  app.post("/auth", authController.signIn);

  app.all("/signout", authController.signOut);
  app.post("/signup", authController.createUser);

  // secured routes
  app.get("/value", secured, countController.getCount);
  app.get("/inc", secured, countController.increment);
  app.get("/dec", secured, countController.decrement);
};
