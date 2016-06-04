/* global THREE */
goog.provide('diem.EventHandler');

goog.require('diem.Globals');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.ui.KeyboardShortcutHandler');

diem.EventHandler = function(sceneContainer) {
  goog.events.listen(
    document.getElementById(diem.Globals.WEBGL_DIV_ID),
    goog.events.EventType.CLICK,
    sceneContainer.onClick, false, sceneContainer);
  goog.events.listen(
    document.getElementById(diem.Globals.WEBGL_DIV_ID),
    goog.events.EventType.MOUSEMOVE,
    sceneContainer.onMouseMove, false, sceneContainer);

  this.shortcuts = new goog.ui.KeyboardShortcutHandler(document);
  goog.events.listen(
    this.shortcuts,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
    this.handleKeypress,
    false,
    this);

  this.shortcuts.registerShortcut(
    diem.EventHandler.SCISSORS_TOOL, goog.events.KeyCodes.S);
  this.shortcuts.registerShortcut(
    diem.EventHandler.HEM_TOOL, goog.events.KeyCodes.H);
};

diem.EventHandler.SCISSORS_TOOL = "SCISSORS_TOOL";
diem.EventHandler.HEM_TOOL = "HEM_TOOL";

diem.EventHandler.prototype.handleKeypress = function(event) {
  switch (event.identifier)  {
  case diem.EventHandler.SCISSORS_TOOL:
  case diem.EventHandler.HEM_TOOL:
    console.log(event);
    event.stopPropagation();  // so nothing else grabs
    break;
  }
};
