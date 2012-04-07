Window = (user, nav) ->
	
	# Requires
	xhr = require "lib/xhr"
	AddTodoView = require "ui/addTodo"
	
	# Create Window
	self = Ti.UI.createWindow
		title: "Lista de tarefas"

	buttonNewTodo = Ti.UI.createButton
		systemButton: Ti.UI.iPhone.SystemButton.ADD
	self.setRightNavButton buttonNewTodo

	buttonRefresh = Ti.UI.createButton
		systemButton: Ti.UI.iPhone.SystemButton.REFRESH
	self.setLeftNavButton buttonRefresh
	
	# Create TableView
	tableView = Ti.UI.createTableView()
	self.add tableView

	requestTodos = ->

		xhr.request "GET", "http://techparty-todo-test.herokuapp.com/todo/#{user}", (response) ->
		
			response = JSON.parse response

			data = (task for task in response)

			tableView.setData data

	requestTodos()

	# Events
	buttonRefresh.addEventListener "click", ->
		requestTodos()
		
	buttonNewTodo.addEventListener "click", ->

		addTodoView = new AddTodoView()
		addTodoView.open()
	
		addTodoView.addEventListener "close", ->
			requestTodos()

	tableView.addEventListener "click", ->
		todoView = require "ui/Todo"
		nav.open todoView this._id, nav
	
	return self

module.exports = Window