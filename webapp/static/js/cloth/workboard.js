/* global THREE */

goog.provide('diem.cloth.Workboard');

goog.require('diem.Fabric');

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
  this.geometry_ = new THREE.Geometry();
  this.geometry_.vertices.push(new THREE.Vector3(0, 0, 0));
  this.geometry_.vertices.push(new THREE.Vector3(this.w, 0, 0));
  this.geometry_.vertices.push(new THREE.Vector3(0, this.h, 0));
  this.geometry_.vertices.push(new THREE.Vector3(this.w, this.h, 0));

  this.geometry_.faces.push(new THREE.Face3(0, 1, 2));
  this.geometry_.faces.push(new THREE.Face3(1, 3, 2));

  this.mesh_ = new THREE.Mesh(this.geometry_, this.fabric_.getMaterial());
  this.meshes_.push(this.mesh_);
  this.initBezier_();
};

diem.cloth.Workboard.prototype.initBezier_ = function() {
  for (var i = 0; i < 4; ++i) {
    this.bezier_ = new THREE.CubicBezierCurve3(
      this.geometry_.vertices[i],
      this.geometry_.vertices[i],
      this.geometry_.vertices[(i + 1) % 4],
      this.geometry_.vertices[(i + 1) % 4]);
  }
  this.initAnchors_();
};

diem.cloth.Workboard.ANCHOR_SIZE = .15;

diem.cloth.Workboard.prototype.initAnchors_ = function() {
  var material = new THREE.LineBasicMaterial({color : 0xff0000});

  this.anchors_ = [];
  for (var i = 0; i < this.geometry_.vertices.length; ++i) {
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3(
        this.geometry_.vertices[i].x - diem.cloth.Workboard.ANCHOR_SIZE,
        this.geometry_.vertices[i].y - diem.cloth.Workboard.ANCHOR_SIZE,
        0),
      new THREE.Vector3(
        this.geometry_.vertices[i].x + diem.cloth.Workboard.ANCHOR_SIZE,
        this.geometry_.vertices[i].y - diem.cloth.Workboard.ANCHOR_SIZE,
        0),
      new THREE.Vector3(
        this.geometry_.vertices[i].x + diem.cloth.Workboard.ANCHOR_SIZE,
        this.geometry_.vertices[i].y + diem.cloth.Workboard.ANCHOR_SIZE,
        0),
      new THREE.Vector3(
        this.geometry_.vertices[i].x - diem.cloth.Workboard.ANCHOR_SIZE,
        this.geometry_.vertices[i].y + diem.cloth.Workboard.ANCHOR_SIZE,
        0),
      new THREE.Vector3(
        this.geometry_.vertices[i].x - diem.cloth.Workboard.ANCHOR_SIZE,
        this.geometry_.vertices[i].y - diem.cloth.Workboard.ANCHOR_SIZE,
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
