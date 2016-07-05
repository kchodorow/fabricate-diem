/* global THREE */
goog.provide('diem.EventHandler');

goog.require('diem.Globals');
goog.require('diem.tools.Scissors');

goog.require('goog.asserts');
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
diem.EventHandler = function(camera) {
  this.camera_ = camera;
  this.raycaster_ = new THREE.Raycaster();
  this.activeTool = null;
  this.funcMap_ = {};
  this.shortcuts = new goog.ui.KeyboardShortcutHandler(document);
  goog.events.listen(
    this.shortcuts,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
    this.handleKeypress,
    false,
    this);

  this.dragger_ = new goog.fx.Dragger(
    document.getElementById(diem.Globals.WEBGL_DIV_ID));
  this.dragger_.defaultAction = goog.bind(this.dragAction, this);
  this.dragger_.addEventListener(
    goog.fx.Dragger.EventType.END,
    goog.bind(this.dragEnd, this));
  // Objects in the scene that can be dragged.
  this.draggable_ = [];
  // A mapping between THREE objects and their backing objects.
  this.dragMap_ = {};
  // The current thing being dragged.
  this.clicked_ = null;
};

diem.EventHandler.prototype.registerShortcut = function(id, func, keycode) {
  this.shortcuts.registerShortcut(id, keycode);
  this.funcMap_[id] = func;
};

diem.EventHandler.prototype.registerDraggable = function(draggable) {
  goog.asserts.assert(draggable.onDrag != null, 'onDrag handler must be set');
  var object = draggable.getObject();
  this.draggable_.push(object);
  this.dragMap_[object.uuid] = draggable;
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

/**
 * Raycaster coordinates (between 0 & 1, I think).
 */
diem.EventHandler.getRaycasterCoordinates_ = function(x, y) {
  return {
    x: (x / diem.Globals.WIDTH) * 2 - 1,
    y: -(y / diem.Globals.HEIGHT) * 2 + 1};
};

diem.EventHandler.prototype.updateMouseCoordinates_ = function(x, y) {
  var vector = new THREE.Vector3();
  vector.set((x / diem.Globals.WIDTH) * 2 - 1, -(y / diem.Globals.HEIGHT) * 2 + 1, 0.5);
  vector.unproject(this.camera_);
  var dir = vector.sub(this.camera_.position).normalize();
  var distance = -this.camera_.position.z / dir.z;
  diem.Globals.mouse = this.camera_.position.clone().add(dir.multiplyScalar(distance));
  diem.Globals.raycaster.setFromCamera(diem.Globals.mouse, this.camera_);
};

diem.EventHandler.prototype.dragAction = function() {
  var x = this.dragger_.clientX;
  var y = this.dragger_.clientY;
  this.updateMouseCoordinates_(x, y);
  if (this.clicked_ == null) {
    this.raycaster_.setFromCamera(
      diem.EventHandler.getRaycasterCoordinates_(x, y), this.camera_);
    var intersects = this.raycaster_.intersectObjects(this.draggable_);
    if (intersects.length == 0) {
      return;
    }
    var object = intersects[0].object;
    this.clicked_ = this.dragMap_[object.uuid];
  }
  this.clicked_.onDrag();
};

diem.EventHandler.prototype.dragEnd = function() {
  this.clicked_ = null;
};
