Window = (user, nav) ->
	
	# Requires
	xhr = require "lib/xhr"
	
	# Create Window
	self = Ti.UI.createWindow
		title: "Lista de tarefas"
	
	# Create TableView
	tableView = Ti.UI.createTableView()
	self.add tableView

	# Request to get Todo"s list
	xhr.request "GET", "http://techparty-todo-test.herokuapp.com/todo/#{user}", (response) ->
		
		response = JSON.parse response

		data = (task for task in response)

		tableView.setData data

	# Open the Todo
	tableView.addEventListener "click", ->
		todoView = require "ui/Todo"
		nav.open todoView user, this._id, nav
	
	return self

module.exports = Window