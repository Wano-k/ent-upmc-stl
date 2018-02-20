'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  app.route('/hw')
    .get(todoList.hello_world);

};