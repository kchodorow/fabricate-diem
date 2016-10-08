goog.provide('diem.events.Intersectable');

/**
 * @param {string} toolId
 * @param {string} action
 * @param {diem.MeshWrapper} mesh
 * @constructor
 */
diem.events.Intersectable = function(toolId, action, mesh) {
  this.toolId_ = toolId;
  this.action_ = action;
  this.meshWrapper_ = mesh;
};

/**
 * @returns {string} the name of this tool (e.g., 'RM_ANCHOR_PT').
 */
diem.events.Intersectable.prototype.getToolId = function() {
  return this.toolId_;
};

/**
 * @returns {string} the action id that this mesh should "intersect" (e.g.,
 * 'CLICKABLE').
 */
diem.events.Intersectable.prototype.getAction = function() {
  return this.action_;
};

/**
 * @returns {diem.MeshWrapper}
 */
diem.events.Intersectable.prototype.getMeshWrapper = function() {
  return this.meshWrapper_;
};

/**
 * @returns {diem.events.Intersectable.Builder}
 */
diem.events.Intersectable.builder = function() {
  return new diem.events.Intersectable.Builder();
};

/**
 * @constructor
 */
diem.events.Intersectable.Builder = function() {
  this.toolId = null;
  this.method = null;
  this.meshWrapper = null;
};

/**
 * @param {string} toolId
 */
diem.events.Intersectable.Builder.prototype.setTool = function(toolId) {
  this.toolId = toolId;
  return this;
};

/**
 * @param {string} method
 */
diem.events.Intersectable.Builder.prototype.setMethod = function(method) {
  this.method = method;
  return this;
};

/**
 * @param {diem.MeshWrapper} mesh
 */
diem.events.Intersectable.Builder.prototype.setMeshWrapper = function(mesh) {
  this.meshWrapper = mesh;
  return this;
};

/**
 * @returns {diem.events.Intersectable}
 */
diem.events.Intersectable.Builder.prototype.build = function() {
  return new diem.events.Intersectable(this.toolId, this.method, this.meshWrapper);
};
