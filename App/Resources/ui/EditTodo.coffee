Window = (parent) ->

	task = parent.task

	xhr = require "lib/xhr"
	ui = require "ui/ui"

	# Window
	self = Ti.UI.createWindow
		title: "Editar"

	# Save button
	doneButton = Ti.UI.createButton
		title: "Salvar"
		style: Ti.UI.iPhone.SystemButtonStyle.DONE
	self.setRightNavButton doneButton

	# TableView
	tableView = Ti.UI.createTableView
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	self.add tableView

	# Rows
	rows = []

	# Status
	statusSwitch = Ti.UI.createSwitch
		value: if (task.status == "Open") then false else true

	rowStatus = ui.createTableViewRowWithElement "Status", statusSwitch
	rows.push rowStatus

	# Priority
	rowPriority = ui.createTableViewRowWithTitle "Prioridade", task.priority
	rows.push rowPriority

	# Task
	rowDescription = Ti.UI.createTableViewRow
		height: 120

	textTask = Ti.UI.createTextArea
		value: task.title
		top: 5
		left: 5
		right: 5
		bottom: 5
		font:
			fontSize: 16
	rowDescription.add textTask
	rows.push rowDescription

	# Picker
	values_picker = [
		{ title: "Alta" }
		{ title: "Média" }
		{ title: "Baixa" }
	]
	picker = ui.createPicker self, values_picker

	# Events
	doneButton.addEventListener "click", ->
		
		new_task =
			title: textTask.value
			priority: rowPriority._value
			status: if rowStatus.children[1].value then "Completed" else "Open"
			user: Ti.App.Properties.getString("user")

		xhr.request "PUT", "http://techparty-todo-test.herokuapp.com/todo/#{task._id}", (response) ->
		
			response = JSON.parse response

			if response.success == true
				parent.fireEvent "updated"
				self.close()
			else
				alert "Algum erro ocorreu no servidor.
				Tente novamente mais tarde"

		, new_task

	rowPriority.addEventListener "click", ->
		textTask.blur()
		picker.open()

	self.addEventListener "picker-changed", (e) ->
		rowPriority.changeValue e.value

	tableView.setData rows

	self

module.exports = Window