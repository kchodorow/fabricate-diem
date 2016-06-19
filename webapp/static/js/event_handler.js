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
 * @constructor
 */
diem.EventHandler = function(sceneContainer) {
  this.scene_container = sceneContainer;
  // Used to get mouse coordinates.
  this.camera = sceneContainer.camera;
  this.cloth = sceneContainer.cloth;

  this.shortcuts = new goog.ui.KeyboardShortcutHandler(document);
  goog.events.listen(
    this.shortcuts,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
    this.handleKeypress,
    false,
    this);

  this.shortcuts.registerShortcut(
    diem.EventHandler.CREATE_NEW, goog.events.KeyCodes.C);
  this.shortcuts.registerShortcut(
    diem.EventHandler.SCISSORS_TOOL, goog.events.KeyCodes.S);
  this.shortcuts.registerShortcut(
    diem.EventHandler.HEM_TOOL, goog.events.KeyCodes.H);

  this.activeTool = null;

  this.dragger = new goog.fx.Dragger(
    document.getElementById(diem.Globals.WEBGL_DIV_ID));
  this.dragger.defaultAction = goog.bind(this.dragAction, this);
};

diem.EventHandler.CREATE_NEW = "CREATE_NEW";

diem.EventHandler.SCISSORS_TOOL = "SCISSORS_TOOL";
diem.EventHandler.HEM_TOOL = "HEM_TOOL";

diem.EventHandler.prototype.handleKeypress = function(event) {
  switch (event.identifier)  {
  case diem.EventHandler.SCISSORS_TOOL:
  case diem.EventHandler.HEM_TOOL:
    this.activeTool = new diem.tools.Scissors(this.cloth);
    break;
  case diem.EventHandler.CREATE_NEW:
    this.scene_container.addCloth();
    break;
  default:
    console.log('no tool selected');
    this.activeTool = null;
  }
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
