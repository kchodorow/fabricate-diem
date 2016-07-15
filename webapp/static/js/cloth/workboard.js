/* global THREE */

goog.provide('diem.cloth.Workboard');

goog.require('diem.Fabric');
goog.require('diem.cloth.Anchor');
goog.require('diem.cloth.ControlPoint');
goog.require('diem.cloth.Edge');

/**
 * @constructor
 */
diem.cloth.Workboard = function() {
  this.w = 10;
  this.h = 7;

  this.fabric_ = new diem.Fabric();

  // A list of all of the things to reposition when the position changes.
  this.meshes_ = [];
  this.initMeshes_();
};

/**
 * Initial square of cloth.
 * @private
 */
diem.cloth.Workboard.prototype.initMeshes_ = function() {
  var corners = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(this.w, 0, 0),
    new THREE.Vector3(this.w, this.h, 0),
    new THREE.Vector3(0, this.h, 0)];

  this.anchors_ = [];
  for (var i = 0; i < corners.length; ++i) {
    var anchor = new diem.cloth.Anchor(corners[i]);
    this.anchors_.push(anchor);
  }

  this.shape_ = new THREE.Shape();
  this.shape_.edges_ = [];
  for (i = 0; i < corners.length; ++i) {
    var startAnchor = this.anchors_[i];
    var j = (i + 1) % corners.length;
    var endAnchor = this.anchors_[j];

    var curve = new diem.cloth.Edge(startAnchor, endAnchor);
    this.shape_.curves.push(curve.getBezierCurve());
    this.shape_.edges_.push(curve);
  }
  diem.cloth.ControlPoint.updateActions(this.shape_);

  this.geometry_ = new THREE.ShapeGeometry(this.shape_);

  this.mesh_ = new THREE.Mesh(this.geometry_, this.fabric_.getMaterial());
  this.mesh_.shape = this.shape_;
  this.meshes_.push(this.mesh_);

  for (i = 0; i < corners.length; ++i) {
    var meshes = this.anchors_[i].getMeshes();
    for (j = 0; j < meshes.length; ++j) {
     this.mesh_.add(meshes[j]);
    }
    // Thanks to geometry, # of corners == # of edges, so add the edges here, too.
    this.mesh_.add(this.shape_.edges_[i].getObject());
  }
};

/**
 * Returns the mesh.
 */
diem.cloth.Workboard.prototype.getObject = function() {
  return this.mesh_;
};

/**
 * Returns the edges for the piece.
 */
diem.cloth.Workboard.prototype.getEdges = function() {
  return this.shape_.edges_;
};

/**
 * Returns the anchor points for the piece.
 */
diem.cloth.Workboard.prototype.getAnchors = function() {
  return this.anchors_;
};

/**
 * Sets the position of the cloth.
 * @param {number} x offset from (0,0)
 * @param {number} y offset from (0,0)
 */
diem.cloth.Workboard.prototype.setPosition = function(x, y) {
  var anchor = this.anchors_[0].getObject();
  var diff = new THREE.Vector3(anchor.position.x - x, anchor.position.y - y, 0);
  for (var i = 0; i < this.meshes_.length; ++i) {
    this.meshes_[i].position.sub(diff);
  }
};
