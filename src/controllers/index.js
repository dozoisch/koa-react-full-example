exports.index = function *() {
  this.body = yield this.render("index", { user: this.passport.user });
};
