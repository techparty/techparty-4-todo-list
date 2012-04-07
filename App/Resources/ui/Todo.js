(function() {
  var Window;

  Window = function(id, nav) {
    var editButton, self, tableView, ui, updateData, xhr;
    xhr = require("lib/xhr");
    ui = require("ui/ui");
    self = Ti.UI.createWindow({
      backgroundColor: "#FFF",
      title: "Tarefa"
    });
    editButton = Ti.UI.createButton({
      title: "Editar"
    });
    self.setRightNavButton(editButton);
    tableView = Ti.UI.createTableView({
      style: Ti.UI.iPhone.TableViewStyle.GROUPED
    });
    self.add(tableView);
    updateData = function() {
      return xhr.request("GET", "http://techparty-todo-test.herokuapp.com/todo/id/" + id, function(response) {
        var rows, task;
        rows = [];
        task = JSON.parse(response);
        task._id = id;
        self.task = task;
        rows.push(ui.createTableViewRowWithTitle("Task", task.title));
        rows.push(ui.createTableViewRowWithTitle("Priority", task.priority));
        rows.push(ui.createTableViewRowWithTitle("Status", task.status));
        rows.push(ui.createTableViewRowWithTitle("Date", task.createdAt));
        return tableView.setData(rows);
      });
    };
    updateData();
    editButton.addEventListener("click", function() {
      var editWindow;
      editWindow = require("ui/EditTodo");
      return nav.open(editWindow(self, self.task));
    });
    self.addEventListener("updated", function() {
      return updateData();
    });
    return self;
  };

  module.exports = Window;

}).call(this);
