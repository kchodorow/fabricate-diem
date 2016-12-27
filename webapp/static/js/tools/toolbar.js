goog.provide('diem.tools.Toolbar');

/**
 * @param {diem.tools.ToolManager} toolManager
 * @constructor
 */
diem.tools.Toolbar = function(toolManager) {
  this.toolManager_ = toolManager;
  this.tools_ = this.toolManager_.getTools();
};

/**
 * @returns {Array} An array of HTML buttons for all registered tools.
 */
diem.tools.Toolbar.prototype.createButtons = function() {
  var buttons = [];
  for (var i  = 0; i < this.tools_.length; ++i) {
    var button = this.tools_[i].getButton();
    if (button == null) {
      continue;
    }
    button.onclick = goog.bind(
      this.onClickFunction, this, button, this.tools_[i]);
    buttons.push(button);
  }
  return buttons;
};

/**
 * @param {HTMLElement} button
 * @param {diem.tools.Tool} tool
 */
diem.tools.Toolbar.prototype.onClickFunction = function(button, tool) {
  // Deselect old button.
  var currentTool = this.toolManager_.getTool();
  var oldButton = currentTool.getButton();
  if (oldButton != null && oldButton.className.indexOf(' active') >= 0) {
    oldButton.className = oldButton.className.replace(' active', '');
  }
  // Select new button.
  this.toolManager_.selectTool(tool);
  button.className = button.className + ' active';
};
