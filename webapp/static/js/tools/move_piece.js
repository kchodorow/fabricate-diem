goog.provide('diem.tools.MovePiece');

goog.require('diem.Button');
goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @extends {diem.tools.Tool}
 */
diem.tools.MovePiece = function() {
  goog.base(this);
  this.name_ = diem.tools.MovePiece.NAME;
  this.selected_ = null;
  this.keyHandlers_[goog.events.KeyCodes.X] = this.deletePiece_;
  this.button_ = new diem.Button.builder()
    .setInnerHtml('V')
    .setTooltip('Move pattern piece [V]')
    .build();
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

diem.tools.Tool.prototype.onDeselect = function(opt_newTool) {
  this.selected_ = null;
  return [];
};

/**
 * @override
 */
diem.tools.MovePiece.prototype.deletePiece_ = function() {
  if (this.selected_ == null) {
    // TODO: do something to warn the user.
    return;
  }
  this.selected_.delete();
};

/**
 * @override
 */
diem.tools.MovePiece.prototype.onDragStart = function(meshWrapper) {
  this.selected_ = meshWrapper;
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
