Window = ->

	# Window
	self = Ti.UI.createWindow
		backgroundColor: "#CCC"
		modal: true
		title: "Login"

	# Button to Login
	button_login = Ti.UI.createButton
		title: "Login",
		style: Ti.UI.iPhone.SystemButtonStyle.DONE

	self.setRightNavButton button_login

	# TextField
	field = Ti.UI.createTextField
		hintText: "Digite seu usuário"
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
		left: 10,
		right: 10,
		top: 40,
		height: 44

	# Events
	button_login.addEventListener "click", ->

		if (field.value != "")
			Ti.App.Properties.setString "user", field.value
			self.close()
		else
			alert "Você precisa preencher o usuário para fazer o login"

	self.add field
	self

module.exports = Window