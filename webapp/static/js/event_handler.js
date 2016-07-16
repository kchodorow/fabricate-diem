/* global THREE */
goog.provide('diem.EventHandler');

goog.require('diem.Globals');
goog.require('diem.events.Clickable');
goog.require('diem.events.Draggable');

goog.require('goog.asserts');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('goog.fx.Dragger');
goog.require('goog.ui.KeyboardShortcutHandler');

/**
 * Any class that wants a keyboard shortcut should call registerShortcut,
 * providing the function to call and the key to bind to. E.g.,
 * eventHandler.registerShortcut(
 *     'MOVE_PIECE', goog.bind(this.moveTool, this), goog.events.KeyCodes.V);
 * @param {THREE.Camera} camera the camera to use for raycasting
 * @constructor
 */
diem.EventHandler = function(camera) {
  this.camera_ = camera;
  this.raycaster_ = new THREE.Raycaster();
  this.raycaster_.linePrecision = 3;

  this.setupShortcuts_();
  this.setupOnClick_();
  this.setupDraggable_();

  this.activeTool_ = null;
  this.toolMap_ = {};
};

/**
 * @private
 */
diem.EventHandler.prototype.setupShortcuts_ = function() {
  this.shortcuts = new goog.ui.KeyboardShortcutHandler(document);
  goog.events.listen(
    this.shortcuts,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED,
    this.handleKeypress,
    false,
    this);
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
  this.clickable_ = [];
  this.clickMap_ = {};
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
  // Objects in the scene that can be dragged.
  this.draggable_ = [];
  // A mapping between THREE objects and their backing objects.
  this.dragMap_ = {};
  // The current thing being dragged.
  this.clicked_ = null;
};

/**
 * @param {diem.tools.Tool} tool a tool that needs to hook into event handling.
 */
diem.EventHandler.prototype.registerTool = function(tool) {
  var id = tool.getName();
  var keys = tool.getKeys();
  switch (keys.length) {
  case 1:
    this.shortcuts.registerShortcut(id, keys[0]);
    break;
  case 2:
    this.shortcuts.registerShortcut(id, keys[0], keys[1]);
    break;
  default:
    goog.asserts.fail("Wrong number of keys");
  }
  this.toolMap_[id] = tool;
};

/**
 * @param {diem.MeshWrapper} obj
 * @param {THREE.Mesh} [mesh] optional mesh to use for the click
 */
diem.EventHandler.prototype.register = function(obj, opt_mesh) {
  if (diem.events.Clickable.isClickable(obj)) {
    this.registerClickable(obj, opt_mesh);
  }
  if (diem.events.Draggable.isDraggable(obj)) {
    this.registerDraggable(obj);
  }
};

/**
 * @param {Object} clickable An instance of a class with an onClick method.
 * @param {THREE.Mesh} [opt_mesh] The mesh to use for the click. Defaults
 *     to clickable.getObject().
 */
diem.EventHandler.prototype.registerClickable = function(clickable, opt_mesh) {
  goog.asserts.assert(clickable.onClick != null, 'onClick handler must be set');
  var mesh = opt_mesh || clickable.getObject();
  var object = mesh;
  this.clickable_.push(object);
  this.clickMap_[object.uuid] = clickable;
};

/**
 * @param {Object} draggable an instance of a class with an onDrag method
 */
diem.EventHandler.prototype.registerDraggable = function(draggable) {
  goog.asserts.assert(draggable.onDrag != null, 'onDrag handler must be set');
  var object = draggable.getObject();
  this.draggable_.push(object);
  this.dragMap_[object.uuid] = draggable;
};

/**
 * Triggered when a registered shortcut is heard.
 * @param {goog.ui.KeyboardShortcutEvent} event the event that fired
 */
diem.EventHandler.prototype.handleKeypress = function(event) {
  if (!(event.identifier in this.toolMap_)) {
    console.log('no tool matches ' + event.identifier);
    this.activeTool_ = null;
    return;
  }
  var newTool = this.toolMap_[event.identifier];
  // Note that this fires even if newTool == activeTool (for creating new
  // pattern pieces).
  // TODO: should there be a separate registration for non-stateful tools?
  if (this.activeTool_ != null) {
    this.activeTool_.onDeselect(newTool);
  }
  newTool.onSelect(this.activeTool_);
  this.activeTool_ = newTool;
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
  diem.EventHandler.updateIntersectable(this.draggable_);
  var intersects = this.raycaster_.intersectObjects(this.draggable_);
  if (intersects.length == 0) {
    return;
  }
  var object = intersects[0].object;
  this.clicked_ = this.dragMap_[object.uuid];
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
  diem.EventHandler.updateIntersectable(this.clickable_);
  this.raycaster_.setFromCamera(
    diem.EventHandler.getRaycasterCoordinates_(x, y), this.camera_);
  var intersects = this.raycaster_.intersectObjects(this.clickable_);
  if (intersects.length == 0) {
    return;
  }
  var object = intersects[0].object;
  var newInteractables = this.clickMap_[object.uuid].onClick();
  for (var i = 0; i < newInteractables.length; ++i) {
    this.register(newInteractables[i]);
  }
};
