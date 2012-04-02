(function() {
  var Window;

  Window = function(user, nav) {
    var self, tableView, xhr;
    xhr = require("lib/xhr");
    self = Ti.UI.createWindow({
      title: "Lista de tarefas"
    });
    tableView = Ti.UI.createTableView();
    self.add(tableView);
    xhr.request("GET", "http://techparty-todo-test.herokuapp.com/todo/" + user, function(response) {
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
    tableView.addEventListener("click", function() {
      var todoView;
      todoView = require("ui/Todo");
      return nav.open(todoView(user, this._id, nav));
    });
    return self;
  };

  module.exports = Window;

}).call(this);
