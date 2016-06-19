/* global THREE */
goog.provide('diem.Part');

/**
 * @constructor
 */
diem.Part = function(width, height) {
  var triangleGeometry = new THREE.Geometry();
  for (var y = 0; y < height; ++y) {
    for (var x = 0; x < width; ++x) {
      triangleGeometry.vertices.push(new THREE.Vector3(x, y, 0));
    }
  }

  /*
   * 4 5 6 7
   * |\|\|\|
   * 0 1 2 3
   */
  for (var i = 0; i < height - 1; ++i) {
    var bottom_row = i * width;
    var top_row = (i + 1) * width;
    for (var j = 0; j < width - 1; ++j) {
      var llc = bottom_row + j;
      var ulc = top_row + j;
      triangleGeometry.faces.push(new THREE.Face3(llc, llc + 1, ulc));
      triangleGeometry.faces.push(new THREE.Face3(llc + 1, ulc + 1, ulc));
    }
  }

  var triangleMaterial = new THREE.MeshBasicMaterial({
    color : diem.Fabric.getRandomColor(),
    side : THREE.DoubleSide
  });

  this.mesh_ = new THREE.Mesh(triangleGeometry, triangleMaterial);
};

// Triangle geometry winds counterclockwise.
diem.Part.prototype.getObject = function() {
  return this.mesh_;
};
