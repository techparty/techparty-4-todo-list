ApplicationWindow = ->

	# Window
	self = Ti.UI.createWindow()

	# Window ToDos
	win_todos = require "ui/ListTodo"

	# Navigation
	nav = Ti.UI.iPhone.createNavigationGroup()
	nav.window = win_todos(Ti.App.Properties.getString("user"), nav)

	self.add nav
	self
	
module.exports = ApplicationWindow
