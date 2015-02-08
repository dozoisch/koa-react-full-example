var passport = require("koa-passport");

exports.signIn = function *() {
  var ctx = this;
  yield* passport.authenticate("local", function*(err, user, info) {
    if (err) {
      throw err;
    }
    if (user === false) {
      ctx.status = 401;
    } else {
      yield ctx.login(user);
      ctx.body = { user: user };
    }
  }).call(this);
};

exports.getCurrentUser = function *() {
  if (this.passport.user) {
    this.body = { user: this.passport.user };
  }
  this.status = 200;
};

exports.signOut = function *() {
  this.logout();
  this.session = null;
  this.status = 204;
};

exports.createUser = function *() {
  var User = require("mongoose").model("User");
  try {
    var user = new User({ username: this.params.username, password: this.params.password });
    user = yield user.save();
    this.redirect("/?usercreated=1");
  } catch (err) {
    this.redirect("/?usercreated=0");
  }
};
