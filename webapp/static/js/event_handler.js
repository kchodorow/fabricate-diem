/* global THREE */
goog.provide('diem.EventHandler');

goog.require('diem.Globals');
goog.require('diem.tools.ToolManager');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Dragger');

/**
 * @param {THREE.Camera} camera the camera to use for raycasting
 * @param {diem.tools.ToolManager} toolManager
 * @constructor
 */
diem.EventHandler = function(camera, toolManager) {
  this.camera_ = camera;
  this.raycaster_ = new THREE.Raycaster();
  this.raycaster_.linePrecision = 1;
  this.toolManager_ = toolManager;

  this.setupOnClick_();
  this.setupDraggable_();
  var box = document.getElementById('model-box');
  this.offsetLeft_ = box.offsetLeft;
  this.offsetTop_ = box.offsetTop;
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
diem.EventHandler.prototype.getRaycasterCoordinates_ = function(x, y) {
  return new THREE.Vector3(
    ((x - this.offsetLeft_) / diem.Globals.WIDTH) * 2 - 1,
    -((y - this.offsetTop_) / diem.Globals.HEIGHT) * 2 + 1,
    0.5);
};

/**
 * Updates diem.Global.mouse to current world coordinates.
 * @param {number} x the client x coordinate
 * @param {number} y the client y coordinate
 * @private
 */
diem.EventHandler.prototype.updateMouseCoordinates_ = function(x, y) {
  var vector = this.getRaycasterCoordinates_(x, y);
  vector.unproject(this.camera_);
  var dir = vector.sub(this.camera_.position).normalize();
  var distance = -this.camera_.position.z / dir.z;
  diem.Globals.mouse = this.camera_.position.clone().add(dir.multiplyScalar(distance));
  diem.Globals.raycaster.setFromCamera(diem.Globals.mouse, this.camera_);
};

/**
 * @param {number} x
 * @param {number} y
 * @param {Array} intersectables
 * @returns {Array} 0 or more THREE.Meshes that were intersected
 * @private
 */
diem.EventHandler.prototype.getIntersections_ = function(x, y, intersectables) {
  this.updateMouseCoordinates_(x, y);
  this.raycaster_.setFromCamera(
    this.getRaycasterCoordinates_(x, y), this.camera_);
  return this.raycaster_.intersectObjects(intersectables);
};

/**
 * Sets the object being dragged.
 * @param {goog.fx.DragEvent} dragEvent the event
 */
diem.EventHandler.prototype.dragStart = function(dragEvent) {
  var tool = this.toolManager_.getTool();
  var intersects = this.getIntersections_(
    dragEvent.clientX, dragEvent.clientY,
    tool.getIntersectable(diem.events.DRAGGABLE));
  if (intersects.length == 0) {
    return;
  }
  var object = intersects[0].object;
  this.clicked_ = tool.getMeshWrapper(object);
  if (this.clicked_.onDragStart) {
    var intersectables = this.clicked_.onDragStart(tool);
    this.toolManager_.handleIntersectables(intersectables);
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
    this.clicked_.onDrag(this.toolManager_.getTool());
  }
};

/**
 * Does cleanup and unsets the dragged object.
 */
diem.EventHandler.prototype.dragEnd = function() {
  if (this.clicked_ != null && this.clicked_.onDragEnd) {
    this.clicked_.onDragEnd(this.toolManager_.getTool());
  }
  this.clicked_ = null;
};

/**
 * Calls any relevant onClick handlers.
 * @param {goog.events.BrowserEvent} event the click
 */
diem.EventHandler.prototype.handleClick = function(event) {
  var tool = this.toolManager_.getTool();
  var intersects = this.getIntersections_(
    event.clientX, event.clientY,
    tool.getIntersectable(diem.events.CLICKABLE));
  if (intersects.length == 0) {
    return;
  }
  var object = intersects[0].object;
  // Not persisted.
  var clicked = tool.getMeshWrapper(object);
  var newInteractables = clicked.onClick(intersects[0], tool);
  this.toolManager_.handleIntersectables(newInteractables);
};
