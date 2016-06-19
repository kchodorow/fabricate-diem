/* A grouping of pieces for export. */

goog.provide('diem.Pattern');

goog.require('diem.cloth.Workboard');

goog.require('goog.events.KeyCodes');

/**
 * @constructor
 */
diem.Pattern = function(eventHandler) {
  this.pieces_ = [];
};

diem.Pattern.CLOTH_OFFSET_X = 10;
diem.Pattern.CLOTH_OFFSET_Y = 8;

diem.Pattern.ADD_PIECE = 'ADD_PIECE';

/**
 * Create a new piece of cloth, adds it to the array of pieces, and returns it.
 */
diem.Pattern.prototype.addPiece = function() {
  var cloth = new diem.cloth.Workboard();
  cloth.setPosition(
    diem.Pattern.CLOTH_OFFSET_X,
    diem.Pattern.CLOTH_OFFSET_Y * this.pieces_.length);
  this.pieces_.push(cloth);
  return cloth.getMesh();
};
