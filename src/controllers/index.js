exports.index = function *() {
  this.body = yield this.render('index');
};
