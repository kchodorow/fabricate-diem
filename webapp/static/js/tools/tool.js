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
  /**
   *
   */
  this.name_ = null;

  // Mappings of actions to a dict of THREE.Mesh ids and their
  // diem.MeshWrappers.
  // Structure: {draggable: {id1: meshw1, id2: meshw2, ...}, clickable: ...}
  this.actionMap_ = {};
  // Mappings of actions to a list of this THREE.Meshes.
  this.intersectableList_ = {};
  // Mapping of THREE.Mesh ids -> MeshWrappers
  this.wrapperMap_ = {};
  // Optional HTML toolbar button.
  this.button_ = null;
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
 * @param {array} [intersections]
 * @returns {Array} an array of new diem.MeshWrappers
 */
diem.tools.Tool.prototype.onClick = function(intersections) {
  goog.asserts.assert(intersections.length > 0);
  var meshWrapper = this.getMeshWrapper(intersections[0].object);
  return meshWrapper.onClick(intersections);
};

/**
 * @param {diem.MeshWrapper} [meshWrapper] The selected mesh
 * @returns {Array} an array of new diem.MeshWrappers
 */
diem.tools.Tool.prototype.onDragStart = function(meshWrapper) {
  return meshWrapper.onDragStart();
};

/**
 * @param {diem.MeshWrapper} [meshWrapper] The selected mesh
 * @returns {Array} an array of new diem.MeshWrappers
 */
diem.tools.Tool.prototype.onDrag = function(meshWrapper) {
  return meshWrapper.onDrag();
};

/**
 * @param {diem.MeshWrapper} [meshWrapper] The selected mesh
 * @returns {Array} an array of new diem.MeshWrappers
 */
diem.tools.Tool.prototype.onDragEnd = function(meshWrapper) {
  return meshWrapper.onDragEnd();
};

/**
 * @returns {string} a unique string for this tool.
 */
diem.tools.Tool.prototype.getName = function() {
  return this.name_;
};

/**
 * @returns {Array} shortcut keys that trigger this tool.
 */
diem.tools.Tool.prototype.getKeys = function() {
  return [];
};

/**
 * @param {THREE.Mesh} mesh
 * @returns {diem.MeshWrapper}
 */
diem.tools.Tool.prototype.getMeshWrapper = function(mesh) {
  if (mesh.uuid in this.wrapperMap_) {
    goog.asserts.assert(this.wrapperMap_[mesh.uuid] != null);
    return this.wrapperMap_[mesh.uuid];
  }
  goog.asserts.fail("Mesh was not registered");
  // Unreachable.
  return null;
};

/**
 * Registers a mesh wrapper for a certain action.
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 */
diem.tools.Tool.prototype.addAction = function(action, meshWrapper) {
  goog.asserts.assert(
    (this.actionMap_[action] == null && this.intersectableList_[action] == null)
      || (this.actionMap_[action] != null && this.intersectableList_[action] != null));
  if (this.actionMap_[action] == null) {
    this.intersectableList_[action] = [];
    this.actionMap_[action] = {};
  }
  var obj = meshWrapper.getObject();
  this.intersectableList_[action].push(obj);
  this.actionMap_[action][obj.uuid] = meshWrapper;
  this.wrapperMap_[obj.uuid] = meshWrapper;
};

/**
 * @param {string} action
 * @returns {Array} the list of meshes for the raycaster to intersect.
 */
diem.tools.Tool.prototype.getIntersectable = function(action) {
  if (!(action in this.intersectableList_)) {
    return [];
  }
  return this.intersectableList_[action];
};

/**
 * Removes things that have been removed from the scene from the intersectable list.
 */
diem.tools.Tool.prototype.updateIntersectable = function() {
  for (var action in this.intersectableList_) {
    var list = this.intersectableList_[action];
    var i = 0;
    while (i < list.length) {
      if (list[i].parent == null) {
        var id = list[i].uuid;
        // We set the other refs to null, but don't need to remove them because
        // they shouldn't be referenced again.
        this.actionMap_[action][id] = null;
        this.wrapperMap_[id] = null;

        // Actually remove from the intersectable map, since that's used by the
        // raycaster.
        list.splice(i, 1);
        // Restart loop.
        i = 0;
      } else {
        ++i;
      }
    }
  }
};

/**
 * If this tool should have a toolbar button, this creates it.
 * @returns {HTMLButtonElement} Or null, if no such button should be created.
 */
diem.tools.Tool.prototype.getButton = function() {
  return this.button_;
};

/**
 * @param {string} tool
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.Tool.createIntersectable = function(tool, action, meshWrapper) {
  return diem.events.Intersectable.builder()
    .setTool(tool)
    .setMethod(action)
    .setMeshWrapper(meshWrapper)
    .build();
};
