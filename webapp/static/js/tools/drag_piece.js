/* global THREE */
goog.provide('diem.tools.DragPiece');

goog.require('diem.Button');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.DragPiece = function(camera) {
  goog.base(this);
  this.name_ = diem.tools.DragPiece.NAME;
  this.camera_ = camera;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('D')
    .setTooltip('Drag fabric [D]')
    .build();
  this.activeMesh_ = null;
};

goog.inherits(diem.tools.DragPiece, diem.tools.Tool);

diem.tools.DragPiece.NAME = 'DRAG_PIECE';

/**
 * @override
 */
diem.tools.DragPiece.prototype.getKeys = function() {
  return [goog.events.KeyCodes.D];
};

/**
 * @override
 */
diem.tools.DragPiece.prototype.onDeselect = function(opt_newTool) {
  return [];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.DragPiece.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.DragPiece.NAME, action, meshWrapper);
};

/**
 * @override
 */
diem.tools.DragPiece.prototype.onDragStart = function(meshWrapper, intersection) {
  if (this.activeMesh_ != null) {
    this.activeMesh_.deselect();
  }
  this.activeMesh_ = meshWrapper;
  meshWrapper.select();
  return meshWrapper.drag3dStart(intersection);
};

/**
 * @override
 */
diem.tools.DragPiece.prototype.onDrag = function(meshWrapper, personIntersection) {
  return meshWrapper.drag3d(personIntersection, this.camera_);
};

/**
 * @override
 */
diem.tools.DragPiece.prototype.onDragEnd = function(meshWrapper) {
  return meshWrapper.drag3dEnd();
};
