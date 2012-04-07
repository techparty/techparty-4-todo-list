(function() {
  var Window;

  Window = function(user, nav) {
    var AddTodoView, buttonNewTodo, buttonRefresh, requestTodos, self, tableView, xhr;
    xhr = require("lib/xhr");
    AddTodoView = require("ui/addTodo");
    self = Ti.UI.createWindow({
      title: "Lista de tarefas"
    });
    buttonNewTodo = Ti.UI.createButton({
      systemButton: Ti.UI.iPhone.SystemButton.ADD
    });
    self.setRightNavButton(buttonNewTodo);
    buttonRefresh = Ti.UI.createButton({
      systemButton: Ti.UI.iPhone.SystemButton.REFRESH
    });
    self.setLeftNavButton(buttonRefresh);
    tableView = Ti.UI.createTableView();
    self.add(tableView);
    requestTodos = function() {
      return xhr.request("GET", "http://techparty-todo-test.herokuapp.com/todo/" + user, function(response) {
        var data, task;
        response = JSON.parse(response);
        data = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = response.length; _i < _len; _i++) {
            task = response[_i];
            _results.push(task);
          }
          return _results;
        })();
        return tableView.setData(data);
      });
    };
    requestTodos();
    buttonRefresh.addEventListener("click", function() {
      return requestTodos();
    });
    buttonNewTodo.addEventListener("click", function() {
      var addTodoView;
      addTodoView = new AddTodoView();
      addTodoView.open();
      return addTodoView.addEventListener("close", function() {
        return requestTodos();
      });
    });
    tableView.addEventListener("click", function() {
      var todoView;
      todoView = require("ui/Todo");
      return nav.open(todoView(this._id, nav));
    });
    return self;
  };

  module.exports = Window;

}).call(this);
