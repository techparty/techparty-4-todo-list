Window = (user, id, nav) ->

	# Requires
	xhr = require "lib/xhr"
	
	# Create Window
	self = Ti.UI.createWindow
		backgroundColor: "#FFF"
		title: "Tarefa"
	
	# User Interface
	title = Ti.UI.createLabel
		top: 5
		left: 5
		right: 5
		height: "auto"
		font:
			fontWeight: "bold"
			fontSize: 16
	self.add title

	# Request to get Todo"s list
	xhr.request "GET", "http://techparty-todo-test.herokuapp.com/todo/#{user}/#{id}", (response) ->
	
		Ti.API.info "http://techparty-todo-test.herokuapp.com/todo/#{user}/#{id}"

		response = JSON.parse response
		task = response[0]

		title.text = task.title
	
	return self

module.exports = Window