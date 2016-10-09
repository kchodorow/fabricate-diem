goog.provide('diem.MeshWrapper');

/**
 * @constructor
 */
diem.MeshWrapper = function() {
  this.mesh_ = null;
};

/**
 * @returns {THREE.Mesh}
 */
diem.MeshWrapper.prototype.getObject = function() {
  return this.mesh_;
};

/**
 * @returns {string}
 */
diem.MeshWrapper.prototype.getUuid = function() {
  return this.mesh_.uuid;
};

/**
 * @returns {Array} diem.events.Intersectables that should be added to their
 *     respective tools.
 */
diem.MeshWrapper.prototype.getIntersectables = function() {
  return [];
};

/**
 * Adds the mesh to the given parent.
 * @param {THREE.Mesh} parent
 */
diem.MeshWrapper.prototype.addToParent = function(parent) {
  parent.add(this.mesh_);
};

/**
 * @returns {boolean}
 */
diem.MeshWrapper.prototype.isDirty = function() {
  return this.mesh_.geometry.verticesNeedUpdate;
};
