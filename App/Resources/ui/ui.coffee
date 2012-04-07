exports.createTableViewRowWithTitle = (title, value, selectable = false) ->

	row = Ti.UI.createTableViewRow
		_title: title
		_value: value,

	if !selectable
		row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE

	title = Ti.UI.createLabel
		left: 10
		width: 150
		text: title
		font:
			fontSize: 16
			fontWeight: "bold"
	row.add title

	value = Ti.UI.createLabel
		right: 10
		width: 150
		text: value
		textAlign: "right"
		font:
			fontSize: 16
	row.add value

	row.changeValue = (new_value) ->
		this._value = new_value
		this.children[1].text = new_value

	row

exports.createTableViewRowWithElement = (title, element, selectable = false) ->

	row = Ti.UI.createTableViewRow
		_title: title
		_value: element.value,

	if !selectable
		row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE

	title = Ti.UI.createLabel
		left: 10
		width: 150
		text: title
		font:
			fontSize: 16
			fontWeight: "bold"
	row.add title

	element.right = 10
	row.add element

	row.changeValue = (new_value) ->
		this._value = new_value
		this.children[1].value = new_value

	row

exports.createPicker = (parent, values) ->

	self = {}
	self.values = values
	self.selected_row = null

	view = Ti.UI.createView
		height: 259
		bottom: -259

	cancelButton = Ti.UI.createButton
		title: "Cancelar"
		style: Ti.UI.iPhone.SystemButtonStyle.BORDERED

	doneButton = Ti.UI.createButton
		title: "OK"
		style: Ti.UI.iPhone.SystemButtonStyle.DONE

	spaceButton = Ti.UI.createButton
		systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE

	toolbar = Ti.UI.iOS.createToolbar
		top: 0
		items:[
			cancelButton
			spaceButton
			doneButton
		]
	view.add toolbar

	picker = Ti.UI.createPicker
		top: 43
		selectionIndicator: true
	view.add picker
	parent.add view

	# Values
	picker.add Ti.UI.createPickerRow title: item.title, index: i for item, i in self.values

	# Methods
	self.open = ->
		view.animate 
			bottom: 0 
			duration: 250

	self.close = ->
		view.animate
			bottom: -259
			duration: 250

	# Events
	cancelButton.addEventListener "click", ->
		self.close()

	doneButton.addEventListener "click", ->

		selected_row = picker.getSelectedRow null

		picker.setSelectedRow 0, selected_row.index
		
		parent.fireEvent "picker-changed", value: selected_row.title
		
		self.close()

	self