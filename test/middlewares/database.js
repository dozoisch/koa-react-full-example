var mongoose = require('mongoose');

var Models = [
  mongoose.model('Count')
];

exports.dropDatabase = function *() {
  yield Models.map(dropCollection);
}

var dropCollection = function (Model) {
  return new Promise(function (resolve, reject) {
    Model.collection.remove(function (err) {
      if(err) return reject(err);
      resolve();
    });
  });
}
