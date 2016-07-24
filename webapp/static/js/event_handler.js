/* global THREE */
goog.provide('diem.EventHandler');

goog.require('diem.Globals');
goog.require('diem.events.Clickable');
goog.require('diem.events.Draggable');
goog.require('diem.events.ToolManager');

goog.require('goog.asserts');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Dragger');
goog.require('goog.ui.KeyboardShortcutHandler');

/**
 * @param {THREE.Camera} camera the camera to use for raycasting
 * @constructor
 */
diem.EventHandler = function(camera, scene) {
  this.camera_ = camera;
  this.raycaster_ = new THREE.Raycaster();
  this.raycaster_.linePrecision = 1;
  this.toolManager_ = new diem.events.ToolManager(scene);

  this.setupOnClick_();
  this.setupDraggable_();
};

/**
 * @private
 */
diem.EventHandler.prototype.setupOnClick_ = function() {
  goog.events.listen(
    document,
    goog.events.EventType.CLICK,
    this.handleClick,
    false,
    this);
};

/**
 * @private
 */
diem.EventHandler.prototype.setupDraggable_ = function() {
  this.dragger_ = new goog.fx.Dragger(
    document.getElementById(diem.Globals.WEBGL_DIV_ID));
  this.dragger_.defaultAction = goog.bind(this.dragAction, this);
  this.dragger_.listen(
    goog.fx.Dragger.EventType.START, goog.bind(this.dragStart, this));
  this.dragger_.listen(
    goog.fx.Dragger.EventType.END, goog.bind(this.dragEnd, this));
  // The current thing being dragged.
  this.clicked_ = null;
};

/**
 * Raycaster coordinates (between 0 & 1, I think).
 * @param {number} x the client x coordinate
 * @param {number} y the client y coordinate
 * @returns {Object} a struct with x & y fields
 * @private
 */
diem.EventHandler.getRaycasterCoordinates_ = function(x, y) {
  return {
    x: (x / diem.Globals.WIDTH) * 2 - 1,
    y: -(y / diem.Globals.HEIGHT) * 2 + 1};
};

/**
 * Updates diem.Global.mouse to current world coordinates.
 * @param {number} x the client x coordinate
 * @param {number} y the client y coordinate
 * @private
 */
diem.EventHandler.prototype.updateMouseCoordinates_ = function(x, y) {
  var vector = new THREE.Vector3();
  vector.set((x / diem.Globals.WIDTH) * 2 - 1, -(y / diem.Globals.HEIGHT) * 2 + 1, 0.5);
  vector.unproject(this.camera_);
  var dir = vector.sub(this.camera_.position).normalize();
  var distance = -this.camera_.position.z / dir.z;
  diem.Globals.mouse = this.camera_.position.clone().add(dir.multiplyScalar(distance));
  diem.Globals.raycaster.setFromCamera(diem.Globals.mouse, this.camera_);
};

/**
 * Removes things that have been removed from the scene from the intersectable list.
 * @param {Array} list a list of meshes (draggable or clickable, atm)
 * @private
 */
diem.EventHandler.updateIntersectable = function(list) {
  var i = 0;
  while (i < list.length) {
    if (list[i].parent == null) {
      list.splice(i, 1);
      // Restart loop.
      i = 0;
    } else {
      ++i;
    }
  }
};

/**
 * Sets the object being dragged.
 * @param {goog.fx.DragEvent} dragEvent the event
 */
diem.EventHandler.prototype.dragStart = function(dragEvent) {
  var x = dragEvent.clientX;
  var y = dragEvent.clientY;
  this.updateMouseCoordinates_(x, y);
  this.raycaster_.setFromCamera(
    diem.EventHandler.getRaycasterCoordinates_(x, y), this.camera_);
  diem.EventHandler.updateIntersectable(
    this.toolManager_.getTool().getDraggable());
  var intersects = this.raycaster_.intersectObjects(
    this.toolManager_.getTool().getDraggable());
  if (intersects.length == 0) {
    return;
  }
  var object = intersects[0].object;
  this.clicked_ = this.toolManager_.getTool().getMeshWrapper(object);
  if (this.clicked_.onDragStart) {
    this.clicked_.onDragStart();
  }
};

/**
 * Actually drags the object
 */
diem.EventHandler.prototype.dragAction = function() {
  if (this.clicked_ != null) {
    var x = this.dragger_.clientX;
    var y = this.dragger_.clientY;
    this.updateMouseCoordinates_(x, y);
    this.clicked_.onDrag();
  }
};

/**
 * Does cleanup and unsets the dragged object.
 */
diem.EventHandler.prototype.dragEnd = function() {
  if (this.clicked_ != null && this.clicked_.onDragEnd) {
    this.clicked_.onDragEnd();
  }
  this.clicked_ = null;
};

/**
 * Calls any relevant onClick handlers.
 * @param {goog.events.BrowserEvent} event the click
 */
diem.EventHandler.prototype.handleClick = function(event) {
  var x = event.clientX;
  var y = event.clientY;
  this.updateMouseCoordinates_(x, y);
  diem.EventHandler.updateIntersectable(
    this.toolManager_.getTool().getClickable());
  this.raycaster_.setFromCamera(
    diem.EventHandler.getRaycasterCoordinates_(x, y), this.camera_);
  var intersects = this.raycaster_.intersectObjects(
    this.toolManager_.getTool().getClickable());
  if (intersects.length == 0) {
    return;
  }
  var object = intersects[0].object;
  // Not persisted.
  var clicked = this.toolManager_.getTool().getMeshWrapper(object);
  var newInteractables = clicked.onClick();
  this.toolManager_.handleIntersectables(newInteractables);
};
