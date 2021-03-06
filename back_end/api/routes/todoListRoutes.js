'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');
  var user = require('../controllers/user');

  app.route('/hw')
    .get(todoList.hello_world);

  app.post('/signup', user.signup);  

  app.get('/activ/:userId/:code', user.activation);  

  app.post('/login', user.login);  

};