/* global THREE */

goog.provide('diem.cloth.physics.Constraint');

/**
 * @param {THREE.Vector3} aPos
 * @param {THREE.Vector3} bPos
 * @constructor
 */
diem.cloth.physics.Constraint = function(aPos, bPos) {
  this.line_ = new THREE.Line3(aPos, bPos);
  this.restDist_ = this.line_.distance();
};

/**
 * Move the start & end points to their desired distance from each other.
 */
diem.cloth.physics.Constraint.prototype.satisfy = function() {
  diem.cloth.PhysicalPiece.DIFF.subVectors(this.line_.end, this.line_.start);
  var currentDist = this.line_.distance();
  if (currentDist === 0) {
    return; // prevents division by 0
  }
  var correction = diem.cloth.PhysicalPiece.DIFF.multiplyScalar(
    1 - (this.restDist_ / currentDist));
  var correctionHalf = correction.multiplyScalar(0.5);
  this.line_.start.add(correctionHalf);
  this.line_.end.sub(correctionHalf);
};
