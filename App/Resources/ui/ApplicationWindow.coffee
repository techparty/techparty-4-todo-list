ApplicationWindow = ->

	self = Ti.UI.createWindow()
	
	win = require "ui/ListTodo"

	nav = Ti.UI.iPhone.createNavigationGroup()
	nav.window = win("Rafael", nav)

	self.add nav
	self

module.exports = ApplicationWindow
