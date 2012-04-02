(function() {
  var Window;

  Window = function(user, id, nav) {
    var self, title, xhr;
    xhr = require("lib/xhr");
    self = Ti.UI.createWindow({
      backgroundColor: "#FFF",
      title: "Tarefa"
    });
    title = Ti.UI.createLabel({
      top: 5,
      left: 5,
      right: 5,
      height: "auto",
      font: {
        fontWeight: "bold",
        fontSize: 16
      }
    });
    self.add(title);
    xhr.request("GET", "http://techparty-todo-test.herokuapp.com/todo/" + user + "/" + id, function(response) {
      var task;
      Ti.API.info("http://techparty-todo-test.herokuapp.com/todo/" + user + "/" + id);
      response = JSON.parse(response);
      task = response[0];
      return title.text = task.title;
    });
    return self;
  };

  module.exports = Window;

}).call(this);
