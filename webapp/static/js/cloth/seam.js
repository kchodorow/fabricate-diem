/* globals: goog */
goog.provide('diem.cloth.Seam');

goog.require('goog.asserts');

/**
 * @param {array<diem.MeshWrapper>} edges
 */
diem.cloth.Seam = function(edges) {
  this.edges_ = edges;
  for (var i = 0; i < this.edges_.length; ++i) {
    console.log(i + ": " + this.edges_[i].getLength());
  }
};

diem.cloth.Seam.CURRENT = null;
