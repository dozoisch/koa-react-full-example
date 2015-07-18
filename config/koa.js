"use strict";
const path = require("path");
const serve = require("koa-static-cache");
const session = require("koa-generic-session");
const MongoStore = require("koa-sess-mongo-store");
const responseTime = require("koa-response-time");
const logger = require("koa-logger");
const views = require("co-views");
const compress = require("koa-compress");
const errorHandler = require("koa-error");
const bodyParser = require("koa-bodyparser");

const STATIC_FILES_MAP = {};
const SERVE_OPTIONS = { maxAge: 365 * 24 * 60 * 60 };

module.exports = function(app, config, passport) {
  if (!config.app.keys) { throw new Error("Please add session secret key in the config file!"); }
  app.keys = config.app.keys;

  if (config.app.env !== "test") {
    app.use(logger());
  }

  app.use(errorHandler());

  if (config.app.env === "production") {
    app.use(serve(path.join(config.app.root, "build", "public"), SERVE_OPTIONS, STATIC_FILES_MAP));
  } else {
    app.use(require("koa-proxy")({
      host: "http://localhost:2992",
      match: /^\/_assets\//,
    }));
  }

  app.use(session({
    key: "koareactfullexample.sid",
    store: new MongoStore({ url: config.mongo.url }),
  }));

  app.use(bodyParser());
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function *(next) {
    this.render = views(config.app.root + "/src/views", {
      map: { html: "swig" },
      cache: config.app.env === "development" ? "memory" : false,
    });
    yield next;
  });

  app.use(compress());
  app.use(responseTime());
};
