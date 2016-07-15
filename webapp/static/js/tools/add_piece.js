goog.provide('diem.tools.AddPiece');

goog.require('diem.tools.Tool');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 * @param {Function} onSelectFunc
 * @extends {diem.tools.Tool}
 */
diem.tools.AddPiece = function(onSelectFunc) {
  goog.base(this);
  this.onSelectFunc_ = onSelectFunc;
};

goog.inherits(diem.tools.AddPiece, diem.tools.Tool);

/**
 * @override
 */
diem.tools.AddPiece.prototype.onSelect = function() {
  this.onSelectFunc_();
};

/**
 * @override
 */
diem.tools.AddPiece.prototype.getName = function() {
  return 'ADD_PIECE';
};

/**
 * @override
 */
diem.tools.AddPiece.prototype.getKeys = function() {
  return [goog.events.KeyCodes.C];
};
