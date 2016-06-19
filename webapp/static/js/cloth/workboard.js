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

  this.initMesh_();
  this.initBezier_();
};

// Initial square of cloth.
diem.cloth.Workboard.prototype.initMesh_ = function() {
  this.geometry_ = new THREE.Geometry();
  this.geometry_.vertices.push(new THREE.Vector3(0, 0, 0));
  this.geometry_.vertices.push(new THREE.Vector3(this.w, 0, 0));
  this.geometry_.vertices.push(new THREE.Vector3(0, this.h, 0));
  this.geometry_.vertices.push(new THREE.Vector3(this.w, this.h, 0));

  this.geometry_.faces.push(new THREE.Face3(0, 1, 2));
  this.geometry_.faces.push(new THREE.Face3(1, 3, 2));

  this.mesh_ = new THREE.Mesh(this.geometry_, this.fabric_.getMaterial());
};

diem.cloth.Workboard.prototype.initBezier_ = function() {
  for (var i = 0; i < 4; ++i) {
    this.bezier_ = new THREE.CubicBezierCurve3(
      this.geometry_.vertices[i],
      this.geometry_.vertices[i],
      this.geometry_.vertices[(i + 1) % 4],
      this.geometry_.vertices[(i + 1) % 4]);
  }
};

diem.cloth.Workboard.prototype.getMesh = function() {
  return this.mesh_;
};

/**
 * Sets the position of the cloth.
 */
diem.cloth.Workboard.prototype.setPosition = function(x, y) {
  this.mesh_.position.set(x, y, 0);
};
