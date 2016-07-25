goog.provide('diem.cloth.PhysicalPiece');

goog.require('diem.MeshWrapper');

/**
 * This is basically a workboard piece with constraints between the nodes.
 */
diem.cloth.PhysicalPiece = function(piece) {
  goog.base(this);
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);
