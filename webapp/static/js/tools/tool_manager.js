goog.provide('diem.tools.ToolManager');

goog.require('diem.tools.AddAnchorPoint');
goog.require('diem.tools.AddPiece');
goog.require('diem.tools.AnchorPoint');
goog.require('diem.tools.RemoveAnchorPoint');

goog.require('goog.events');
goog.require('goog.events.EventType');

/**
 * Any class that wants a keyboard shortcut should call registerShortcut,
 * providing the function to call and the key to bind to. E.g.,
 * eventHandler.registerShortcut(
 *     'MOVE_PIECE', goog.bind(this.moveTool, this), goog.events.KeyCodes.V);
 * @constructor
 */
diem.tools.ToolManager = function(scene) {
  this.activeTool_ = diem.tools.ToolManager.BASE_TOOL;
  this.toolMap_ = {};
  this.shortcuts_ = new goog.ui.KeyboardShortcutHandler(document);

  this.setupShortcuts_(scene);
};

diem.tools.ToolManager.BASE_TOOL = new diem.tools.Tool();

/**
 * @param {diem.tools.Tool} tool a tool that needs to hook into event handling.
 */
diem.tools.ToolManager.prototype.registerTool_ = function(tool) {
  var id = tool.getName();
  var keys = tool.getKeys();
  switch (keys.length) {
  case 1:
    this.shortcuts_.registerShortcut(id, keys[0]);
    break;
  case 2:
    this.shortcuts_.registerShortcut(id, keys[0], keys[1]);
    break;
  default:
    goog.asserts.fail("Wrong number of keys");
  }
  this.toolMap_[id] = tool;
};

/**
 * @private
 */
diem.tools.ToolManager.prototype.setupShortcuts_ = function(scene) {
  goog.events.listen(
    this.shortcuts_,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
    this.handleKeypress,
    false,
    this);

  this.registerTool_(new diem.tools.AddPiece(scene));
  this.registerTool_(new diem.tools.AddAnchorPoint());
  this.registerTool_(new diem.tools.RemoveAnchorPoint());
  this.registerTool_(new diem.tools.AnchorPoint());
};

diem.tools.ToolManager.prototype.getTool = function() {
  return this.tool_;
};

/**
 * Triggered when a registered shortcut is heard.
 * @param {goog.ui.KeyboardShortcutEvent} event the event that fired
 */
diem.tools.ToolManager.prototype.handleKeypress = function(event) {
  if (!(event.identifier in this.toolMap_)) {
    console.log('no tool matches ' + event.identifier);
    this.activeTool_ = diem.tools.ToolManager.BASE_TOOL;
    return;
  }
  var newTool = this.toolMap_[event.identifier];
  // Note that this fires even if newTool == activeTool (for creating new
  // pattern pieces).
  // TODO: should there be a separate registration for non-stateful tools?
  if (this.activeTool_ != null) {
    this.activeTool_.onDeselect(newTool);
  }
  var responses = newTool.onSelect(this.activeTool_);
  this.handleIntersectables(responses);
  this.activeTool_ = newTool;
};

diem.tools.ToolManager.prototype.getTool = function() {
  return this.activeTool_;
};

/**
 *
 */
diem.tools.ToolManager.prototype.handleIntersectables = function(responses) {
  for (var i = 0; i < responses.length; ++i) {
    var response = responses[i];
    if (response.isClickable()) {
      this.toolMap_[response.getToolId()].addClickable(response.getMeshWrapper());
    } else if (response.isDraggable()) {
      this.toolMap_[response.getToolId()].addDraggable(response.getMeshWrapper());
    }
  }
  // TODO: update intersectables (for all tools)
};
