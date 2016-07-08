/* global THREE */

goog.provide('diem.cloth.Workboard');

goog.require('diem.Fabric');
goog.require('diem.cloth.Anchor');
goog.require('diem.cloth.ControlPoint');

/**
 * @constructor
 */
diem.cloth.Workboard = function() {
  this.w = 10;
  this.h = 7;
  this.corners_ = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(this.w, 0, 0),
    new THREE.Vector3(this.w, this.h, 0),
    new THREE.Vector3(0, this.h, 0)];

  this.fabric_ = new diem.Fabric();

  // A list of all of the things to reposition when the position changes.
  this.meshes_ = [];
  this.initMeshes_();
};

// Initial square of cloth.
diem.cloth.Workboard.prototype.initMeshes_ = function() {
  this.anchors_ = [];
  for (var i = 0; i < this.corners_.length; ++i) {
    var anchor = new diem.cloth.Anchor(this.corners_[i]);
    this.anchors_.push(anchor);
  }

  this.shape_ = new THREE.Shape();
  for (i = 0; i < this.corners_.length; ++i) {
    var startCp = this.anchors_[i].getClockwiseCp().getObject().position;
    var j = (i + 1) % this.corners_.length;
    var endCp = this.anchors_[j].getCounterClockwiseCp().getObject().position;

    var curve = new THREE.CubicBezierCurve(
      this.corners_[i],
      startCp,
      endCp,
      this.corners_[j]);
    this.shape_.curves.push(curve);
  }
  diem.cloth.ControlPoint.updateActions(this.shape_);

  this.geometry_ = new THREE.ShapeGeometry(this.shape_);

  this.mesh_ = new THREE.Mesh(this.geometry_, this.fabric_.getMaterial());
  this.mesh_.shape = this.shape_;
  this.meshes_.push(this.mesh_);

  for (i = 0; i < this.corners_.length; ++i) {
    var meshes = this.anchors_[i].getMeshes();
    for (j = 0; j < meshes.length; ++j) {
     this.mesh_.add(meshes[j]);
    }
  }
};

diem.cloth.Workboard.prototype.getAnchors = function() {
  return this.anchors_;
};

diem.cloth.Workboard.prototype.getMesh = function() {
  return this.mesh_;
};

/**
 * Sets the position of the cloth.
 */
diem.cloth.Workboard.prototype.setPosition = function(x, y) {
  var diff = new THREE.Vector3(this.corners_[0].x - x, this.corners_[0].y - y, 0);
  for (var i = 0; i < this.meshes_.length; ++i) {
    this.meshes_[i].position.sub(diff);
  }
};
