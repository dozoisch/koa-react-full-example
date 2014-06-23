//'use strict'; // cannot use 'use strict' with yield
var mongoose = require('mongoose');
var Count = mongoose.model('Count');

exports.getCount = function *() {
  var count = yield Count.findOne().exec();
  if(!count) {
    count = new Count();
  }
  this.body = {count: count.value};
};

exports.increment = function *() {
  var count = yield Count.findOne().exec();
  if(!count) {
    count = new Count();
  }
  ++count.value;

  yield count.save();
  this.body = {count: count.value};
};

exports.decrement = function *() {
  var count = yield Count.findOne().exec();
  if(!count) {
    count = new Count();
  }
  --count.value;

  yield count.save();
  this.body = {count: count.value};
};
