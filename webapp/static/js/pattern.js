/* A grouping of pieces for export. */

goog.provide('diem.Pattern');

goog.require('diem.cloth.Workboard');

/**
 * @constructor
 */
diem.Pattern = function() {
  this.pieces_ = [];
};

diem.Pattern.CLOTH_OFFSET_X = 10;
diem.Pattern.CLOTH_OFFSET_Y = 8;

/**
 * Create a new piece of cloth, adds it to the array of pieces, and returns it.
 * @returns {diem.cloth.Workboard}
 */
diem.Pattern.prototype.addPiece = function() {
  var cloth = diem.cloth.Workboard.createNew(7, 10);
  cloth.getObject().position.set(
    diem.Pattern.CLOTH_OFFSET_X,
    diem.Pattern.CLOTH_OFFSET_Y * this.pieces_.length,
    0);
  this.pieces_.push(cloth);
  return cloth;
};

diem.Pattern.prototype.load = function(piece) {
  var cloth = diem.cloth.Workboard.load(piece);
  cloth.getObject().position.copy(piece.position);
  this.pieces_.push(cloth);
  return cloth;
};
