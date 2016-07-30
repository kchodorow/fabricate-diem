/* global THREE */
goog.provide('diem.cloth.PhysicalPiece');

goog.require('diem.MeshWrapper');
goog.require('diem.events');

/**
 * This is basically a workboard piece with constraints between the nodes.
 * @param {THREE.Mesh} piece
 */
diem.cloth.PhysicalPiece = function(piece) {
  goog.base(this);
  this.constraints_ = [];
  this.previous_ = [];
  this.mesh_ = new THREE.Mesh(piece.geometry.clone(), piece.material);

  var faces = this.mesh_.geometry.faces;
  for (i = 0; i < faces.length; ++i) {
    var face = faces[i];
    this.addConstraint_(face.a, face.b);
    this.addConstraint_(face.b, face.c);
    this.addConstraint_(face.c, face.a);
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
  return [diem.tools.DragPiece.createIntersectable(diem.events.TIME, this)];
};

diem.cloth.PhysicalPiece.prototype.addConstraint_ = function(a, b) {
  var vertices = this.mesh_.geometry.vertices;
  this.constraints_.push(
    new diem.cloth.PhysicalPiece.Constraint(a, b, vertices[a], vertices[b]));
};

diem.cloth.PhysicalPiece.prototype.simulate = function() {
  var vertices = this.mesh_.geometry.vertices;
  for (var i = 0; i < vertices.length; i++) {
    this.integrate_(i);
  }
  for (i = 0; i < this.constraints_.length; ++i) {
    this.constraints_[i].satisfy();
  }
  this.mesh_.geometry.verticesNeedUpdate = true;
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

diem.cloth.PhysicalPiece.Constraint = function(a, b, aPos, bPos) {
  this.startIdx_ = a;
  this.endIdx_ = b;
  this.line_ = new THREE.Line3(aPos, bPos);
  this.restDist_ = this.line_.distance();
};

diem.cloth.PhysicalPiece.Constraint.prototype.satisfy = function() {
  diem.cloth.PhysicalPiece.DIFF.subVectors(this.line_.start, this.line_.end);
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
