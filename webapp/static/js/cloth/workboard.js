/* global THREE */

goog.provide('diem.cloth.Workboard');

goog.require('diem.Fabric');

/**
 * @constructor
 */
diem.cloth.Workboard = function() {
  this.w = 10;
  this.h = 7;
  this.corners_ = [
    {x : 0, y : 0},
    {x : this.w, y : 0},
    {x : this.w, y : this.h},
    {x : 0, y : this.h}];

  this.fabric_ = new diem.Fabric();

  // A list of all of the things to reposition when the position changes.
  this.meshes_ = [];
  this.initMeshes_();
};

// Initial square of cloth.
diem.cloth.Workboard.prototype.initMeshes_ = function() {
  this.shape_ = new THREE.Shape();
  this.shape_.moveTo(0, 0);
  for (var i = 0; i < this.corners_.length; ++i) {
    var j = (i + 1) % this.corners_.length;
    this.shape_.bezierCurveTo(
      this.corners_[i].x, this.corners_[i].y,
      this.corners_[j].x, this.corners_[j].y,
      this.corners_[j].x, this.corners_[j].y);
  }

  this.geometry_ = new THREE.ShapeGeometry(this.shape_);

  this.mesh_ = new THREE.Mesh(this.geometry_, this.fabric_.getMaterial());
  this.meshes_.push(this.mesh_);

  this.initAnchors_();
};

diem.cloth.Workboard.ANCHOR_SIZE = .15;

diem.cloth.Workboard.prototype.initAnchors_ = function() {
  var material = new THREE.LineBasicMaterial({color : 0xff0000});

  this.anchors_ = [];
  for (var i = 0; i < this.corners_.length; ++i) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(
        this.corners_[i].x - diem.cloth.Workboard.ANCHOR_SIZE,
        this.corners_[i].y - diem.cloth.Workboard.ANCHOR_SIZE,
        0),
      new THREE.Vector3(
        this.corners_[i].x + diem.cloth.Workboard.ANCHOR_SIZE,
        this.corners_[i].y - diem.cloth.Workboard.ANCHOR_SIZE,
        0),
      new THREE.Vector3(
        this.corners_[i].x + diem.cloth.Workboard.ANCHOR_SIZE,
        this.corners_[i].y + diem.cloth.Workboard.ANCHOR_SIZE,
        0),
      new THREE.Vector3(
        this.corners_[i].x - diem.cloth.Workboard.ANCHOR_SIZE,
        this.corners_[i].y + diem.cloth.Workboard.ANCHOR_SIZE,
        0),
      new THREE.Vector3(
        this.corners_[i].x - diem.cloth.Workboard.ANCHOR_SIZE,
        this.corners_[i].y - diem.cloth.Workboard.ANCHOR_SIZE,
        0));
    var box = new THREE.Line(geometry, material);
    this.anchors_.push(box);
    this.meshes_.push(box);
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
  for (var i = 0; i < this.meshes_.length; ++i) {
    this.meshes_[i].position.set(x, y, 0);
  }
};
