goog.provide('diem.events.Intersectable');

goog.require('diem.events.Clickable');
goog.require('diem.events.Draggable');

diem.events.Intersectable = function(toolId, method, mesh) {
  this.toolId = toolId;
  this.method = method;
  this.meshWrapper = mesh;
};

diem.events.Intersectable.prototype.getToolId = function() {
  return this.toolId;
};

diem.events.Intersectable.prototype.getMethod = function() {
  return this.method;
};

diem.events.Intersectable.prototype.getMeshWrapper = function() {
  return this.meshWrapper;
};

diem.events.Intersectable.prototype.isClickable = function() {
  return this.method == diem.events.Clickable.ID;
};

diem.events.Intersectable.prototype.isDraggable = function() {
  return this.method == diem.events.Draggable.ID;
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
