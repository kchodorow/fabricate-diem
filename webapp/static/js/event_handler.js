/* global THREE */
goog.provide('diem.EventHandler');

goog.require('diem.Globals');
goog.require('diem.tools.Scissors');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.fx.Dragger');
goog.require('goog.ui.KeyboardShortcutHandler');

/**
 * Any class that wants a keyboard shortcut should call registerShortcut,
 * providing the function to call and the key to bind to. E.g.,
 * eventHandler.registerShortcut(
 *     'MOVE_PIECE', goog.bind(this.moveTool, this), goog.events.KeyCodes.V);
 * @constructor
 */
diem.EventHandler = function() {
  this.funcMap_ = {};
  this.shortcuts = new goog.ui.KeyboardShortcutHandler(document);
  goog.events.listen(
    this.shortcuts,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
    this.handleKeypress,
    false,
    this);

  this.activeTool = null;

  this.dragger = new goog.fx.Dragger(
    document.getElementById(diem.Globals.WEBGL_DIV_ID));
  this.dragger.defaultAction = goog.bind(this.dragAction, this);
};

diem.EventHandler.prototype.registerShortcut = function(id, func, keycode) {
  this.shortcuts.registerShortcut(id, keycode);
  this.funcMap_[id] = func;
};

diem.EventHandler.SCISSORS_TOOL = "SCISSORS_TOOL";
diem.EventHandler.HEM_TOOL = "HEM_TOOL";

diem.EventHandler.prototype.handleKeypress = function(event) {
  if (!(event.identifier in this.funcMap_)) {
    console.log('no tool selected');
    this.activeTool = null;
    return;
  }
  this.funcMap_[event.identifier].call(event);
};

diem.EventHandler.prototype.getMouseCoordinates = function(x, y) {
  var vector = new THREE.Vector3();
  vector.set((x / WIDTH) * 2 - 1, -(y / HEIGHT) * 2 + 1, 0.5);
  vector.unproject(this.camera);
  var dir = vector.sub(this.camera.position).normalize();
  var distance = -this.camera.position.z / dir.z;
  diem.Globals.mouse = this.camera.position.clone().add(dir.multiplyScalar(distance));
  diem.Globals.raycaster.setFromCamera(diem.Globals.mouse, this.camera);
  return diem.Globals.mouse;
};

diem.EventHandler.prototype.dragAction = function(x, y) {
  if (this.activeTool == null) {
    return;
  }
  var coordinates = this.getMouseCoordinates(x, y);
  this.activeTool.onDrag(coordinates);
};
