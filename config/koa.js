'use strict';

var koa_static = require('koa-static');
var responseTime = require('koa-response-time');
var logger = require('koa-logger');
var views = require('co-views');
var compress = require('koa-compress');
var errorHandler = require('koa-error');

module.exports = function (app, config) {
  if(config.app.env != 'test')
    app.use(logger());

  app.use(koa_static(config.app.root + '/public'));

  app.use(function *(next) {
    this.render = views('src/views', {
      map: { jade: 'jade' },
      default : 'jade'
    });
    yield next;
  });

  app.use(compress());
  app.use(responseTime());

  app.use(errorHandler());
  };
