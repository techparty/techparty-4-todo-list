Window = ->

	ui = require "ui/ui"
	xhr = require "lib/xhr"

	self = Ti.UI.createWindow
		modal: true
		title: "Nova tarefa"

	# Buttons
	cancelButton = Ti.UI.createButton
		title: "Cancelar"
	self.setLeftNavButton cancelButton

	doneButton = Ti.UI.createButton
		title: "Salvar"
		style: Ti.UI.iPhone.SystemButtonStyle.DONE
	self.setRightNavButton doneButton

	# TableView
	tableView = Ti.UI.createTableView
		style: Ti.UI.iPhone.TableViewStyle.GROUPED
	self.add tableView

	# Picker
	values_picker = [
		{ title: "Alta" }
		{ title: "Média" }
		{ title: "Baixa" }
	]
	picker = ui.createPicker self, values_picker

	# Rows
	rows = []

	# Priority
	rowPriority = ui.createTableViewRowWithTitle "Prioridade", "Selecione"
	rows.push rowPriority

	# Task
	rowDescription = Ti.UI.createTableViewRow
		height: 120

	textTask = Ti.UI.createTextArea
		top: 5
		left: 5
		right: 5
		bottom: 5
		font:
			fontSize: 16
	rowDescription.add textTask

	rows.push rowDescription

	tableView.setData rows

	# Events
	cancelButton.addEventListener "click", ->
		self.close()

	doneButton.addEventListener "click", ->
		
		date = new Date()

		task =
			title: textTask.value
			createdAt: date
			todoDate: date
			priority: rowPriority._value
			status: "Open"
			user: Ti.App.Properties.getString("user")

		xhr.request "POST", "http://techparty-todo-test.herokuapp.com/todo/", (response) ->
		
			response = JSON.parse response

			if response.success == true
				self.close()
			else
				alert "Algum erro ocorreu no servidor.
				Tente novamente mais tarde"

		, task

	tableView.addEventListener "scroll", ->
		picker.close()
		textTask.blur()

	textTask.addEventListener "focus", ->
		picker.close()

	rowPriority.addEventListener "click", ->
		textTask.blur()
		picker.open()

	self.addEventListener "picker-changed", (e) ->
		rowPriority.changeValue e.value

	self

module.exports = Window