(function() {

  exports.createTableViewRowWithTitle = function(title, value, selectable) {
    var row;
    if (selectable == null) selectable = false;
    row = Ti.UI.createTableViewRow({
      _title: title,
      _value: value
    });
    if (!selectable) {
      row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
    }
    title = Ti.UI.createLabel({
      left: 10,
      width: 150,
      text: title,
      font: {
        fontSize: 16,
        fontWeight: "bold"
      }
    });
    row.add(title);
    value = Ti.UI.createLabel({
      right: 10,
      width: 150,
      text: value,
      textAlign: "right",
      font: {
        fontSize: 16
      }
    });
    row.add(value);
    row.changeValue = function(new_value) {
      this._value = new_value;
      return this.children[1].text = new_value;
    };
    return row;
  };

  exports.createTableViewRowWithElement = function(title, element, selectable) {
    var row;
    if (selectable == null) selectable = false;
    row = Ti.UI.createTableViewRow({
      _title: title,
      _value: element.value
    });
    if (!selectable) {
      row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
    }
    title = Ti.UI.createLabel({
      left: 10,
      width: 150,
      text: title,
      font: {
        fontSize: 16,
        fontWeight: "bold"
      }
    });
    row.add(title);
    element.right = 10;
    row.add(element);
    row.changeValue = function(new_value) {
      this._value = new_value;
      return this.children[1].value = new_value;
    };
    return row;
  };

  exports.createPicker = function(parent, values) {
    var cancelButton, doneButton, i, item, picker, self, spaceButton, toolbar, view, _len, _ref;
    self = {};
    self.values = values;
    self.selected_row = null;
    view = Ti.UI.createView({
      height: 259,
      bottom: -259
    });
    cancelButton = Ti.UI.createButton({
      title: "Cancelar",
      style: Ti.UI.iPhone.SystemButtonStyle.BORDERED
    });
    doneButton = Ti.UI.createButton({
      title: "OK",
      style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    spaceButton = Ti.UI.createButton({
      systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    toolbar = Ti.UI.iOS.createToolbar({
      top: 0,
      items: [cancelButton, spaceButton, doneButton]
    });
    view.add(toolbar);
    picker = Ti.UI.createPicker({
      top: 43,
      selectionIndicator: true
    });
    view.add(picker);
    parent.add(view);
    _ref = self.values;
    for (i = 0, _len = _ref.length; i < _len; i++) {
      item = _ref[i];
      picker.add(Ti.UI.createPickerRow({
        title: item.title,
        index: i
      }));
    }
    self.open = function() {
      return view.animate({
        bottom: 0,
        duration: 250
      });
    };
    self.close = function() {
      return view.animate({
        bottom: -259,
        duration: 250
      });
    };
    cancelButton.addEventListener("click", function() {
      return self.close();
    });
    doneButton.addEventListener("click", function() {
      var selected_row;
      selected_row = picker.getSelectedRow(null);
      picker.setSelectedRow(0, selected_row.index);
      parent.fireEvent("picker-changed", {
        value: selected_row.title
      });
      return self.close();
    });
    return self;
  };

}).call(this);
