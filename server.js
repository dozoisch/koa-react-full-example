'use strict';
/**
 * Dependencies
 */
var fs = require('fs');
var koa = require('koa');
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
var models_path = config.app.root + '/src/models';
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('js')) {
        require(models_path + '/' + file);
    }
});

/**
 * Server
 */
var app = module.exports  = koa();
require('./config/koa')(app, config);

// Routes
require('./config/routes')(app);

// Start app
if (!module.parent) {
 app.listen(config.app.port);
 console.log('Server started, listening on port: ' + config.app.port);
}
console.log('Environment: ' + config.app.env);
