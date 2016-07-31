/* global THREE */

goog.provide('diem.Fabric');

/**
 * The physical properties of a piece of fabric.
 * @constructor
 */
diem.Fabric = function() {
  this.restDistance_ = 1;
  this.mass_ = .1;
  this.gravity_ = new THREE.Vector3(
    0, - diem.Fabric.GRAVITY, 0).multiplyScalar(this.mass_);

  this.material_ = new THREE.MeshBasicMaterial({
    color : diem.Fabric.getRandomColor(),
    side : THREE.DoubleSide,
    wireframe: true
  });
};

diem.Fabric.GRAVITY = 5;//981 * 1.4;

diem.Fabric.prototype.getMass = function() {
  return this.mass_;
};

diem.Fabric.prototype.getGravity = function() {
  return this.gravity_;
};

diem.Fabric.prototype.getRestDistance = function() {
  return this.restDistance_;
};

diem.Fabric.prototype.getRestDiagonal = function() {
  return this.restDistance_ * Math.SQRT2;
};

diem.Fabric.prototype.getMaterial = function() {
  return this.material_;
};

diem.Fabric.getRandomColor = function() {
  var r = Math.floor(Math.random() * 0xff) << 16;
  var g = Math.floor(Math.random() * 0xff) << 8;
  var b = Math.floor(Math.random() * 0xff);
  return r | g | b;
};
