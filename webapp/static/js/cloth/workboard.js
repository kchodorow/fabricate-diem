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

  this.fabric_ = new diem.Fabric();

  // A list of all of the things to reposition when the position changes.
  this.meshes_ = [];
  this.initMeshes_();
};

// Initial square of cloth.
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
  for (i = 0; i < corners.length; ++i) {
    var startAnchor = this.anchors_[i].getObject().position;
    var startCp = this.anchors_[i].getClockwiseCp().getObject().position;
    var j = (i + 1) % corners.length;
    var endCp = this.anchors_[j].getCounterClockwiseCp().getObject().position;
    var endAnchor = this.anchors_[j].getObject().position;

    var curve = new THREE.CubicBezierCurve(
      startAnchor,
      startCp,
      endCp,
      endAnchor);
    this.shape_.curves.push(curve);
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
  }
};

diem.cloth.Workboard.prototype.getObject = function() {
  return this.mesh_;
};

diem.cloth.Workboard.prototype.getAnchors = function() {
  return this.anchors_;
};

diem.cloth.Workboard.onClick = function() {};

diem.cloth.Workboard.prototype.onClick = function() {
  goog.bind(diem.cloth.Workboard.onClick, this).call();
};

/**
 * Looks static, but called with an instance of Workboard as this.
 */
diem.cloth.Workboard.addAnchorPoint = function() {
  console.log("mouse: " + diem.Globals.mouse.x + "," + diem.Globals.mouse.y);
  console.log("this: " + this.mesh_.position.x + "," + this.mesh_.position.y);
};

/**
 * Sets the position of the cloth.
 */
diem.cloth.Workboard.prototype.setPosition = function(x, y) {
  var anchor = this.anchors_[0].getObject();
  var diff = new THREE.Vector3(anchor.position.x - x, anchor.position.y - y, 0);
  for (var i = 0; i < this.meshes_.length; ++i) {
    this.meshes_[i].position.sub(diff);
  }
};
