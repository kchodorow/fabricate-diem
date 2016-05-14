/* global THREE */

goog.provide('diem.Ruler');

diem.Ruler = function() {
};

diem.Ruler.prototype.load = function() {
  var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });

  var geometry = new THREE.Geometry();
  var currentHeight = 0;
  var increment = 1;
  for (var i = 0; i < 20; ++i) {
    // Line up.
    geometry.vertices.push(new THREE.Vector3(10, currentHeight, 0));
    // Notch
    geometry.vertices.push(new THREE.Vector3(9, currentHeight, 0));
    geometry.vertices.push(new THREE.Vector3(10, currentHeight, 0));
    currentHeight += increment;
  }

  var line = new THREE.Line(geometry, material);
  return line;
};
