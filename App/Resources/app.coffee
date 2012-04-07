openApplicationWindow = ->
	ApplicationWindow = require 'ui/ApplicationWindow';
	new ApplicationWindow().open();

if Ti.App.Properties.hasProperty("user")
	openApplicationWindow()
else
	win_login = require "ui/Login"
	win = new win_login()
		
	win.addEventListener "close", ->
		openApplicationWindow()

	win.open()
