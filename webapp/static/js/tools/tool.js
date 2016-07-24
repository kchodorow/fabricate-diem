goog.provide('diem.tools.Tool');

goog.require('diem.events.Intersectable');

/**
 * Tool base class.
 *
 * Flow:
 * - EventHandler.registerShortcut registers what should happen when a tool is
 * selected.
 * - The shortcut key is pressed -> onSelect is called -> This registers onClick
 * and onDrag handlers for the tool.
 * - Another shortcut key is pressed. This tool's onDeselect is called -> This
 * removes all of the event handlers.
 * @constructor
 */
diem.tools.Tool = function() {
  this.draggable_ = [];
  this.clickable_ = [];

  // Mappings between THREE.Mesh objects and their diem.MeshWrappers.
  this.dragMap_ = {};
  this.clickMap_ = {};
};

/**
 * This function can be used to unset onSelect/onDeselect behavior.
 * @returns {Array}
 */
diem.tools.Tool.NO_OP = function() {
  return [];
};

/**
 * Register all listeners this tool requires.
 * @param {diem.tools.Tool} [opt_oldTool] The previously selected tool
 * @returns {Array} an array of diem.event.Responses
 */
diem.tools.Tool.prototype.onSelect = function(opt_oldTool) {
  return [];
};

/**
 * Unregister all listeners this tool uses.
 * @param {diem.tools.Tool} [opt_newTool] The newly selected tool
 * @returns {Array} an array of diem.event.Responses
 */
diem.tools.Tool.prototype.onDeselect = function(opt_newTool) {
  return [];
};

/**
 * @returns {string} a unique string for this tool.
 */
diem.tools.Tool.prototype.getName = function() {
};

/**
 * @returns {Array} shortcut keys that trigger this tool.
 */
diem.tools.Tool.prototype.getKeys = function() {
  return [];
};

/**
 * @returns {Array} THREE.Meshes that have drag handlers.
 */
diem.tools.Tool.prototype.getDraggable = function() {
  return this.draggable_;
};

/**
 * @returns {Array} THREE.Meshes that have onclick handlers.
 */
diem.tools.Tool.prototype.getClickable = function() {
  return this.clickable_;
};

/**
 * @param {diem.MeshWrapper} clickable An instance of a class with an onClick
 *     method.
 * @param {THREE.Mesh} [opt_mesh] The mesh to use for the click. Defaults
 *     to clickable.getObject().
 */
diem.tools.Tool.prototype.addClickable = function(clickable, opt_mesh) {
  goog.asserts.assert(
    diem.events.Clickable.isClickable(clickable), 'onDrag handler must be set');
  var mesh = opt_mesh || clickable.getObject();
  var object = mesh;
  this.clickable_.push(object);
  this.clickMap_[object.uuid] = clickable;
};

/**
 * @param {diem.MeshWrapper} draggable an instance of a class with an onDrag
 *     method
 */
diem.tools.Tool.prototype.addDraggable = function(draggable) {
  goog.asserts.assert(
    diem.events.Draggable.isDraggable(draggable), 'onDrag handler must be set');
  var object = draggable.getObject();
  this.draggable_.push(object);
  this.dragMap_[object.uuid] = draggable;
};

/**
 * @param {THREE.Mesh}
 * @returns {diem.MeshWrapper}
 */
diem.tools.Tool.prototype.getMeshWrapper = function(mesh) {
  if (mesh.uuid in this.dragMap_) {
    return this.dragMap_[mesh.uuid];
  } else if (mesh.uuid in this.clickMap_) {
    return this.clickMap_[mesh.uuid];
  }
  goog.asserts.fail("Mesh was not registered as clickable nor draggable");
  // Unreachable.
  return null;
};

diem.tools.Tool.createIntersectable = function(
  tool, action, meshWrapper) {
  return diem.events.Intersectable.builder()
    .setTool(tool)
    .setMethod(action)
    .setMeshWrapper(meshWrapper)
    .build();
};
