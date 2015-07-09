"use strict";
var stats = require("../../build/stats.json");

var publicPath = stats.publicPath;

var STYLE_URL;
var SCRIPT_URL_APP = publicPath + [].concat(stats.assetsByChunkName.app)[0];
if (process.env.NODE_ENV === "production") {
  STYLE_URL = (publicPath + [].concat(stats.assetsByChunkName.app)[1] + "?" + stats.hash);
  SCRIPT_URL_APP += "?" + stats.hash;
}

exports.index = function *() {
  this.body = yield this.render("basic", {
    version: stats.appVersion,
    commit: stats.appCommit,
    STYLE_URL: STYLE_URL,
    SCRIPT_URL: SCRIPT_URL_APP,
  });
};
