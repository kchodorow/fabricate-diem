/* global THREE */
goog.provide('diem.cloth.PhysicalPiece');
goog.provide('diem.cloth.PhysicalPiece.Constraint');

goog.require('diem.MeshWrapper');
goog.require('diem.cloth.physics.Column');
goog.require('diem.cloth.physics.Constraint');
goog.require('diem.cloth.physics.Grid');
goog.require('diem.events');
goog.require('diem.tools.DragPiece');

/**
 * This is basically a workboard piece with constraints between the nodes.
 * @param {THREE.Mesh} piece
 * @constructor
 * @extends {diem.MeshWrapper}
 */
diem.cloth.PhysicalPiece = function(piece) {
  goog.base(this);
  this.constraints_ = [];
  this.previous_ = [];
  // Array of indexes of pinned vertices.
  this.pinned_ = [];

  // Make a grid of vertices.
  var grid = diem.cloth.physics.Grid.generate(piece);
  this.constraints_ = grid.getConstraints();
  var geometry = grid.getGeometry();
  var material = piece.material.clone();
  material.wireframe = true;
  this.mesh_ = new THREE.Mesh(geometry, material);

  for (var i = 0; i < this.mesh_.geometry.vertices.length; ++i) {
    this.previous_.push(new THREE.Vector3().copy(
      this.mesh_.geometry.vertices[i]));
  }

  this.handle_ = 0;
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);

diem.cloth.PhysicalPiece.TIMESTEP_SQ = .9;
diem.cloth.PhysicalPiece.GRAVITY = new THREE.Vector3(0, -.001, 0);
diem.cloth.PhysicalPiece.DAMPING = 0.03;
diem.cloth.PhysicalPiece.DRAG = 1 - diem.cloth.PhysicalPiece.DAMPING;
diem.cloth.PhysicalPiece.DIFF = new THREE.Vector3();
diem.cloth.PhysicalPiece.EPSILON = .1;

/**
 * @override
 */
diem.cloth.PhysicalPiece.prototype.getIntersectables = function() {
  return [
    diem.tools.DragPiece.createIntersectable(diem.events.TIME, this),
    diem.tools.DragPiece.createIntersectable(diem.events.DRAGGABLE, this)
  ];
};

/**
 * Run one step of physics.
 */
diem.cloth.PhysicalPiece.prototype.simulate = function() {
  var vertices = this.mesh_.geometry.vertices;
  for (var i = 0; i < vertices.length; i++) {
    this.integrate_(i);
    if (this.mesh_.geometry.vertices[i].y < 0) {
      this.mesh_.geometry.vertices[i].setY(0);
    }
  }
  for (i = 0; i < this.constraints_.length; ++i) {
    this.constraints_[i].satisfy();
  }
  for (i = 0; i < this.pinned_.length; ++i) {
    var index = this.pinned_[i];
    this.mesh_.geometry.vertices[index].copy(this.previous_[index]);
  }

  this.mesh_.geometry.verticesNeedUpdate = true;
};

diem.cloth.PhysicalPiece.prototype.onDragStart = function() {
  this.handle_ = 0;
  var minDistance = Number.MAX_VALUE;
  for (var i = 1; i < this.mesh_.geometry.vertices.length; ++i) {
    var testHandle = this.mesh_.geometry.vertices[i];
    var testDistance = testHandle.distanceTo(diem.Globals.mouse);
    if (testDistance < minDistance) {
      this.handle_ = i;
      minDistance = testDistance;
    }
  }
  return [];
};

/**
 * Set one vertex to the current mouse posisiton.
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.onDrag = function() {
  goog.asserts.assert(this.handle_ != null);
  var handleVec = this.mesh_.geometry.vertices[this.handle_];
  handleVec.copy(diem.Globals.mouse).sub(this.mesh_.parent.position);
  return [];
};

/**
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.onDragEnd = function() {
  goog.asserts.assert(this.handle_ != null);
  this.pinned_.push(this.handle_);
  this.handle_ = null;
  return [];
};

/**
 * Gets the vector pointing from the previous pos to the current one.
 * Multiplies that by the drag and adds it to the current position.
 * Then adds the
 * Example:
 * prev: (0, 12)
 * pos: (0, 10)
 * newPos = (0, 2)
 * @param {number} i
 * @private
 */
diem.cloth.PhysicalPiece.prototype.integrate_ = function(i) {
  var vertex = this.mesh_.geometry.vertices[i];
  var previous = this.previous_[i];
  var velocity = diem.cloth.PhysicalPiece.DIFF.subVectors(vertex, previous);
  var newPos = velocity.multiplyScalar(diem.cloth.PhysicalPiece.DRAG).add(vertex);
  newPos.add(diem.cloth.PhysicalPiece.GRAVITY);
  previous.copy(vertex);
  vertex.copy(newPos);
};
