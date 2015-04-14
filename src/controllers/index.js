"use strict";
var stats = require("../../build/stats.json");

var publicPath = stats.publicPath;

var STYLE_URL = process.env.NODE_ENV === "production" ? (publicPath + "main.css?" + stats.hash) : null;
var SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];

exports.index = function *() {
  this.body = yield this.render("basic", {
    version: stats.appVersion,
    commit: stats.appCommit,
    STYLE_URL: STYLE_URL,
    SCRIPT_URL: SCRIPT_URL,
  });
};
