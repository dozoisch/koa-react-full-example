'use strict';
/**
 * Dependencies
 */
var fs = require('fs'); // Node File System
var koa = require('koa');
var koa_static = require('koa-static');
var responseTime = require('koa-response-time');
var logger = require('koa-logger');
var compress = require('koa-compress');
var router = require('koa-route');
var views = require('co-views');
var mongoose = require('mongoose');
var react = require('react');

/**
 * Config
 */
var config = require('./config/config');

/**
 * Connect to database
 */
mongoose.connect(config.mongo.url);

/**
 * Load the models
 */
var models_path = __dirname + '/src/models';
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('js')) {
        require(models_path + '/' + file);
    }
});

/**
 * Server
 */
var app = module.exports  = koa();

if(config.app.env != 'test')
  app.use(logger());

app.use(koa_static(__dirname + '/public'));

app.use(compress());
app.use(responseTime());

app.use(router.get('/', function *(next) {
  this.render = views('src/views', {
    map: {
      jade: 'jade'
    },
    default : 'jade'
  });
  yield next;
}));

var countController = require('./src/controllers/count');

app.use(router.get('/inc', countController.increment));
app.use(router.get('/value', countController.getCount));
app.use(router.get('/dec', countController.decrement));

app.use(function *(next) {
  this.body = yield this.render('index');
  this.status = 200;
});

// Start app
if (!module.parent) {
 app.listen(config.app.port);
 console.log('Server started, listening on port: ' + config.app.port);
}
console.log('Environment: ' + config.app.env);
