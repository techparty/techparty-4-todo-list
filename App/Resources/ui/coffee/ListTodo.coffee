Window = ->
	
	# Requires
	xhr = require 'lib/xhr'
	
	# Create Window
	self = Ti.UI.createWindow
		title: 'Lista de tarefas'
	
	# Create TableView
	tableView = Ti.UI.createTableView()
	self.add tableView
	
	# Request to get Todo's list
	xhr.request "GET", "http://techparty-todo-test.herokuapp.com/todo", (response) ->
		response = JSON.parse response
		data = ({title: t.title} for t in response)
		tableView.setData data
	
	return self

module.exports = Window