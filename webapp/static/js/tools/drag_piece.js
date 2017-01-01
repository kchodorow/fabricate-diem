/* global THREE */
goog.provide('diem.tools.DragPiece');

goog.require('diem.Button');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.DragPiece = function() {
  goog.base(this);
  this.name_ = diem.tools.DragPiece.NAME;
  this.selected_ = null;
//  this.keyHandlers_[goog.events.KeyCodes.X] = this.deletePiece_;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('D')
    .setTooltip('Drag fabric [D]')
    .build();
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
  this.selected_ = null;
  return [];
};

/**
 * @override
 */
diem.tools.DragPiece.prototype.deletePiece_ = function() {
  if (this.selected_ == null) {
    // TODO: do something to warn the user.
    return;
  }
  this.selected_.delete();
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
  var new3d = meshWrapper.drag3dStart();
  this.selected_ = new3d[0];
  return new3d;
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
