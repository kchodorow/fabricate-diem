/* global THREE, assertTrue */
goog.require('diem.cloth.PhysicalPiece.Constraint');

goog.require('goog.testing.jsunit');

var testSatisfyAtRest = function() {
  var start = new THREE.Vector3(0, 0, 0);
  var end = new THREE.Vector3(10, 10, 0);
  var constraint = new diem.cloth.PhysicalPiece.Constraint(start, end);
  constraint.satisfy();
  assertTrue(start.equals(new THREE.Vector3(0, 0, 0)));
  assertTrue(end.equals(new THREE.Vector3(10, 10, 0)));
};
