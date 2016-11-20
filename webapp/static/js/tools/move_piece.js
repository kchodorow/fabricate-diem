goog.provide('diem.tools.MovePiece');

goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.MovePiece = function() {
  goog.base(this);
  this.name_ = diem.tools.MovePiece.NAME;
};

goog.inherits(diem.tools.MovePiece, diem.tools.Tool);

diem.tools.MovePiece.NAME = 'MV_PIECE';

/**
 * @override
 */
diem.tools.MovePiece.prototype.getKeys = function() {
  return [goog.events.KeyCodes.V];
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.MovePiece.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.MovePiece.NAME, action, meshWrapper);
};

/**
 * @override
 */
diem.tools.MovePiece.prototype.onDragStart = function(meshWrapper) {
  meshWrapper.moveStart();
  return [];
};

/**
 * @override
 */
diem.tools.MovePiece.prototype.onDrag = function(meshWrapper) {
  meshWrapper.move();
  return [];
};

/**
 * @override
 */
diem.tools.MovePiece.prototype.onDragEnd = function(meshWrapper) {
  return [];
};
