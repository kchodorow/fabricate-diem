goog.provide('diem.tools.DragPiece');

goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.DragPiece = function() {
  goog.base(this);
};

goog.inherits(diem.tools.DragPiece, diem.tools.Tool);

diem.tools.DragPiece.NAME = 'DRAG_PIECE';

/**
 * @override
 */
diem.tools.DragPiece.prototype.getName = function() {
  return diem.tools.DragPiece.NAME;
};

/**
 * @override
 */
diem.tools.DragPiece.prototype.getKeys = function() {
  return [goog.events.KeyCodes.D];
};

diem.tools.DragPiece.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.DragPiece.NAME, action, meshWrapper);
};
