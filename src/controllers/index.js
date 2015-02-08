var buildInfo = require('../../build-info.json');

exports.index = function *() {
  this.body = yield this.render("index", {
    user: this.passport.user,
    version: buildInfo.version,
    commit: buildInfo.commit,
  });
};
