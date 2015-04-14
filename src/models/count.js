"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Schema
 */
var CountSchema = new Schema({
  value: { type: Number, default: 0 },
  updated: { type: Date, default: Date.now }
});

CountSchema.pre("save", function (next) {
    this.updated = new Date();
    next();
});

mongoose.model("Count", CountSchema);
