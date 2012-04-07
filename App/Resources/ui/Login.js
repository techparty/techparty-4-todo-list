(function() {
  var Window;

  Window = function() {
    var button_login, field, self;
    self = Ti.UI.createWindow({
      backgroundColor: "#CCC",
      modal: true,
      title: "Login"
    });
    button_login = Ti.UI.createButton({
      title: "Login",
      style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    self.setRightNavButton(button_login);
    field = Ti.UI.createTextField({
      hintText: "Digite seu usuário",
      borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
      left: 10,
      right: 10,
      top: 40,
      height: 44
    });
    button_login.addEventListener("click", function() {
      if (field.value !== "") {
        Ti.App.Properties.setString("user", field.value);
        return self.close();
      } else {
        return alert("Você precisa preencher o usuário para fazer o login");
      }
    });
    self.add(field);
    return self;
  };

  module.exports = Window;

}).call(this);
