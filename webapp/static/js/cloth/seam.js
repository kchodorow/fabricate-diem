goog.provide('diem.cloth.Seam');

/**
 * @param {array<diem.MeshWrapper>} edges
 */
diem.cloth.Seam = function(edges) {
  this.pieces_ = edges;
};

diem.cloth.Seam.CURRENT = null;

diem.cloth.Seam.prototype.add = function(edge) {
  this.pieces_.push(edge);
};
