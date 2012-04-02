ApplicationWindow = ->

	self = Ti.UI.createWindow()
	
	win = require 'ui/ListTodo'

	nav = Ti.UI.iPhone.createNavigationGroup
		window: win()

	self.add nav
	self

module.exports = ApplicationWindow
