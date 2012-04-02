(function() {
  var ApplicationWindow;

  ApplicationWindow = function() {
    var nav, self, win;
    self = Ti.UI.createWindow();
    win = require('ui/ListTodo');
    nav = Ti.UI.iPhone.createNavigationGroup({
      window: win()
    });
    self.add(nav);
    return self;
  };

  module.exports = ApplicationWindow;

}).call(this);
