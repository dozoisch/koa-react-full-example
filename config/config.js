'use strict';
var path = require('path');
var _ = require('lodash');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var base = {
  app: {
    root: path.normalize(__dirname + '/..'),
    env: env
  }
};

var specific = {
  development: {
    app: {
      port: 3000,
      name: 'Point de genie - Dev'
    },
    mongo: {
      url: 'mongodb://localhost/koareactfullexample_dev',
    }
  },
  test: {
    app: {
      port: 3001,
      name: 'Point de genie - Test realm'
    },
    mongo: {
      url: 'mongodb://localhost/koareactfullexample_test',
    }
  },
  production: {
    app: {
      port: process.env.PORT || 3000,
      name: 'Point de genie'
    },
    mongo: {
      url: 'mongodb://localhost/koareactfullexample',
    }
  }
};

module.exports = _.merge(base, specific[env]);
