/* global THREE */
goog.provide('diem.cloth.physics.Grid');

goog.require('diem.cloth.physics.Column');
goog.require('diem.cloth.physics.Constraint');

/**
 * Track the vertex indices, e.g.,
 * .             5 -1 -1 -1
 *   . . .  =>  -1  2  3  4
 * .   .         0 -1  1 -1
 * @constructor
 */
diem.cloth.physics.Grid = function() {
  this.cols = [];
  this.constraints_ = [];
  this.geometry_ = new THREE.Geometry();
};

diem.cloth.physics.Grid.generate = function(mesh) {
  var tracker = new diem.cloth.physics.Grid();
  tracker.generate_(mesh);
  return tracker;
};

diem.cloth.physics.Grid.prototype.getGeometry = function() {
  return this.geometry_;
};

diem.cloth.physics.Grid.prototype.getConstraints = function() {
  return this.constraints_;
};

/**
 * @private
 */
diem.cloth.physics.Grid.prototype.generate_ = function(piece) {
  // TODO: Connect all edge points to the shape.
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
  var jitter = .1;

  for (var i = min.x; i < max.x; ++i) {
    var col = new diem.cloth.physics.Column();
    for (var j = min.y; j < max.y; ++j) {
      // Discard grid points not in shape.
      var vertex = new THREE.Vector3(i, j, jitter);
      if (!this.inShape_(piece.shape['edges_'], vertex, min)) {
        continue;
      }
      jitter = -jitter;
      col.add(this.geometry_.vertices.length, j);
      this.geometry_.vertices.push(vertex);
      this.addConstraints_(vertex, constraintMap);
    }
    this.addCol(col);
  }

  this.addFaces(this.geometry_.faces);
};

/**
 * @param {Array} edges
 * @param {THREE.Vector3} vertex
 * @param {THREE.Vector3} corner the lower-left corner of the grid (by
 *     definition, outside of the shape.
 * @returns {boolean}
 * @private
 */
diem.cloth.physics.Grid.prototype.inShape_ = function(edges, vertex, corner) {
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
 * @returns {boolean}
 * @private
 */
diem.cloth.physics.Grid.prototype.rayCrosses_ = function(
  start1, end1, start2, end2) {
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
    if (Math.abs(a1 * start2.x + b1 * start2.y + c1) <
        diem.cloth.PhysicalPiece.EPSILON
       || Math.abs(a1 * end2.x + b1 * end2.y + c1) <
        diem.cloth.PhysicalPiece.EPSILON) {
      return true;
    }
    return false;
  }
  return true;
};

/**
 * @param {THREE.Vector3} vertex
 * @param {Object} map a map of vertices that are needed
 * Structure of map is:
 * {3 : {3 : [Vector3(3, 4)], 3 : {5 : [Vector3(3, 4)], 4 : {4 : [Vector3(3, 4)]}}
 * @private
 */
diem.cloth.physics.Grid.prototype.addConstraints_ = function(vertex, map) {
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
 * @param {THREE.Vector3} a start vertex
 * @param {THREE.Vector3} b end vertex
 * @private
 */
diem.cloth.physics.Grid.prototype.addConstraint_ = function(a, b) {
  this.constraints_.push(new diem.cloth.physics.Constraint(a, b));
};

/**
 * @param {diem.cloth.physics.Column} col
 */
diem.cloth.physics.Grid.prototype.addCol = function(col) {
  if (col.isEmpty()) {
    return;
  }
  this.cols.push(col);
};

/**
 * TODO: we can figure out if an edge is valid in a similar way to how inShape
 * works. This will make the mesh correct for shapes with holes/concave bits.
 * @param {Array} faces
 */
diem.cloth.physics.Grid.prototype.addFaces = function(faces) {
  if (this.cols.length == 0) {
    return;
  }
  for (var i = 1; i < this.cols.length; ++i) {
    var prevCol = this.getCol_(i - 1);
    var curCol = this.getCol_(i);
    // Handle:
    // previous col overhangs below
    while (prevCol.start < curCol.start && prevCol.hasNext()) {
      var prevCur = prevCol.current();
      var prevNext = prevCol.next();
      faces.push(new THREE.Face3(prevCur, prevNext, curCol.start));
    }
    // this row overhangs below
    while (prevCol.start > curCol.start && curCol.hasNext()) {
      var curCur = curCol.current();
      var curNext = curCol.next();
      faces.push(new THREE.Face3(prevCol.start, curCur, curNext));
    }

    // Handle matching vertices
    while (prevCol.hasNext() && curCol.hasNext()) {
      prevCur = prevCol.current();
      prevNext = prevCol.next();
      curCur = curCol.current();
      curNext = curCol.next();
      faces.push(new THREE.Face3(prevCur, prevNext, curCur));
      faces.push(new THREE.Face3(curCur, prevNext, curNext));
    }

    // previous col overhangs top
    while (prevCol.hasNext()) {
      prevCur = prevCol.current();
      prevNext = prevCol.next();
      faces.push(new THREE.Face3(prevCur, prevNext, curCol.start));
    }
    // this row overhangs top
    while (curCol.hasNext()) {
      curCur = curCol.current();
      curNext = curCol.next();
      faces.push(new THREE.Face3(prevCol.start, curCur, curNext));
    }
  }
};

/**
 * @param {number} i
 * @returns {diem.cloth.physics.Column}
 * @private
 */
diem.cloth.physics.Grid.prototype.getCol_ = function(i) {
  var col = this.cols[i];
  col.restart();
  return col;
};
