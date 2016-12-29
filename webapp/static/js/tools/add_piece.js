goog.provide('diem.tools.AddPiece');

goog.require('diem.Button');
goog.require('diem.Pattern');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @param {THREE.Scene} scene
 * @extends {diem.tools.Tool}
 */
diem.tools.AddPiece = function(scene) {
  goog.base(this);

  this.scene_ = scene;
  this.pattern_ = new diem.Pattern();
  this.name_ = diem.tools.AddPiece.NAME;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('C')
    .setTooltip('New pattern piece (C)')
    .build();
};

goog.inherits(diem.tools.AddPiece, diem.tools.Tool);

/**
 * @param {diem.tools.Tool} activeTool Ignored.
 * @param {diem.storage.Piece} [opt_piece]
 * @override
 */
diem.tools.AddPiece.prototype.onSelect = function(activeTool, opt_piece) {
  var piece;
  if (opt_piece) {
    piece = this.pattern_.load(opt_piece);
  } else {
    piece = this.pattern_.addPiece();
  }
  piece.addToParent(this.scene_);
  return piece.getIntersectables();
};

diem.tools.AddPiece.NAME = 'ADD_PIECE';

/**
 * @override
 */
diem.tools.AddPiece.prototype.getKeys = function() {
  return [goog.events.KeyCodes.C];
};

/**
 * @override
 */
diem.tools.AddPiece.prototype.stateful = function() {
  return false;
};

/**
 * @param {string} action
 * @param {diem.MeshWrapper} meshWrapper
 * @returns {diem.events.Intersectable}
 */
diem.tools.AddPiece.createIntersectable = function(action, meshWrapper) {
  return diem.tools.Tool.createIntersectable(
    diem.tools.AddPiece.NAME, action, meshWrapper);
};
