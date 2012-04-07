(function() {
  var Window;

  Window = function(parent) {
    var doneButton, picker, rowDescription, rowPriority, rowStatus, rows, self, statusSwitch, tableView, textTask, ui, values_picker, xhr;
    xhr = require("lib/xhr");
    ui = require("ui/ui");
    self = Ti.UI.createWindow({
      title: "Editar"
    });
    doneButton = Ti.UI.createButton({
      title: "Salvar",
      style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    self.setRightNavButton(doneButton);
    tableView = Ti.UI.createTableView({
      style: Ti.UI.iPhone.TableViewStyle.GROUPED
    });
    self.add(tableView);
    rows = [];
    statusSwitch = Ti.UI.createSwitch({
      value: parent.task.status === "Open" ? false : true
    });
    rowStatus = ui.createTableViewRowWithElement("Status", statusSwitch);
    rows.push(rowStatus);
    rowPriority = ui.createTableViewRowWithTitle("Prioridade", parent.task.priority);
    rows.push(rowPriority);
    rowDescription = Ti.UI.createTableViewRow({
      height: 120
    });
    textTask = Ti.UI.createTextArea({
      value: parent.task.title,
      top: 5,
      left: 5,
      right: 5,
      bottom: 5,
      font: {
        fontSize: 16
      }
    });
    rowDescription.add(textTask);
    rows.push(rowDescription);
    values_picker = [
      {
        title: "Alta"
      }, {
        title: "Média"
      }, {
        title: "Baixa"
      }
    ];
    picker = ui.createPicker(self, values_picker);
    doneButton.addEventListener("click", function() {
      var new_task;
      new_task = {
        title: textTask.value,
        priority: rowPriority._value,
        status: rowStatus.children[1].value ? "Completed" : "Open",
        user: Ti.App.Properties.getString("user")
      };
      return xhr.request("PUT", "http://techparty-todo-test.herokuapp.com/todo/" + parent.task._id, function(response) {
        response = JSON.parse(response);
        if (response.success === true) {
          parent.fireEvent("updated");
          return self.close();
        } else {
          return alert("Algum erro ocorreu no servidor.				Tente novamente mais tarde");
        }
      }, new_task);
    });
    rowPriority.addEventListener("click", function() {
      textTask.blur();
      return picker.open();
    });
    self.addEventListener("picker-changed", function(e) {
      return rowPriority.changeValue(e.value);
    });
    tableView.setData(rows);
    return self;
  };

  module.exports = Window;

}).call(this);
