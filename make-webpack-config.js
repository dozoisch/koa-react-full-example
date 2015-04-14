"use strict";
var path = require("path");
var fs = require("fs");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var loadersByExtension = require("./webpack-utils/loaders-by-extension");

module.exports = function(options) {
  var loaders = {
    "js|jsx": {
      loaders: ["react-hot-loader", "babel?optional=es7.objectRestSpread"],
      exclude: /node_modules/,
    },
    json: "json-loader",
    json5: "json5-loader",
    txt: "raw-loader",
    "png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
    "woff|woff2": "url-loader?limit=100000",
    "ttf|eot": "file-loader",
    "wav|mp3": "file-loader",
    html: "html-loader",
    "md|markdown": ["html-loader", "markdown-loader"],
  };
  var stylesheetLoaders = {
    css: "css-loader",
    less: "css-loader!less-loader",
  };
  var alias = {
  };
  var aliasLoader = {
  };
  var externals = [
  ];

  var modulesDirectories = ["node_modules"];
  var extensions = ["", ".js", ".jsx"];
  var root = path.join(__dirname, "app", "app");
  var publicPath = options.devServer ?
    "//localhost:2992/_assets/" :
    "/_assets/";
  var output = {
    path: path.join(__dirname, "build", options.prerender ? "prerender" : "public"),
    publicPath: publicPath,
    filename: "[name].js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
    chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
    sourceMapFilename: "debugging/[file].map",
    libraryTarget: options.prerender ? "commonjs2" : undefined,
    pathinfo: options.debug,
  };
  var excludeFromStats = [
    /node_modules[\\\/]react.*[\\\/]/,
  ];
  var plugins = [
    function() {
      if (!options.prerender) {
        this.plugin("done", function(stats) {
          var jsonStats = stats.toJson({
            chunkModules: true,
            exclude: excludeFromStats
          });
          jsonStats.publicPath = publicPath;
          jsonStats.appVersion = require("./package.json").version;
          jsonStats.appCommit = require("child_process").execSync("git rev-parse --short HEAD").toString();

          var folderPath = path.join(__dirname, "build");
          if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
          }
          fs.writeFileSync(path.join(folderPath, "stats.json"), JSON.stringify(jsonStats));
        });
      }
    },
    new webpack.PrefetchPlugin("react"),
    new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment")
  ];
  if (options.prerender) {
    aliasLoader["react-proxy$"] = "react-proxy/unavailable";
    externals.push(
      /^react(\/.*)?$/,
      /^reflux(\/.*)?$/,
      "superagent",
      "async"
    );
    plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
  }
  if (options.commonsChunk) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "")));
  }

  Object.keys(stylesheetLoaders).forEach(function(ext) {
    var styleLoaders = stylesheetLoaders[ext];
    if (Array.isArray(styleLoaders)) { styleLoaders = styleLoaders.join("!"); }
    if (options.prerender) {
      stylesheetLoaders[ext] = "null-loader";
    } else if (options.separateStylesheet) {
      stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", styleLoaders);
    } else {
      stylesheetLoaders[ext] = "style-loader!" + styleLoaders;
    }
  });
  if (options.separateStylesheet && !options.prerender) {
    plugins.push(new ExtractTextPlugin("[name].css"));
  }
  if (options.minimize) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(options.env || "development")
        }
      }),
      new webpack.NoErrorsPlugin()
    );
  }
  var loadersArray = loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders));
  console.log(loadersArray);
  return {
    entry: { main: options.prerender ? "./config/prerender" : "./app/app" },
    output: output,
    target: options.prerender ? "node" : "web",
    module: {
      loaders: loadersArray,
    },
    devtool: options.devtool,
    debug: options.debug,
    resolveLoader: {
      root: path.join(__dirname, "node_modules"),
      alias: aliasLoader
    },
    externals: externals,
    resolve: {
      root: root,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: alias,
    },
    plugins: plugins,
    devServer: {
      stats: {
        exclude: excludeFromStats
      }
    }
  };
};
