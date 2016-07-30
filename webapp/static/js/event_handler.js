/* global THREE */
goog.provide('diem.EventHandler');

goog.require('diem.Globals');
goog.require('diem.tools.ToolManager');
goog.require('diem.tools.TimeTool');

goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Dragger');

/**
 * @param {THREE.Camera} camera the camera to use for raycasting
 * @constructor
 */
diem.EventHandler = function(camera, scene) {
  this.camera_ = camera;
  this.raycaster_ = new THREE.Raycaster();
  this.raycaster_.linePrecision = 1;
  this.toolManager_ = new diem.tools.ToolManager(scene);

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

diem.EventHandler.prototype.getIntersections_ = function(x, y, intersectables) {
  this.updateMouseCoordinates_(x, y);
  this.raycaster_.setFromCamera(
    diem.EventHandler.getRaycasterCoordinates_(x, y), this.camera_);
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
    tool.getIntersectable(diem.events.Draggable.ID));
  if (intersects.length == 0) {
    return;
  }
  var object = intersects[0].object;
  this.clicked_ = tool.getMeshWrapper(object);
  if (this.clicked_.onDragStart) {
    var intersectables = this.clicked_.onDragStart();
    this.handleIntersectables(intersectables);
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
  var tool = this.toolManager_.getTool();
  var intersects = this.getIntersections_(
    event.clientX, event.clientY,
    tool.getIntersectable(diem.events.Clickable.ID));
  if (intersects.length == 0) {
    return;
  }
  var object = intersects[0].object;
  // Not persisted.
  var clicked = tool.getMeshWrapper(object);
  var newInteractables = clicked.onClick(intersects[0]);
  this.handleIntersectables(newInteractables);
};

diem.EventHandler.prototype.handleIntersectables = function(intersectables) {
  this.toolManager_.handleIntersectables(intersectables);
};

diem.EventHandler.prototype.getSimulations = function() {
  return this.toolManager_.getTool(diem.tools.TimeTool.NAME).getSimulations();
};
