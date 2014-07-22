exports.login = function *() {
  this.body = yield this.render('auth');
};

exports.logout = function *() {
  this.logout();
  this.session = null;
  this.redirect("/");
};

exports.createUser = function *() {
  var User = require('mongoose').model('User');
  try {
    var user = new User({ username: this.params.username, password: this.params.password });
    user = yield user.save();
    this.redirect('/login?usercreated=1');
  } catch (err) {
    this.redirect('/login?usercreated=0');
  }
};
