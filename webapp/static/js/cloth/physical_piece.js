/* global THREE */
goog.provide('diem.cloth.PhysicalPiece');
goog.provide('diem.cloth.PhysicalPiece.Constraint');

goog.require('diem.MeshWrapper');
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

  // Make a grid of vertices.
  var geometry = this.generateGrid_(piece);
  this.mesh_ = new THREE.Mesh(geometry, piece.material);

  for (var i = 0; i < this.mesh_.geometry.vertices.length; ++i) {
    this.previous_.push(new THREE.Vector3().copy(
      this.mesh_.geometry.vertices[i]));
  }
};

goog.inherits(diem.cloth.PhysicalPiece, diem.MeshWrapper);

diem.cloth.PhysicalPiece.TIMESTEP_SQ = .9;
diem.cloth.PhysicalPiece.GRAVITY = new THREE.Vector3(0, -.5, 0);
diem.cloth.PhysicalPiece.DAMPING = 0.03;
diem.cloth.PhysicalPiece.DRAG = 1 - diem.cloth.PhysicalPiece.DAMPING;
diem.cloth.PhysicalPiece.DIFF = new THREE.Vector3();

/**
 * Create a grid from the existing vertices.
 * @param {THREE.Mesh} piece
 */
diem.cloth.PhysicalPiece.prototype.generateGrid_ = function(piece) {
  var geometry = new THREE.Geometry();
  // Get bounding box.
  var geo = piece.geometry;
  if (geo.boundingBox == null) {
    geo.computeBoundingBox();
  }
  var box = geo.boundingBox.clone();
  // When it doubt, add extra points.
  var min = box.min.floor();
  var max = box.max.ceil();
  // Create a grid over the bounding box.
  var constraintMap = {};
  // Track the vertices by col.
  var lastCol = null;
  for (var i = min.x; i < max.x; ++i) {
    var col = {start: -1, length: 0};
    for (var j = min.y; j < max.y; ++j) {
      // Discard grid points not in shape.
      var vertex = new THREE.Vector3(i, j, 0);
      if (!this.inShape_(piece.shape.edges_, vertex, min)) {
        continue;
      }
      if (col.start == -1) {
        col.start = geometry.vertices.length;
      }
      col.length++;

      geometry.vertices.push(vertex);
      this.addConstraints_(vertex, constraintMap);

      // Add faces.
      if (lastCol == null) {
        continue;
      }

      // TODO: handle overhangs.
      var lastColIdx = lastCol.start;
      var curVertex = geometry.vertices.length - 1;
      if (lastColIdx < lastCol.start + lastCol.length) {
        geometry.faces.push(
          new THREE.Face3(lastColIdx, lastColIdx + 1, curVertex));
      }
      if (j > min.y) {
        geometry.faces.push(
          new THREE.Face3(curVertex - 1, curVertex, lastColIdx));
      }
    }
    if (col.start != -1) {
      lastCol = col;
    }
  }
  // Connect all edge points to the shape.
  return geometry;
};

/**
 * @param {Array} edges
 * @param {THREE.Vector3} vertex
 */
diem.cloth.PhysicalPiece.prototype.inShape_ = function(edges, vertex, corner) {
  var intersections = 0;
  var lastVertex = null;
  for (var i = 0; i < edges.length; ++i) {
    var vertices = edges[i].mesh_.geometry.vertices;
    for (var j = 0; j < vertices.length; ++j) {
      if (lastVertex == null) {
        lastVertex = vertices[j];
        continue;
      }
      if (lastVertex.equals(vertices[j])) {
        continue;
      }
      if (this.rayCrosses_(corner, vertex, lastVertex, vertices[j])) {
        ++intersections;
      }
      lastVertex = vertices[j];
    }
  }
  return intersections % 2 == 1;
};

/**
 * @param {THREE.Vector3} start1
 * @param {THREE.Vector3} end1
 * @param {THREE.Vector3} start2
 * @param {THREE.Vector3} end2
 */
diem.cloth.PhysicalPiece.prototype.rayCrosses_ = function(start1, end1, start2, end2) {
  var a1 = end1.y - start1.y;
  var b1 = start1.x - end1.x;
  var c1 = (end1.x * start1.y) - (start1.x * end1.y);

  var d1 = (a1 * start2.x) + (b1 * start2.y) + c1;
  var d2 = (a1 * end2.x) + (b1 * end2.y) + c1;

  if (d1 > 0 && d2 > 0) {
    return false;
  }
  if (d1 < 0 && d2 < 0) {
    return false;
  }

  var a2 = end2.y - start2.y;
  var b2 = start2.x - end2.x;
  var c2 = (end2.x * start2.y) - (start2.x * end2.y);

  d1 = (a2 * start1.x) + (b2 * start1.y) + c2;
  d2 = (a2 * end1.x) + (b2 * end1.y) + c2;

  if ((a1 * b2) - (a2 * b1) == 0) {
    return false;
  }
  return true;
};

/**
 * @param {Object} available a map of vertices that are available
 * @param {Object} wanted a map of vertices that are needed
 * available: {3 : {4 : [Vector3(2, 4)]}}
 * wanted: {3 : {3 : [Vector3(3, 4)], 3 : {5 : [Vector3(3, 4)], 4 : {4 : [Vector3(3, 4)]}}
 */
diem.cloth.PhysicalPiece.prototype.addConstraints_ = function(vertex, map) {
  if (!(vertex.x in map)) {
    map[vertex.x] = {};
  }
  if (!(vertex.y in map[vertex.x])) {
    map[vertex.x][vertex.y] = {};
  }

  var available = map[vertex.x][vertex.y];
  if ('left' in available) {
    this.addConstraint_(vertex, available.left);
  } else {
    map[vertex.x - 1] = map[vertex.x - 1] || {};
    map[vertex.x - 1][vertex.y] = map[vertex.x - 1][vertex.y] || {};
    map[vertex.x - 1][vertex.y].right = vertex;
  }
  if ('right' in available) {
    this.addConstraint_(vertex, available.right);
  } else {
    map[vertex.x + 1] = map[vertex.x + 1] || {};
    map[vertex.x + 1][vertex.y] = map[vertex.x + 1][vertex.y] || {};
    map[vertex.x + 1][vertex.y].left = vertex;
  }
  if ('up' in available) {
    this.addConstraint_(vertex, available.up);
  } else {
    map[vertex.x] = map[vertex.x] || {};
    map[vertex.x][vertex.y + 1] = map[vertex.x][vertex.y + 1] || {};
    map[vertex.x][vertex.y + 1].down = vertex;
  }
  if ('down' in available) {
    this.addConstraint_(vertex, available.down);
  } else {
    map[vertex.x] = map[vertex.x] || {};
    map[vertex.x][vertex.y - 1] = map[vertex.x][vertex.y - 1] || {};
    map[vertex.x][vertex.y - 1].up = vertex;
  }
};

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
 * @param {THREE.Vector3} a start vertex
 * @param {THREE.Vector3} b end vertex
 * @private
 */
diem.cloth.PhysicalPiece.prototype.addConstraint_ = function(a, b) {
  this.constraints_.push(new diem.cloth.PhysicalPiece.Constraint(a, b));
};

/**
 * Run one step of physics.
 */
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
 * Set one vertex to the current mouse posisiton.
 * @returns {Array}
 */
diem.cloth.PhysicalPiece.prototype.onDrag = function() {
  this.mesh_.geometry.vertices[0].set(
    diem.Globals.mouse.x, diem.Globals.mouse.y, 0);
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
  newPos.add(diem.cloth.PhysicalPiece.GRAVITY.multiplyScalar(
    diem.cloth.PhysicalPiece.TIMESTEP_SQ));
  previous.copy(vertex);
  vertex.copy(newPos);
};

/**
 * @param {THREE.Vector3} aPos
 * @param {THREE.Vector3} bPos
 * @constructor
 */
diem.cloth.PhysicalPiece.Constraint = function(aPos, bPos) {
  this.line_ = new THREE.Line3(aPos, bPos);
  this.restDist_ = this.line_.distance();
};

/**
 * Move the start & end points to their desired distance from each other.
 */
diem.cloth.PhysicalPiece.Constraint.prototype.satisfy = function() {
  diem.cloth.PhysicalPiece.DIFF.subVectors(this.line_.end, this.line_.start);
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
