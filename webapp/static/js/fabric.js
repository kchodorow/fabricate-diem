/* global THREE */

goog.provide('diem.Fabric');

/**
 * The physical properties of a piece of fabric.
 * @param {object} storageFabric
 * @constructor
 * @private
 */
diem.Fabric = function(storageFabric) {
  this.mass_ = .1;
  this.gravity_ = new THREE.Vector3(
    0, - diem.Fabric.GRAVITY, 0).multiplyScalar(this.mass_);
  this.material_ = new THREE.MeshBasicMaterial(storageFabric.material);
};

/**
 * @param {object} storageFabric
 * @returns {diem.Fabric}
 */
diem.Fabric.load = function(storageFabric) {
  return new diem.Fabric(storageFabric);
};

/**
 * @returns {number}
 */
diem.Fabric.prototype.getMass = function() {
  return this.mass_;
};

/**
 * @returns {THREE.Mesh}
 */
diem.Fabric.prototype.getMaterial = function() {
  return this.material_;
};

/**
 * @returns {number}
 */
diem.Fabric.getRandomColor = function() {
  var r = Math.floor(Math.random() * 0xff) << 16;
  var g = Math.floor(Math.random() * 0xff) << 8;
  var b = Math.floor(Math.random() * 0xff);
  return r | g | b;
};
