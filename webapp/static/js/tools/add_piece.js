goog.provide('diem.tools.AddPiece');

goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @param {Function} onSelectFunc
 * @extends {diem.tools.Tool}
 */
diem.tools.AddPiece = function(scene) {
  goog.base(this);

  this.scene_ = scene;
  this.pattern_ = new diem.Pattern();
};

goog.inherits(diem.tools.AddPiece, diem.tools.Tool);

/**
 * @override
 */
diem.tools.AddPiece.prototype.onSelect = function() {
  var piece = this.pattern_.addPiece();
  piece.addToParent(this.scene_);
  return piece.getIntersectables();
};

diem.tools.AddPiece.NAME = 'ADD_PIECE';

/**
 * @override
 */
diem.tools.AddPiece.prototype.getName = function() {
  return diem.tools.AddPiece.NAME;
};

/**
 * @override
 */
diem.tools.AddPiece.prototype.getKeys = function() {
  return [goog.events.KeyCodes.C];
};

diem.tools.AddPiece.createIntersectable = function(action, meshWrapper) {
  return diem.tool.Tool.createIntersectable(
    diem.tools.AddPiece.NAME, action, meshWrapper);
};
