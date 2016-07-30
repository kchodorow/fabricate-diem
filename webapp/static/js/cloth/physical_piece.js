/* global THREE */
goog.provide('diem.cloth.PhysicalPiece');

goog.require('diem.MeshWrapper');

/**
 * This is basically a workboard piece with constraints between the nodes.
 * @param {THREE.Mesh} piece
 */
diem.cloth.PhysicalPiece = function(piece) {
  goog.base(this);
  this.constraints_ = [];
  this.previous_ = [];
  this.mesh_ = piece.clone();

  var faces = piece.geometry.faces;
  var vertices = piece.geometry.vertices;
  for (var i = 0; i < faces.length; ++i) {
    var face = faces[i];
    this.addConstraint_(vertices[face.a], vertices[face.b]);
    this.addConstraint_(vertices[face.b], vertices[face.c]);
    this.addConstraint_(vertices[face.c], vertices[face.a]);
  }
  for (var i = 0; i < this.mesh_.geometry.vertices.length; ++i) {
    this.previous_.push(new THREE.Vector3().copy(
      this.mesh_.geometry.vertices[i]));
  }
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);

diem.cloth.PhysicalPiece.TIMESTEP = 18 / 1000;
diem.cloth.PhysicalPiece.TIMESTEP_SQ = diem.cloth.PhysicalPiece.TIMESTEP
  * diem.cloth.PhysicalPiece.TIMESTEP;
diem.cloth.PhysicalPiece.GRAVITY = new THREE.Vector3(0, -.5, 0);
diem.cloth.PhysicalPiece.DAMPING = 0.03;
diem.cloth.PhysicalPiece.DRAG = 1 - diem.cloth.PhysicalPiece.DAMPING;
diem.cloth.PhysicalPiece.DIFF = new THREE.Vector3();

diem.cloth.PhysicalPiece.prototype.getIntersectables = function() {
  return [diem.tools.TimeTool.createIntersectable(this)];
};

diem.cloth.PhysicalPiece.prototype.addConstraint_ = function(a, b) {
  this.constraints_.push(new diem.cloth.PhysicalPiece.Constraint(a, b));
};

diem.cloth.PhysicalPiece.prototype.simulate = function() {
  var vertices = this.mesh_.geometry.vertices;
  for (var i = 0; i < vertices.length; i++) {
    this.integrate_(i);
  }
  for (i = 0; i < this.constraints_.length; ++i) {
    this.constraints_[i].satisfy();
  }
};

/**
 * Gets the vector pointing from the previous pos to the current one.
 * Multiplies that by the drag and adds it to the current position.
 * Then adds the
 * Example:
 * prev: (0, 12)
 * pos: (0, 10)
 * newPos = (0, 2)
 *
 */
diem.cloth.PhysicalPiece.prototype.integrate_ = function(i) {
  var vertex = this.mesh_.geometry.vertices[i];
  var previous = this.previous_[i];
  var velocity = diem.cloth.PhysicalPiece.DIFF.subVectors(vertex, previous);
  var newPos = velocity.multiplyScalar(diem.cloth.PhysicalPiece.DRAG).add(vertex);
  newPos.add(diem.cloth.PhysicalPiece.GRAVITY.multiplyScalar(
    diem.cloth.PhysicalPiece.TIMESTEP_SQ));
  previous.copy(vertex);
  vertex.copy(newPos);
};

diem.cloth.PhysicalPiece.Constraint = function(a, b) {
  this.line_ = new THREE.Line3(a, b);
  this.restDist_ = this.line_.distance();
};

diem.cloth.PhysicalPiece.Constraint.prototype.satisfy = function() {
  diem.cloth.PhysicalPiece.DIFF.subVectors(this.line_.start, this.line_.end);
  var currentDist = this.line_.distance();
  if (currentDist === 0) {
    continue; // prevents division by 0
  }
  var correction = diem.cloth.PhysicalPiece.DIFF.multiplyScalar(
    1 - (this.restDist_ / currentDist));
  var correctionHalf = correction.multiplyScalar(0.5);
  this.line_.start.add(correctionHalf);
  this.line_.end.sub(correctionHalf);
};
