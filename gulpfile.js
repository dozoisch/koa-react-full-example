"use strict";
/**
 * Dependencies
 */
var fs = require("fs");
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var browserify = require("browserify");
var concat = require("gulp-concat");
var less = require("gulp-less");
var minifyCSS = require('gulp-minify-css');
var react = require("gulp-react");
var gulpif = require("gulp-if");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var envify = require("envify");
var shim = require("browserify-shim");

// Config
var packagejson =  require("./package");
var config = require("./config/gulp");
var paths = config.paths;

// Hack around nodemon, that doesn"t wait for tasks to finish on change
var nodemon_instance;

var DEBUG = process.env.NODE_ENV === "development";

/**
 * Sub-Tasks
 */

gulp.task("jsx-compile", function () {
  return gulp.src(paths.in.jsx)
  .pipe(react())
  .on("error", function (err) {
    console.log(err.toString());
    this.emit("end");
  })
  .pipe(gulp.dest(paths.out.build_js));
});

gulp.task("copy-js", function () {
  return gulp.src(paths.in.js)
  .pipe(gulp.dest(paths.out.build_js));
});

gulp.task("app-compile", ["jsx-compile", "copy-js"], function() {
  return browserify({
       entries: paths.in.app,
       debug: DEBUG,
     })
    .require("react")
    .transform(shim)
    .transform(envify)
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest(paths.out.public));
});

gulp.task("admin-compile", ["jsx-compile", "copy-js"], function() {
  return browserify({
       entries: paths.in.adminApp,
       debug: DEBUG,
     })
    .require("react")
    .ignore("moment")
    .transform(shim)
    .transform(envify)
    .bundle()
    .pipe(source("admin-app.js"))
    .pipe(gulp.dest(paths.out.public));
});

gulp.task("less-compile", function () {
  return gulp.src(paths.in.less)
    .pipe(gulpif(DEBUG, sourcemaps.init()))
    .pipe(less())
    .on("error", function (err) {
      console.log(err.toString());
      this.emit("end");
    })
    .pipe(concat("app.css"))
    .pipe(minifyCSS())
    .pipe(gulpif(DEBUG, sourcemaps.write()))
    .pipe(gulp.dest(paths.out.public));
});

gulp.task("write-build-info", function (cb) {
  var buildInfos = {
    version : packagejson.version
  };
  require("git-rev").short(function (str) {
    buildInfos.commit = str;
    fs.writeFile(paths.out.build_info, JSON.stringify(buildInfos, null, 2), cb);
  });
});

gulp.task("install", ["app-compile", "admin-compile", "less-compile", "write-build-info" ]);

gulp.task("watch", function () {
  gulp.watch(paths.in.jsx, ["app-compile", "admin-compile"]);
  gulp.watch(paths.in.less, ["less-compile"]);
  gulp.watch(paths.toWatch, ["nodemon"]);
});

gulp.task("nodemon", function () {
  if(!nodemon_instance)
    nodemon_instance = nodemon({ script:"server.js", nodeArgs: ["--harmony", "--debug"],
    env: { "NODE_ENV": "development" }, watch: "__manual_watch__",  ext: "__manual_watch__"  });
  else {
    nodemon_instance.emit("restart");
  }
});

/**
 * Global tasks
 */
gulp.task("dev", ["install", "watch", "nodemon"]);

gulp.task("production", ["install"], function () {
  return gulp.src(paths.out.public + "/*.js")
       .pipe(uglify())
       .pipe(gulp.dest(paths.out.public));
});

gulp.task("default", ["install"]);
