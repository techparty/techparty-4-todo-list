(function() {
  var Window;

  Window = function() {
    var self, tableView, xhr;
    xhr = require('lib/xhr');
    self = Ti.UI.createWindow({
      title: 'Lista de tarefas'
    });
    tableView = Ti.UI.createTableView();
    self.add(tableView);
    xhr.request("GET", "http://techparty-todo-test.herokuapp.com/todo", function(response) {
      var data, t;
      response = JSON.parse(response);
      data = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = response.length; _i < _len; _i++) {
          t = response[_i];
          _results.push({
            title: t.title
          });
        }
        return _results;
      })();
      return tableView.setData(data);
    });
    return self;
  };

  module.exports = Window;

}).call(this);
