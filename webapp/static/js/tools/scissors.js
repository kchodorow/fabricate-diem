goog.provide('diem.tools.Scissors');

goog.require('diem.tools.Tool');

/**
 * @constructor
 */
diem.tools.Scissors = function(cloth) {
  goog.base(this);
  this.cloth = cloth;
};

goog.inherits(diem.tools.Scissors, diem.tools.Tool);

diem.tools.Scissors.prototype.onDrag = function(mouseVec3) {
  this.cloth.removeNearestParticle(mouseVec3);
};
