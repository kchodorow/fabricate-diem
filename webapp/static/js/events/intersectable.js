goog.provide('diem.events.Intersectable');

diem.events.Intersectable = function(toolId, action, mesh) {
  this.toolId_ = toolId;
  this.action_ = action;
  this.meshWrapper_ = mesh;
};

diem.events.Intersectable.prototype.getToolId = function() {
  return this.toolId_;
};

diem.events.Intersectable.prototype.getAction = function() {
  return this.action_;
};

diem.events.Intersectable.prototype.getMeshWrapper = function() {
  return this.meshWrapper_;
};

diem.events.Intersectable.builder = function() {
  return new diem.events.Intersectable.Builder();
};

diem.events.Intersectable.Builder = function() {
  this.toolId = null;
  this.method = null;
  this.meshWrapper = null;
};

diem.events.Intersectable.Builder.prototype.setTool = function(toolId) {
  this.toolId = toolId;
  return this;
};

diem.events.Intersectable.Builder.prototype.setMethod = function(method) {
  this.method = method;
  return this;
};

diem.events.Intersectable.Builder.prototype.setMeshWrapper = function(mesh) {
  this.meshWrapper = mesh;
  return this;
};

diem.events.Intersectable.Builder.prototype.build = function() {
  return new diem.events.Intersectable(this.toolId, this.method, this.meshWrapper);
};
