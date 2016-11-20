/* global THREE */
goog.provide('diem.tools.DragPiece');

goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.DragPiece = function() {
  goog.base(this);
  this.name_ = diem.tools.DragPiece.NAME;
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
diem.tools.DragPiece.prototype.onDragStart = function(meshWrapper) {
  return meshWrapper.drag3dStart();
};

/**
 * @override
 */
diem.tools.DragPiece.prototype.onDrag = function(meshWrapper) {
  return meshWrapper.drag3d();
};

/**
 * @override
 */
diem.tools.DragPiece.prototype.onDragEnd = function(meshWrapper) {
  return meshWrapper.drag3dEnd();
};
