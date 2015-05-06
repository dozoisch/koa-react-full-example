"use strict";
var mongoose = require("mongoose");
var Count = mongoose.model("Count");
var _ = require("lodash");

exports.getCount = function *() {
  var count = yield Count.findOne().exec();
  if (!count) {
    count = new Count();
  }
  this.body = { count: count.value };
};

exports.increment = function *() {
  var count = yield Count.findOne().exec();
  if (!count) {
    count = new Count();
  }
  ++count.value;

  yield count.save();
  this.body = { count: count.value };
};

exports.decrement = function *() {
  var count = yield Count.findOne().exec();
  if (!count) {
    count = new Count();
  }
  --count.value;

  yield count.save();
  this.body = { count: count.value };
};


exports.read = function *() {
  var count = yield Count.findOne().exec();
  if (!count) {
    count = new Count();
  }
  ++count.value;

  yield count.save();
  this.body = { count: count };
};

exports.update = function *() {
  const { id } = this.params;
  var count = yield Count.findById(id).exec();
  if (!count) {
    this.throw("Not Found", 404);
  }

  _.extend(count, this.request.body.count);
  count.save();
  this.body = { count: count };
}
