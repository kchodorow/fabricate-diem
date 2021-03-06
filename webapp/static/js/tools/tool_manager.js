goog.provide('diem.tools.ToolManager');

goog.require('diem.tools.Tool');
goog.require('goog.asserts');
goog.require('goog.events');
goog.require('goog.ui.KeyboardShortcutHandler');

/**
 * Any class that wants a keyboard shortcut should call registerShortcut,
 * providing the function to call and the key to bind to. E.g.,
 * eventHandler.registerShortcut(
 *     'MOVE_PIECE', goog.bind(this.moveTool, this), goog.events.KeyCodes.V);
 * @constructor
 */
diem.tools.ToolManager = function() {
  this.activeTool_ = diem.tools.ToolManager.BASE_TOOL;
  this.toolMap_ = {};
  this.shortcuts_ = new goog.ui.KeyboardShortcutHandler(document);

  this.setupShortcuts_();
};

diem.tools.ToolManager.BASE_TOOL = new diem.tools.Tool();

/**
 * @param {diem.tools.Tool} tool a tool that needs to hook into event handling.
 */
diem.tools.ToolManager.prototype.registerTool = function(tool) {
  var id = tool.getName();
  var keys = tool.getKeys();
  switch (keys.length) {
  case 1:
    this.shortcuts_.registerShortcut(id, keys[0]);
    break;
  case 2:
    this.shortcuts_.registerShortcut(id, keys[0], keys[1]);
    break;
  }
  this.toolMap_[id] = tool;
};

/**
 * @private
 */
diem.tools.ToolManager.prototype.setupShortcuts_ = function() {
  goog.events.listen(
    this.shortcuts_,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
    this.handleKeypress,
    false,
    this);
};


/**
 * Triggered when a registered shortcut is heard.
 * @param {goog.ui.KeyboardShortcutEvent} event the event that fired
 */
diem.tools.ToolManager.prototype.handleKeypress = function(event) {
  var key = event.identifier;
  if (!(key in this.toolMap_)) {
    console.log('no tool matches ' + key);
    this.selectTool(diem.tools.ToolManager.BASE_TOOL);
    return;
  }
  var newTool = this.toolMap_[key];
  this.selectTool(newTool);
};

/**
 * @param {diem.tools.Tool} tool
 */
diem.tools.ToolManager.prototype.selectTool = function(tool) {
  // Note that this fires even if newTool == activeTool (for creating new
  // pattern pieces).
  // TODO: should there be a separate registration for non-stateful tools?
  if (this.activeTool_ != null) {
    this.activeTool_.onDeselect(tool);
  }
  var responses = tool.onSelect(this.activeTool_);
  this.handleIntersectables(responses);
  if (tool.stateful()) {
    this.activeTool_ = tool;
  }
};

/**
 * @param {string} [opt_name]
 * @returns {diem.tools.Tool}
 */
diem.tools.ToolManager.prototype.getTool = function(opt_name) {
  if (opt_name == null) {
    return this.activeTool_;
  }
  return this.toolMap_[opt_name];
};

/**
 * Adds new intersectables to tools and removes old ones.
 * @param {Array} responses
 */
diem.tools.ToolManager.prototype.handleIntersectables = function(responses) {
  goog.asserts.assert(responses.constructor == Array);
  var toolIds = [];
  for (var i = 0; i < responses.length; ++i) {
    var toolId = responses[i].getToolId();
    if (!toolIds.includes(toolId)) {
      toolIds.push(toolId);
    }
    goog.asserts.assert(
      toolId in this.toolMap_, "Did you can registerTool for " + toolId + "?");
    if (responses[i].getEventType() == 'add') {
      this.toolMap_[responses[i].getToolId()].addAction(
        responses[i].getAction(), responses[i].getMeshWrapper());
    } else if (responses[i].getEventType() == 'rm') {
      this.toolMap_[responses[i].getToolId()].rmAction(
        responses[i].getAction(), responses[i].getMeshWrapper());
    } else {
      goog.asserts.assert(
        false, 'Action "' + responses[i].action + '" not recognized');
    }
  }

  for (i in toolIds) {
    this.toolMap_[toolIds[i]].updateIntersectable();
  }
};

/**
 * @returns {array<diem.tools.Tool>}
 */
diem.tools.ToolManager.prototype.getTools = function() {
  var tools = [];
  for (var i in this.toolMap_) {
    tools.push(this.toolMap_[i]);
  }
  return tools;
};
