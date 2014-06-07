var router = require('koa-route');

var countController = require('../src/controllers/count');
var indexController = require('../src/controllers/index');

module.exports = function (app) {

  app.use(router.get('/', indexController.index));

  app.use(router.get('/value', countController.getCount));
  app.use(router.get('/inc', countController.increment));
  app.use(router.get('/dec', countController.decrement));
}
