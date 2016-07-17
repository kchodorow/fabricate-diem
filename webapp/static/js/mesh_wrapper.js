goog.provide('diem.MeshWrapper');

/**
 * @constructor
 */
diem.MeshWrapper = function() {
  this.mesh_ = null;
  // "Parent" classes.
  this.mixins_ = {};
};

/**
 * @returns {THREE.Mesh}
 */
diem.MeshWrapper.prototype.getObject = function() {
  return this.mesh_;
};

/**
 * Adds the mesh to the given parent.
 * @param {THREE.Mesh} parent
 */
diem.MeshWrapper.prototype.addToParent = function(parent) {
  parent.add(this.mesh_);
};

/**
 * Adds this to the given event handler.
 * @param {diem.EventHandler} eventHandler
 */
diem.MeshWrapper.prototype.addToEventHandler = function(eventHandler) {
  eventHandler.register(this);
};

/**
 * @returns {boolean}
 */
diem.MeshWrapper.prototype.isDirty = function() {
  return this.mesh_.geometry.verticesNeedUpdate;
};
