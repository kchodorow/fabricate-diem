/* global goog, THREE */

goog.provide('diem.cloth.EdgeTracker');

diem.cloth.EdgeTracker = function(geometry) {
  this.geometry_ = geometry;
  this.edges_ = {};
  for (let i = 0; i < geometry.faces.length; ++i) {
    var face = geometry.faces[i];
    this.addEdge_(face.a, face.b);
    this.addEdge_(face.b, face.c);
    this.addEdge_(face.a, face.c);
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
// For outside edges, the edge will only have one face attached.
diem.cloth.EdgeTracker.prototype.getOutsideEdge = function() {
  var idxSet = goog.structs.Set();
  var segments = {};
  for (let i in this.edges_) {
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

  goog.asserts.assert(Object.keys(segments).length > 0);
  // Choose an arbitrary "start" vertex.
  var first = Object.keys(segments)[0];
  var prev = null;
  var current = first;
  var next = segments[current][0];
  var geometry = new THREE.Geometry();
  var count = 0;
  while (next != first && count++ < 1000) {
    geometry.vertices.push(this.geometry_.vertices[current]);
    var tmp = current;
    current = next;
    var options = segments[current];
    next = options[0] == tmp ? options[1] : options[0];
  }

  var material = new THREE.LineBasicMaterial({color : 0x000000, linewidth: 4});
  return new THREE.Line(geometry, material);
};
