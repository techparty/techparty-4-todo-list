(function() {
  var Window;

  Window = function() {
    var cancelButton, doneButton, picker, rowDescription, rowPriority, rows, self, tableView, textTask, ui, values_picker, xhr;
    ui = require("ui/ui");
    xhr = require("lib/xhr");
    self = Ti.UI.createWindow({
      modal: true,
      title: "Nova tarefa"
    });
    cancelButton = Ti.UI.createButton({
      title: "Cancelar"
    });
    self.setLeftNavButton(cancelButton);
    doneButton = Ti.UI.createButton({
      title: "Salvar",
      style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    self.setRightNavButton(doneButton);
    tableView = Ti.UI.createTableView({
      style: Ti.UI.iPhone.TableViewStyle.GROUPED
    });
    self.add(tableView);
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
    rows = [];
    rowPriority = ui.createTableViewRowWithTitle("Prioridade", "Selecione");
    rows.push(rowPriority);
    rowDescription = Ti.UI.createTableViewRow({
      height: 120
    });
    textTask = Ti.UI.createTextArea({
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
    tableView.setData(rows);
    cancelButton.addEventListener("click", function() {
      return self.close();
    });
    doneButton.addEventListener("click", function() {
      var date, task;
      date = new Date();
      task = {
        title: textTask.value,
        createdAt: date,
        todoDate: date,
        priority: rowPriority._value,
        status: "Open",
        user: Ti.App.Properties.getString("user")
      };
      return xhr.request("POST", "http://techparty-todo-test.herokuapp.com/todo/", function(response) {
        response = JSON.parse(response);
        if (response.success === true) {
          return self.close();
        } else {
          return alert("Algum erro ocorreu no servidor.				Tente novamente mais tarde");
        }
      }, task);
    });
    tableView.addEventListener("scroll", function() {
      picker.close();
      return textTask.blur();
    });
    textTask.addEventListener("focus", function() {
      return picker.close();
    });
    rowPriority.addEventListener("click", function() {
      textTask.blur();
      return picker.open();
    });
    self.addEventListener("picker-changed", function(e) {
      return rowPriority.changeValue(e.value);
    });
    return self;
  };

  module.exports = Window;

}).call(this);
