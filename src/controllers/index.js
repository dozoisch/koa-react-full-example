var buildInfo = require('../../build-info.json');

exports.index = function *() {
  this.body = yield this.render("basic", {
    version: buildInfo.version,
    commit: buildInfo.commit,
  });
};
