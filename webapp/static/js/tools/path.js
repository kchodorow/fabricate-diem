goog.provide('diem.tools.Path');

goog.require('diem.tools.Tool');

/**
 * @constructor
 */
diem.tools.Path = function() {
  goog.base(this);
};

goog.inherits(diem.tools.Path, diem.tools.Tool);

diem.tools.Scissors.prototype.onDrag = function(mouseVec3) {
  this.cloth.removeNearestParticle(mouseVec3);
};
