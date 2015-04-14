"use strict";
module.exports = require("./make-webpack-config")({
  // commonsChunk: true,
  env: "production",
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  // devtool: "source-map",
});
