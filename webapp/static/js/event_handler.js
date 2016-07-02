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
  this.funcMap_ = {};
  this.shortcuts = new goog.ui.KeyboardShortcutHandler(document);
  goog.events.listen(
    this.shortcuts,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
    this.handleKeypress,
    false,
    this);

  this.activeTool = null;

  // Objects in the scene that can be clicked.
  this.clickable_ = [];
  // A mapping between THREE objects and their backing objects.
  this.clickMap_ = {};
  document.addEventListener('mousedown', goog.bind(this.onClick, this), false);
  document.addEventListener('touchstart', goog.bind(this.onClick, this), false);
  this.raycaster_ = new THREE.Raycaster();
  this.camera_ = camera;

  // And dragged.
  this.dragger_ = new goog.fx.Dragger(
    document.getElementById(diem.Globals.WEBGL_DIV_ID));
  this.dragger_.defaultAction = goog.bind(this.dragAction, this);
  this.plane_ = new THREE.Plane();
  this.offset_ = new THREE.Vector3();
};

diem.EventHandler.prototype.registerShortcut = function(id, func, keycode) {
  this.shortcuts.registerShortcut(id, keycode);
  this.funcMap_[id] = func;
};

diem.EventHandler.prototype.registerClickable = function(clickable) {
  goog.asserts.assert(clickable.onClick != null, 'onClick handler must be set');
  var object = clickable.getObject();
  this.clickable_.push(object);
  this.clickMap_[object.uuid] = clickable;
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
diem.EventHandler.prototype.getRaycasterCoordinates = function(x, y) {
  return {
    x: (x / diem.Globals.WIDTH) * 2 - 1,
    y: -(y / diem.Globals.HEIGHT) * 2 + 1};
};

diem.EventHandler.prototype.getMouseCoordinates = function(x, y) {
  var vector = new THREE.Vector3();
  vector.set((x / diem.Globals.WIDTH) * 2 - 1, -(y / diem.Globals.HEIGHT) * 2 + 1, 0.5);
  vector.unproject(this.camera_);
  var dir = vector.sub(this.camera_.position).normalize();
  var distance = -this.camera_.position.z / dir.z;
  diem.Globals.mouse = this.camera_.position.clone().add(dir.multiplyScalar(distance));
  diem.Globals.raycaster.setFromCamera(diem.Globals.mouse, this.camera_);
};

diem.EventHandler.prototype.onClick = function(event) {
  event.preventDefault();
  this.getMouseCoordinates(event.clientX, event.clientY);
  this.raycaster_.setFromCamera(
    this.getRaycasterCoordinates(event.clientX, event.clientY), this.camera_);

  var intersects = this.raycaster_.intersectObjects(this.clickable_);
  if (intersects.length > 0) {
    var object = intersects[0].object;
    var backer = this.clickMap_[object.uuid];
    backer.onClick();
    var intersection = new THREE.Vector3();
    if (this.raycaster_.ray.intersectPlane(this.plane_, intersection)) {
      this.offset_.copy(intersection).sub(object.position);
    }
    if ('onDrag' in backer) {
      this.clicked_ = backer;
    }
  }
};

diem.EventHandler.prototype.dragAction = function() {
  var x = this.dragger_.clientX;
  var y = this.dragger_.clientY;
  this.getMouseCoordinates(x, y);
  if (this.clicked_ != null) {
    var intersection = new THREE.Vector3();
    this.raycaster_.setFromCamera(this.getRaycasterCoordinates(x, y), this.camera_);
    if (this.raycaster_.ray.intersectPlane(this.plane_, intersection)) {
      this.clicked_.onDrag(intersection.sub(this.offset_));
    }
  }
};
