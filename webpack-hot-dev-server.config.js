"use strict";
module.exports = require("./make-webpack-config")({
  devServer: true,
  hotComponents: true,
  devtool: "eval",
  debug: true,
});
