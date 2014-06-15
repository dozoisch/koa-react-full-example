var router = require('koa-router');

var countController = require('../src/controllers/count');
var indexController = require('../src/controllers/index');

module.exports = function (app) {
  // register functions
  app.use(router(app));

  app.get('/', indexController.index);
  app.get('/value', countController.getCount);
  app.get('/inc', countController.increment);
  app.get('/dec', countController.decrement);
}
