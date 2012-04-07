(function() {
  var ApplicationWindow;

  ApplicationWindow = function() {
    var nav, self, win_todos;
    self = Ti.UI.createWindow();
    win_todos = require("ui/ListTodo");
    nav = Ti.UI.iPhone.createNavigationGroup();
    nav.window = win_todos(Ti.App.Properties.getString("user"), nav);
    self.add(nav);
    return self;
  };

  module.exports = ApplicationWindow;

}).call(this);
