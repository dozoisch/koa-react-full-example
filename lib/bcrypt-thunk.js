"use strict";
var bcrypt = require("bcrypt");

// These do not need to be promisified
module.exports = bcrypt.genSaltSync;
module.exports = bcrypt.hashSync;
module.exports = bcrypt.compareSync;
module.exports.getRounds = bcrypt.getRounds;

module.exports.genSalt = function(rounds, ignore) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(rounds, ignore, function(err, salt) {
      if (err) { return reject(err); }
      return resolve(salt);
    });
  });
};

module.exports.hash = function(data, salt) {
  return new Promise(function(resolve, reject) {
    bcrypt.hash(data, salt, function(err, hash) {
      if (err) { return reject(err); }
      return resolve(hash);
    });
  });
};

module.exports.compare = function(data, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(data, hash, function(err, matched) {
      if (err) { return reject(err); }
      return resolve(matched);
    });
  });
};
