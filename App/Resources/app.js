(function() {
  var openApplicationWindow, win, win_login;

  openApplicationWindow = function() {
    var ApplicationWindow;
    ApplicationWindow = require('ui/ApplicationWindow');
    return new ApplicationWindow().open();
  };

  if (Ti.App.Properties.hasProperty("user")) {
    openApplicationWindow();
  } else {
    win_login = require("ui/Login");
    win = new win_login();
    win.addEventListener("close", function() {
      return openApplicationWindow();
    });
    win.open();
  }

}).call(this);
