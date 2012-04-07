Window = (id, nav) ->

	# Requires
	xhr = require "lib/xhr"
	ui = require "ui/ui"
	
	# Create Window
	self = Ti.UI.createWindow
		backgroundColor: "#FFF"
		title: "Tarefa"

	# Edit button
	editButton = Ti.UI.createButton
		title: "Editar"
	self.setRightNavButton editButton
	
	# Todo
	tableView = Ti.UI.createTableView
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	self.add tableView

	# Request to get Todo"s list
	updateData = ->

		xhr.request "GET", "http://techparty-todo-test.herokuapp.com/todo/id/#{id}", (response) ->
		
			rows = []
			task = JSON.parse response
			task._id = id

			self.task = task

			rows.push ui.createTableViewRowWithTitle "Task", task.title
			rows.push ui.createTableViewRowWithTitle "Priority", task.priority
			rows.push ui.createTableViewRowWithTitle "Status", task.status
			rows.push ui.createTableViewRowWithTitle "Date", task.createdAt

			tableView.setData rows

	updateData()
	
	# Events
	editButton.addEventListener "click", ->

		editWindow = require "ui/EditTodo"
		nav.open editWindow self, self.task

	self.addEventListener "updated", ->
		updateData()

	return self

module.exports = Window