/* A grouping of pieces for export. */

goog.provide('diem.Pattern');

goog.require('diem.Ruler');
goog.require('diem.cloth.Workboard');

/**
 * @constructor
 */
diem.Pattern = function() {
  this.pieces_ = [];
};

diem.Pattern.CLOTH_OFFSET_X = -10;
diem.Pattern.CLOTH_OFFSET_Y = 6;

/**
 * Create a new piece of cloth, adds it to the array of pieces, and returns it.
 * @returns {diem.cloth.Workboard}
 */
diem.Pattern.prototype.addPiece = function() {
  // 1 yard x 1/2 yard.
  var yard = new diem.Ruler.Inches(36).toThree();
  var cloth = diem.cloth.Workboard.createNew(yard, yard / 2);
  cloth.getObject().position.set(
    diem.Pattern.CLOTH_OFFSET_X,
    diem.Pattern.CLOTH_OFFSET_Y * this.pieces_.length,
    0);
  this.pieces_.push(cloth);
  return cloth;
};

/**
 * @param {diem.cloth.Workboard} piece
 * @returns {diem.cloth.Workboard}
 */
diem.Pattern.prototype.load = function(piece) {
  var cloth = diem.cloth.Workboard.load(piece);
  cloth.getObject().position.copy(piece.position);
  this.pieces_.push(cloth);
  return cloth;
};
