/* global goog, THREE */

goog.provide('diem.cloth.EdgeTracker');
goog.provide('diem.cloth.PhysicalEdge');

goog.require('diem.tools.SeamTool');

diem.cloth.EdgeTracker = function(geometry, workboardMesh) {
  this.geometry_ = geometry;
  this.corners_ = [];
  this.edges_ = {};
  for (let i = 0; i < geometry.faces.length; ++i) {
    var face = geometry.faces[i];
    this.addEdge_(face.a, face.b);
    this.addEdge_(face.b, face.c);
    this.addEdge_(face.a, face.c);
  }

  var offset = workboardMesh.position;
  var curves = workboardMesh.shape.curves;
  for (let i = 0; i < curves.length; ++i) {
    var curve = curves[i];
    this.corners_.push(curve.v0.clone().add(offset));
  }
};

diem.cloth.EdgeTracker.prototype.addEdge_ = function(a, b) {
  // Lower idx first
  var edge = Math.min(a, b) + "_" + Math.max(a, b);
  if (!(edge in this.edges_)) {
    this.edges_[edge] = 1;
  } else {
    this.edges_[edge]++;
    goog.asserts.assert(this.edges_[edge] == 2);
  }
};

// Find the outside edges of the geometry.
diem.cloth.EdgeTracker.prototype.getOutsideEdge = function() {
  var segments = {};
  for (let i in this.edges_) {
    // For outside edges, the edge will only have one face attached.
    if (this.edges_[i] == 1) {
      var vertexIndexes = i.split('_');
      var vertex0 = parseInt(vertexIndexes[0]);
      var vertex1 = parseInt(vertexIndexes[1]);
      if (vertex0 in segments) {
        segments[vertex0].push(vertex1);
      } else {
        segments[vertex0] = [vertex1];
      }
      if (vertex1 in segments) {
        segments[vertex1].push(vertex0);
      } else {
        segments[vertex1] = [vertex0];
      }
    }
  }

  // Choose an arbitrary "start" vertex.
  goog.asserts.assert(Object.keys(segments).length > 0);
  var current = Object.keys(segments)[0];
  var next = segments[current][0];

  // Find the first corner.
  var lastCorner = this.getCorner_(current);
  var first = current;
  while (lastCorner == null) {
    lastCorner = this.getCorner_(current);
    first = current;
    let tmp = current;
    current = next;
    let options = segments[current];
    next = options[0] == tmp ? options[1] : options[0];
  }

  // Travel around the edge, finding corners.
  var lines = [];
  var geometry = new THREE.Geometry();
  while (next != first) {
    geometry.vertices.push(this.geometry_.vertices[current]);
    let tmp = current;
    current = next;
    let options = segments[current];
    next = options[0] == tmp ? options[1] : options[0];
    var currentCorner = this.getCorner_(current);
    if (currentCorner != null && currentCorner != lastCorner) {
      lastCorner = currentCorner;
      geometry.vertices.push(this.geometry_.vertices[current]);
      lines.push(new diem.cloth.PhysicalEdge(geometry));
      geometry = new THREE.Geometry();
    }
  }
  return lines;
};

diem.cloth.EdgeTracker.prototype.getCorner_ = function(idx) {
  var EPSILON = .1;
  for (let i = 0; i < this.corners_.length; ++i) {
    if (this.geometry_.vertices[idx].distanceTo(this.corners_[i]) < EPSILON) {
      return this.corners_[i];
    }
  }
  return null;
};

diem.cloth.PhysicalEdge = function(geometry) {
  var material = new THREE.LineBasicMaterial({color : 0x000000, linewidth: 4});
  this.mesh_ = new THREE.Line(geometry, material);
};

goog.inherits(diem.cloth.PhysicalEdge, diem.MeshWrapper);

/**
 * @override
 */
diem.cloth.PhysicalEdge.prototype.getIntersectables = function() {
  return [
    diem.tools.SeamTool.createIntersectable(diem.events.CLICKABLE, this),
  ];
};

diem.cloth.PhysicalEdge.prototype.simulate = function() {
  this.mesh_.geometry.verticesNeedUpdate = true;
  this.mesh_.geometry.boundingSphere = null;
};

/**
 * @returns {Array}
 */
diem.cloth.PhysicalEdge.prototype.selectForSeaming = function() {
  this.mesh_.material.color.set(0xff0000);
  return [];
};
