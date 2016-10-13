goog.provide('diem.Seam');

/**
 * @constructor
 */
diem.Seam = function() {
  this.edges_ = [];
};

/**
 * @param {diem.cloth.Edge} edge
 */
diem.Seam.prototype.addEdge = function(edge) {
  this.edges_.push(edge);
  if (this.edges_.length == 1) {
    return;
  }
  var prev = this.edges_[this.edges_.length - 2];
  var cur = this.edges_[this.edges_.length - 1];
  var prevVertices = prev.mesh_.geometry.vertices;
  var curVertices = cur.mesh_.geometry.vertices;
  var len = Math.min(prevVertices.length, curVertices.length);
  var pieces = prev.mesh_.parent.userData.physicalPieces;
  var influence = 1;

  var physicalPiece = pieces[0];
  for (var i = 0; i < prevVertices.length; ++i) {
    var prevVertex = prevVertices[i];
    // Find nearest vertex index.
    var index = this.findNearestIndex_(prevVertex);
    physicalPiece.mesh_.userData.physicsBody.appendAnchor(
      0, curVertices[0], false, influence);
  }
};
