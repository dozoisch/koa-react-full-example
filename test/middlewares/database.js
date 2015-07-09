"use strict";
var mongoose = require("mongoose");
var co = require("co");

var Models = [
  mongoose.model("Count"),
  mongoose.model("User"),
];

function dropCollection(Model) {
  return new Promise(function(resolve, reject) {
    Model.collection.remove(function(err) {
      if (err) { return reject(err); }
      resolve();
    });
  });
}

exports.dropDatabase = function(cb) {
  co(function *() {
    yield Models.map(dropCollection);
  }).then(cb);
};
