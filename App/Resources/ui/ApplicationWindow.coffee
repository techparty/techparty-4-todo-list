ApplicationWindow = ->

	self = Ti.UI.createWindow()
	
	win = require 'ui/ListTodo'

	nav = Ti.UI.iPhone.createNavigationGroup
		window: win('Rafael')

	self.add nav
	self

module.exports = ApplicationWindow
